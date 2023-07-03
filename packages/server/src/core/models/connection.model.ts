import { Field, ObjectType, ReturnTypeFuncValue } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { IPageInfo, PageInfo } from './page-info.model';

interface IEdge<T> {
  cursor: string;
  node: T;
}

export interface IConnection<T> {
  edges: IEdge<T>[];
  pageInfo: IPageInfo;
}

export function Connected<T>(classRef: Type<T>): Type<IConnection<T>> {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class Edge implements IEdge<T> {
    @Field()
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType(`${classRef.name}Connection`, { isAbstract: true })
  abstract class Connection implements IConnection<T> {
    @Field((type) => [Edge])
    edges: Edge[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }

  return Connection as Type<IConnection<T>>;
}
