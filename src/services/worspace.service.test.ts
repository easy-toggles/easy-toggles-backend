import { workspaceByName, workspaceFromToggle } from "./workspace.service";
import { ImportMock } from "ts-mock-imports";
import * as model from "../models/workspace.model";
import 'jest-extended';

describe('Workspce Service', function () {
    let stubList: any;

    beforeEach(() => {
        stubList = ImportMock.mockFunction(model, 'list', [
            { id: 1, name: "dev" },
            { id: 2, name: "prod" },
            { id: 3, name: "intg" }
        ]);
    });

    afterEach(() => {
        stubList.restore()
    });
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

    it('workspaceFromToggle should return workspace information from toggle', function () {
        const result = workspaceFromToggle({ id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] });
        const expected = { id: 1, name: "dev" };

        expect(result).toEqual(expected);
    })
});