import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { workspaces, toggles, WorkspaceData } from "../data";
import Workspace from "../schemas/workspace";

@Resolver(of => Workspace)
export default class {
  @Query(returns => Workspace, { nullable: true })
  workspaceByName(@Arg("name") name: string): WorkspaceData | undefined {
    return workspaces.find(workspace => workspace.name === name);
  }

  @FieldResolver()
  toggles(@Root() workspaceData: WorkspaceData) {
    return toggles.filter(toggle => {
      return toggle.workspace_id === workspaceData.id;
    });
  }
}