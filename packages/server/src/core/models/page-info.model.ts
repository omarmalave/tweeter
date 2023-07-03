import { Field, ObjectType } from '@nestjs/graphql';

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount?: number;
}

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field((type) => String, { nullable: true })
  startCursor?: string;

  @Field((type) => String, { nullable: true })
  endCursor?: string;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field((type) => Number, { nullable: true })
  totalCount?: number;
}
