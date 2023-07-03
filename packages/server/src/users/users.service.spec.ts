import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../core/services/prisma.service';
import { createMock } from '@golevelup/ts-jest';
import { User } from "@prisma/client";
import { faker } from '@faker-js/faker';

const createMockUser = (): User => ({
  id: faker.number.int(),
  username: faker.internet.userName(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  profileId: faker.number.int(),
  lastLogin: faker.date.recent(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<jest.Mocked<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by id', async () => {
    // Arrange
    const userId = 1;
    const expectedUser = createMockUser();

    const spy = jest.spyOn(prismaService.user, 'findUniqueOrThrow').mockResolvedValue(expectedUser);

    // Act
    const user = await service.findUserById(userId);

    // Assert
    expect(spy).toHaveBeenCalledWith({ where: { id: userId } });
    expect(user).toEqual(expectedUser);
  });
});
