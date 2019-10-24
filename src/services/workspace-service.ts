
import { workspaces, WorkspaceData } from "../data";
import { Toggle } from '../models/toggle-model';

const workspaceByName = (name: string): WorkspaceData | undefined => workspaces.find(workspace => workspace.name === name);

const workspaceFromToggle = (toggle: Toggle) => workspaces.find(workspace => workspace.id === toggle.workspace_id);

export { workspaceByName, workspaceFromToggle }