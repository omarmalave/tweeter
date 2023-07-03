import { Field, ObjectType } from "@nestjs/graphql";
import { Node } from '../../core/models/node.model';

@ObjectType()
export class Profile extends Node {
  @Field()
  bio: string;

  @Field()
  avatar: string;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
