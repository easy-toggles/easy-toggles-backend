import *  as model from '../store/toggle-model';
import { ImportMock } from 'ts-mock-imports';
import { fetchAll, find, fetchTogglesDependsOn, update, togglesFromWorkspace } from "./toggle-service";
import 'jest-extended';


describe('Toggle Service', function () {
    let stubList: any;

    beforeEach(() => {
        stubList = ImportMock.mockFunction(model, 'list', [
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [] },
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [] },
          ]);
    });

    afterEach(() => {
        stubList.restore()
    });

    it('fetchAll should return all toggles', function () {
        const result = fetchAll();

        expect(result).toEqual([
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [] },
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [] },
          ]);
    });

    it('find should return toggle with specific id', function () {
        const result = find(1);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] };

        expect(result).toEqual(expected);
    });

    it('fetchTogglesDependsOn should return toggles information list from specific toggle', function () {
        const targetToggle = { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] };
        const result = fetchTogglesDependsOn(targetToggle);
        const expected = [{ id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] }];

        expect(result).toIncludeAllMembers(expected);
    })

    it('update should update the referenced toggle`s id name when an existent id and a diffrent name are passed', () => {
        let targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] };
        targetToggle.name = "Feature 2A";
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature 2A", enabled: true, workspace_id: 1, dependsOn: [] }

        expect(result).toStrictEqual(expected);
    });

    it('update should update the referenced toggle`s id enable flag when an existent id and a diffrent status are passed', () => {
        let targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] };
        targetToggle.enabled = !targetToggle.enabled;
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature A", enabled: false, workspace_id: 1, dependsOn: [] }

        expect(result).toStrictEqual(expected);
    });

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

    it('togglesFromWorkspace should return all toggle that belongs to workspace dev', function () {
        stubList.restore()
        const result = togglesFromWorkspace({ id: 1, name: "dev" });
        expect(result).toIncludeAllMembers([
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [] }
        ])
    })
});

