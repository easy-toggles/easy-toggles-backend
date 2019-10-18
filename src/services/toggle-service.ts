import { workspaces, toggles, ToggleData } from "../data";

const enable = (toggleId: number): ToggleData => {
    const toggle = toggles.find(toggle => {
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

const find = (id: number): ToggleData | undefined => toggles.find(toggle => toggle.id === id);

const workspaceFromToggle = (toggle: ToggleData) => workspaces.find(workspace => workspace.id === toggle.workspace_id);

const fetchAll = () => toggles;

const fetchTogglesDependsOn = (toggle: ToggleData) => toggles.filter(t => toggle.dependsOn.includes(t.id));

export { enable, fetchAll, fetchTogglesDependsOn, find, workspaceFromToggle }