import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Node {
  @Field(type => ID)
  id: number;
}