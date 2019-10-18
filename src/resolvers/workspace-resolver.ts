import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { WorkspaceData } from "../data";
import * as service from "../services/workspace-service"
import Workspace from "../schemas/workspace";

@Resolver(of => Workspace)
export default class {
  @Query(returns => Workspace, { nullable: true })
  workspaceByName(@Arg("name") name: string): WorkspaceData | undefined {
    return service.workspaceByName(name);
  }

  @FieldResolver()
  toggles(@Root() workspaceData: WorkspaceData): WorkspaceData[] {
    return service.togglesFromWorkspace(workspaceData);
  }
}