import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { ToggleData } from "../data";
import Toggle from "../schemas/toggle";
import * as service from "../services/toggle-service"

@Resolver(of => Toggle)
export default class {
  @Query(returns => [Toggle])
  fetchToggles(): ToggleData[] {
    return service.fetchAll();
  }

  @Query(returns => Toggle, { nullable: true })
  getToggle(@Arg("id") id: number): ToggleData | undefined {
    return service.find(id);
  }

  @Mutation(returns => Toggle)
  enable(@Arg("toggleId") toggleId: number): ToggleData {
    return service.enable(toggleId);
  }

  @FieldResolver()
  workspace(@Root() toggleData: ToggleData) {
    return service.workspaceFromToggle(toggleData);
  }

  @FieldResolver()
  dependsOn(@Root() toggleData: ToggleData) {
    return service.fetchTogglesDependsOn(toggleData);
  }
}