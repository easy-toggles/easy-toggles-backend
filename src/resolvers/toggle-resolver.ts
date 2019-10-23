import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Toggle } from "../store/toggle-model";
import * as service from "../services/toggle-service"
import ToggleSchema from "../schemas/toggle";

@Resolver(of => ToggleSchema)
export default class {
  @Query(returns => [ToggleSchema])
  fetchToggles(): Toggle[] {
    return service.fetchAll();
  }

  @Query(returns => ToggleSchema, { nullable: true })
  getToggle(@Arg("id") id: number): Toggle | undefined {
    return service.find(id);
  }

  @Mutation(returns => ToggleSchema)
  enable(@Arg("toggleId") toggleId: number): Toggle {
    return service.enable(toggleId);
  }

  @FieldResolver()
  workspace(@Root() toggle: Toggle) {
    return service.workspaceFromToggle(toggle);
  }

  @FieldResolver()
  dependsOn(@Root() toggle: Toggle) {
    return service.fetchTogglesDependsOn(toggle);
  }
}