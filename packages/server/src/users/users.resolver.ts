import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => User, { name: 'user' })
  async findUserById(@Args('id', { type: () => Int }) id: number) {
    const user = await this.usersService.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return user;
  }
}
