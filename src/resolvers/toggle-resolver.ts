import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Toggle } from "../store/toggle-model";
import * as toggleService from "../services/toggle-service"
import * as workspaceService from "../services/workspace-service"
import ToggleSchema from "../schemas/toggle";

@Resolver(of => ToggleSchema)
export default class {
  @Query(returns => [ToggleSchema])
  fetchToggles(): Toggle[] {
    return toggleService.fetchAll();
  }

  @Query(returns => ToggleSchema, { nullable: true })
  getToggle(@Arg("id") id: number): Toggle | undefined {
    return toggleService.find(id);
  }

  @Mutation(returns => ToggleSchema)
  enable(@Arg("toggleId") toggleId: number): Toggle {
    return toggleService.enable(toggleId);
  }

  @FieldResolver()
  workspace(@Root() toggle: Toggle) {
    return workspaceService.workspaceFromToggle(toggle);
  }

  @FieldResolver()
  dependsOn(@Root() toggle: Toggle) {
    return toggleService.fetchTogglesDependsOn(toggle);
  }
}