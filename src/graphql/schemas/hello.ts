import "reflect-metadata";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Hello {
  @Field()
  id!: number;
  @Field()
  message!: string;
}

@InputType()
export class HelloInput implements Pick<Hello, "message"> {
  @Field()
  message!: string;
}
