import { toggles } from "../data";
import { fetchAll, find, workspaceFromToggle, fetchTogglesDependsOn } from "./toggle-service";
import 'jest-extended';

describe('Toggle Service', function () {
    it('fetchAll should return all toggles', function () {
        const result = fetchAll();

        expect(result).toEqual(toggles);
    });

    it('find should return toggle with specific id', function () {
        const result = find(1);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] };

        expect(result).toEqual(expected);
    });

    it('workspaceFromToggle should return workspace information from toggle', function () {
        const targetToggle = { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] };
        const result = workspaceFromToggle(targetToggle);
        const expected = { id: 1, name: "dev" };

        expect(result).toEqual(expected);
    })

    it('fetchTogglesDependsOn should return toggles information list from specific toggle', function () {
        const targetToggle = { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1] };
        const result = fetchTogglesDependsOn(targetToggle);
        const expected = [{ id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [] }];

        expect(result).toIncludeAllMembers(expected);
    })

});

