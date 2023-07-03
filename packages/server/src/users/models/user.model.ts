import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Node } from '../../core/models/node.model';
import { Profile } from './profile.model';
import { Connected } from '../../core/models/connection.model';

@ObjectType()
export class User extends Node {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((_type) => Profile)
  profile: Profile;

  @Field((_type) => [UserConnection])
  following: UserConnection[];

  @Field((_type) => [UserConnection])
  followers: UserConnection[];
}

@ObjectType()
export class UserConnection extends Connected(User) {}
