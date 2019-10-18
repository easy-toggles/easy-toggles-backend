import { Field, Int, ObjectType } from "type-graphql";
import Toggle from "./toggle";

@ObjectType()
export default class Workspace {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Toggle])
  toggles: Toggle[];
}