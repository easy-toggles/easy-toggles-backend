import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { ToggleData } from "../data";
import Toggle from "../schemas/toggle";
import { enable, fetchTogglesDependsOn, fetchAll, find, workspaceFromToggle } from "../services/toggle-service"

@Resolver(of => Toggle)
export default class {
  @Query(returns => [Toggle])
  fetchToggles(): ToggleData[] {
    return fetchAll();
  }

  @Query(returns => Toggle, { nullable: true })
  getToggle(@Arg("id") id: number): ToggleData | undefined {
    return find(id);
  }

  @Mutation(returns => Toggle)
  enable(@Arg("toggleId") toggleId: number): ToggleData {
    return enable(toggleId);
  }

  @FieldResolver()
  workspace(@Root() toggleData: ToggleData) {
    return workspaceFromToggle(toggleData);
  }

  @FieldResolver()
  dependsOn(@Root() toggleData: ToggleData) {
    return fetchTogglesDependsOn(toggleData);
  }
}