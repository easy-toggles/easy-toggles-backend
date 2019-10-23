
import { workspaces, WorkspaceData } from "../data";
import { list } from '../store/toggle-model';

const workspaceByName = (name: string): WorkspaceData | undefined => workspaces.find(workspace => workspace.name === name);

const togglesFromWorkspace = (workspace: WorkspaceData) => list().filter(toggle => toggle.workspace_id === workspace.id);

export { togglesFromWorkspace, workspaceByName }