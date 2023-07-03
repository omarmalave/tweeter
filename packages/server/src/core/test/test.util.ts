import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const createMockUser = (id: number): User => ({
    id,
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profileId: faker.number.int(),
    lastLogin: faker.date.recent(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
})