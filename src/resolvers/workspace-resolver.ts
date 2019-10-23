import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { WorkspaceData } from "../data";
import * as toggleService from "../services/toggle-service"
import * as workspaceService from "../services/workspace-service"
import Workspace from "../schemas/workspace";

@Resolver(of => Workspace)
export default class {
  @Query(returns => Workspace, { nullable: true })
  workspaceByName(@Arg("name") name: string): WorkspaceData | undefined {
    return workspaceService.workspaceByName(name);
  }

  @FieldResolver()
  toggles(@Root() workspaceData: WorkspaceData): WorkspaceData[] {
    return toggleService.togglesFromWorkspace(workspaceData);
  }
}