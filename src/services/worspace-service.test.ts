import { workspaceByName, togglesFromWorkspace } from "./workspace-service";
import 'jest-extended';

describe('Workspce Service', function () {
    it('workspaceByName should return workspace information when name is dev', function () {
        const result = workspaceByName("dev");
        expect(result).toStrictEqual({ id: 1, name: "dev" });
    });

    it('workspaceByName should return workspace information when name is prod', function () {
        const result = workspaceByName("prod");
        expect(result).toStrictEqual({ id: 2, name: "prod" });
    })

    it('workspaceByName should return undefined when name doesnt exist', function () {
        const result = workspaceByName("blah");
        expect(result).toBeUndefined();
    })

    it('togglesFromWorkspace should return all toggle that belongs to workspace dev', function () {
        const result = togglesFromWorkspace({ id: 1, name: "dev" });
        expect(result).toIncludeAllMembers([
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [] }
        ])
    })

    it('togglesFromWorkspace should return all toggle that belongs to workspace prod', function () {
        const result = togglesFromWorkspace({ id: 2, name: "prod" });
        expect(result).toIncludeAllMembers([
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [] }
        ])
    })

    it('togglesFromWorkspace should return empty list when workspace doesnt exist', function () {
        const result = togglesFromWorkspace({ id: 3, name: "blah" });
        expect(result).toBeEmpty()
    })

    it('togglesFromWorkspace should return empty list when workspace doesnt have toggles', function () {
        const result = togglesFromWorkspace({ id: 3, name: "intg" });
        expect(result).toBeEmpty()
    })
});