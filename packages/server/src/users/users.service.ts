import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/services/prisma.service';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }

  async findUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

}
