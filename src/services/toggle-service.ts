import { Toggle, list } from "../models/toggle-model";
import { Workspace } from "../models/workspace-model";

const enable = (toggleId: number): Toggle => {
    const toggle = list().find(toggle => {
        return toggle.id === toggleId;
    });
    if (!toggle) {
        throw new Error(`Couldn't find the toggle with id ${toggleId}`);
    }
    if (toggle.enabled === true) {
        throw new Error(`Toggle with id ${toggleId} is already enabled`);
    }
    toggle.enabled = true;
    return toggle;
}

const find = (id: number): Toggle | undefined => list().find(toggle => toggle.id === id);

const fetchAll = () => list();

const fetchTogglesDependsOn = (toggle: Toggle) => list().filter(t => toggle.dependsOn.includes(t.id));

const update = (toggle: Toggle) => {
    let result: Toggle | undefined = find(toggle.id);
    if(result) {
        result.name = toggle.name;
        result.enabled = toggle.enabled;
        // result.workspace_id = toggle.workspace_id;
        // result.dependsOn = toggle.dependsOn;
    } else {
        throw new Error(`Couldn't find the toggle with id ${toggle.id}`);
    }

    return result;
}

const togglesFromWorkspace = (workspace: Workspace) => list().filter(toggle => toggle.workspace_id === workspace.id);

export { enable, fetchAll, fetchTogglesDependsOn, find, togglesFromWorkspace, update }