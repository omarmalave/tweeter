import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { createMockUser } from '../core/test/test.util';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver, {
          provide: UsersService,
          useValue: { findUserById: jest.fn() }
        }],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a user by id', async () => {
    // Arrange
    const userId = 1;
    const expectedUser = createMockUser(userId);

    const spy = jest.spyOn(usersService, 'findUserById').mockResolvedValue(expectedUser);

    // Act
    const user = await usersService.findUserById(userId);

    // Assert
    expect(spy).toHaveBeenCalledWith(userId);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(user).toEqual(expectedUser);
  });

  it('should throw an error if service throws an error', async () => {
    // Arrange
    const userId = 1;
    const serviceError = new Error('Service error');
    jest.spyOn(usersService, 'findUserById').mockRejectedValueOnce(serviceError);

    // Act and Assert
    await expect(usersService.findUserById(userId)).rejects.toThrow(serviceError);
  });


  it('should return null if user is not found', async () => {
    // Arrange
    const userId = 1;
    jest.spyOn(usersService, 'findUserById').mockResolvedValue(null);

    // Act
    const user = await usersService.findUserById(userId);

    // Assert
    expect(user).toBeNull();
  });
});
