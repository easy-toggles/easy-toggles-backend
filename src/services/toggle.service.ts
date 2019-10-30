import { Toggle, list } from "../models/toggle.model";
import { Workspace } from "../models/workspace.model";

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

const find = (id: number | undefined): Toggle | undefined => list().find(toggle => toggle.id === id);

const fetchAll = () => list();

const fetchTogglesDependsOn = (toggle: Toggle) => list().filter(t => toggle.dependsOn.includes(t.id));

const checkCircularDependency = (list: Array<number>) => {
    let visited: number[] = []
    let queue: Array<number> = list.slice(0);

    while (queue.length) {
        let next = queue.pop();
        if(next) {
            if (visited.includes(next)) {
                throw new Error(`Toggle id ${next} is closing a circular dependency`);
            }
            let element = find(next)
            if (element) {
                queue.push(...element.dependsOn)
            }
            visited.push(next)
        }
    }
}

const update = (toggle: Toggle) => {
    let result: Toggle | undefined = find(toggle.id);
    if(result) {
        checkCircularDependency([toggle.id, ...toggle.dependsOn])
        result.name = toggle.name;
        result.enabled = toggle.enabled;
        result.workspace_id = toggle.workspace_id;
        result.dependsOn = toggle.dependsOn;
    } else {
        throw new Error(`Couldn't find the toggle with id ${toggle.id}`);
    }

    return result;
}

const togglesFromWorkspace = (workspace: Workspace) => list().filter(toggle => toggle.workspace_id === workspace.id);

export { enable, fetchAll, fetchTogglesDependsOn, find, togglesFromWorkspace, update }