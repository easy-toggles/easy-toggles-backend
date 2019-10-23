import { Toggle, list } from "../store/toggle-model";
import { WorkspaceData } from "../data";

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
    }

    return result;
}

const togglesFromWorkspace = (workspace: WorkspaceData) => list().filter(toggle => toggle.workspace_id === workspace.id);

export { enable, fetchAll, fetchTogglesDependsOn, find, togglesFromWorkspace, update }