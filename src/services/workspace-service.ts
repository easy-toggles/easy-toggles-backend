
import { workspaces, WorkspaceData, toggles } from "../data";

const workspaceByName = (name: string): WorkspaceData | undefined => workspaces.find(workspace => workspace.name === name);

const togglesFromWorkspace = (workspace: WorkspaceData) => toggles.filter(toggle => toggle.workspace_id === workspace.id);

export { togglesFromWorkspace, workspaceByName }