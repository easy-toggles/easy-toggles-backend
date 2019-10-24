import { Toggle } from '../models/toggle-model';
import { Workspace, list } from '../models/workspace-model';

const workspaceByName = (name: string): Workspace | undefined => list().find(workspace => workspace.name === name);

const workspaceFromToggle = (toggle: Toggle) => list().find(workspace => workspace.id === toggle.workspace_id);

export { workspaceByName, workspaceFromToggle }