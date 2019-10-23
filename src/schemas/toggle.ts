import { Field, Int, ObjectType } from "type-graphql";
import Workspace from "./workspace";

@ObjectType("Toggle")
export default class ToggleSchema {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Workspace)
  workspace: Workspace;

  @Field()
  enabled: boolean;

  @Field(type => [ToggleSchema])
  dependsOn: ToggleSchema[];
}