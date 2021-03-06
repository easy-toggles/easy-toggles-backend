import *  as model from '../models/toggle.model';
import { ImportMock } from 'ts-mock-imports';
import { fetchAll, find, fetchTogglesDependsOn, update, togglesFromWorkspace } from "./toggle.service";
import 'jest-extended';


describe('Toggle Service', function () {
    let stubList: any;

    beforeEach(() => {
        stubList = ImportMock.mockFunction(model, 'list', [
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1], assertions: [] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [], assertions: [] },
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [], assertions: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [], assertions: [] },
        ]);
    });

    afterEach(() => {
        stubList.restore()
    });

    it('fetchAll should return all toggles', function () {
        const result = fetchAll();

        expect(result).toEqual([
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1], assertions: [] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [], assertions: [] },
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [], assertions: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [], assertions: [] },
        ]);
    });

    it('find should return toggle with specific id', function () {
        const result = find(1);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] };

        expect(result).toEqual(expected);
    });

    it('fetchTogglesDependsOn should return toggles information list from specific toggle', function () {
        const targetToggle = { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1], assertions: [] };
        const result = fetchTogglesDependsOn(targetToggle);
        const expected = [{ id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] }];

        expect(result).toIncludeAllMembers(expected);
    })

    it('should update the referenced toggle`s id name when an existent id and a diffrent name are passed', () => {
        let targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] };
        targetToggle.name = "Feature 2A";
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature 2A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] }

        expect(result).toStrictEqual(expected);
    });

    it('should update the referenced toggle`s id enable flag when an existent id and a diffrent status are passed', () => {
        let targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] };
        targetToggle.enabled = !targetToggle.enabled;
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature A", enabled: false, workspace_id: 1, dependsOn: [], assertions: [] }

        expect(result).toStrictEqual(expected);
    });

    it('should throw and expection when an unexisted toggle`s id are passed to update', () => {
        function updateToggle() {
            update({ id: 42, name: "Feature X", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] })
        }
        expect(updateToggle).toThrowError(/^Couldn't find the toggle with id 42$/);
    });

    it('should update the workspace_id given an existing toggle id', () => {
        let targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] };
        targetToggle.workspace_id = 15;
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 15, dependsOn: [], assertions: [] };

        expect(result).toStrictEqual(expected)
    });

    it('should update the dependsOn list given an existing toggle id', () => {
        let targetToggle : model.Toggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] };
        targetToggle.dependsOn.push(42);
        const result = update(targetToggle);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [42], assertions: [] };

        expect(result).toStrictEqual(expected)
    });

    it('should throw and expection when denpendsOn chains B => A => B with the update', () => {
        function updateToggle() {
            let targetToggle : model.Toggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [2], assertions: [] };
            update(targetToggle)
        }
        expect(updateToggle).toThrowError(/^Toggle id 1 is closing a circular dependency$/);
    });

    it('should throw and expection when denpendsOn chains B => A => C => B with the update', () => {
        function updateToggles() {
            let AdependsC : model.Toggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [3], assertions: [] };
            let CdependsB : model.Toggle = { id: 3, name: "Feature C", enabled: true, workspace_id: 1, dependsOn: [2], assertions: [] };
            update(AdependsC)
            update(CdependsB)
        }
        expect(updateToggles).toThrowError(/^Toggle id 3 is closing a circular dependency$/);
    });

    it('should throw and expection when denpendsOn chains B => A => C and D => B with the update', () => {
        function updateToggles() {
            let AdependsC : model.Toggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [3, 4], assertions: [] };
            let CdependsB : model.Toggle = { id: 3, name: "Feature C", enabled: true, workspace_id: 1, dependsOn: [2], assertions: [] };
            update(AdependsC)
            update(CdependsB)
        }
        expect(updateToggles).toThrowError(/^Toggle id 3 is closing a circular dependency$/);
    });

    it('togglesFromWorkspace should return all toggle that belongs to workspace prod', function () {
        const result = togglesFromWorkspace({ id: 2, name: "prod" });
        expect(result).toIncludeAllMembers([
            { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [], assertions: [] },
            { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [], assertions: [] }
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
            { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] },
            { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1], assertions: [] },
            { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [], assertions: [] }
        ])
    })
});

