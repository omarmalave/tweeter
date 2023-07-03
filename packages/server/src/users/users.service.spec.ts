import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../core/services/prisma.service';
import { createMockUser } from '../core/test/test.util';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: PrismaService, useValue: {
            user: { findUnique: jest.fn() }
          }
        }],
    })
      .compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by id', async () => {
    // Arrange
    const userId = 1;
    const expectedUser = createMockUser(userId);

    const spy = jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(expectedUser);

    // Act
    const user = await service.findUserById(userId);

    // Assert
    expect(spy).toHaveBeenCalledWith({ where: { id: userId } });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(user).toEqual(expectedUser);
  });

  it('should throw an error if Prisma query fails', async () => {
    // Arrange
    const userId = 1;
    const databaseError = new Error('Database error');
    jest.spyOn(prismaService.user, 'findUnique').mockRejectedValueOnce(databaseError);

    // Act and Assert
    await expect(service.findUserById(userId)).rejects.toThrow(databaseError);
  });


  it('should return null if user is not found', async () => {
    // Arrange
    const userId = 1;
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    // Act
    const user = await service.findUserById(userId);

    // Assert
    expect(user).toBeNull();
  });



});
