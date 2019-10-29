import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import * as toggleService from "../services/toggle.service"
import * as workspaceService from "../services/workspace.service"
import WorkspaceSchema from "../schemas/workspace.schema";
import { Workspace } from "../models/workspace.model";

@Resolver(of => WorkspaceSchema)
export default class {
  @Query(returns => WorkspaceSchema, { nullable: true })
  workspaceByName(@Arg("name") name: string): Workspace | undefined {
    return workspaceService.workspaceByName(name);
  }

  @FieldResolver()
  toggles(@Root() workspace: Workspace): Workspace[] {
    return toggleService.togglesFromWorkspace(workspace);
  }
}