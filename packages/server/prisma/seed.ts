import { PrismaClient, Privacy } from '@prisma/client';

const prisma = new PrismaClient();
const defaultAvatarUrl =
  'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@2x.jpg';

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'omar@test.com',
      username: 'omar',
      name: 'Omar Malavé',
      password: 'password123',
      profile: {
        create: {
          bio: 'Omar the builder of web apps',
          avatar: defaultAvatarUrl,
          location: 'Internet',
        },
      },
      tweets: {
        create: {
          text: 'Hello, Tweeter!',
          privacy: Privacy.PUBLIC,
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'miles@test.com' },
    update: {},
    create: {
      email: 'miles@test.com',
      username: 'miles',
      name: 'Miles Morales',
      password: 'password123',
      profile: {
        create: {
          bio: 'Your friendly neighbor spiderman',
          avatar: defaultAvatarUrl,
          location: 'Brooklyn, NY',
        },
      },
      tweets: {
        create: [
          {
            text: 'Hello, Tweeter!',
            privacy: Privacy.PUBLIC,
          },
          {
            text: 'I miss my uncle :(',
            privacy: Privacy.FOLLOWERS_ONLY,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
