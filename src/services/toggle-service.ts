import { workspaces, ToggleData } from "../data";
import { list } from "../store/toggle-model";

const enable = (toggleId: number): ToggleData => {
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

const find = (id: number): ToggleData | undefined => list().find(toggle => toggle.id === id);

const workspaceFromToggle = (toggle: ToggleData) => workspaces.find(workspace => workspace.id === toggle.workspace_id);

const fetchAll = () => list();

const fetchTogglesDependsOn = (toggle: ToggleData) => list().filter(t => toggle.dependsOn.includes(t.id));

const update = (toggle: ToggleData) => {
    let result: ToggleData | undefined = find(toggle.id);
    if(result) {
        result.name = toggle.name;
        result.enabled = toggle.enabled;
        // result.workspace_id = toggle.workspace_id;
        // result.dependsOn = toggle.dependsOn;
    }

    return result;
}

export { enable, fetchAll, fetchTogglesDependsOn, find, workspaceFromToggle, update }