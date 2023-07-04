import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { UsersModule } from '../users/users.module';
import { CoreModule } from '../core/core.module';
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    CoreModule,
    UsersModule
  ],
})
export class AppModule { }
