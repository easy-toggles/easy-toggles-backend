import { Field, Int, ObjectType } from "type-graphql";
import Workspace from "./workspace";

@ObjectType()
export default class Toggle {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Workspace)
  workspace: Workspace;

  @Field()
  enabled: boolean;

  @Field(type => [Toggle])
  dependsOn: Toggle[];
}