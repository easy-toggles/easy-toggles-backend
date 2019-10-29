import { Assertion, ExpectToBeEqual } from "./assertion.model";

export interface Toggle {
    id: number;
    name: string;
    enabled: boolean;
    workspace_id: number;
    dependsOn: number[];
    assertions: Assertion[] | undefined;
}

const toggles: Toggle[] = [
    { id: 1, name: "Feature A", enabled: true, workspace_id: 1, dependsOn: [], assertions: [] },
    { id: 2, name: "Feature B depends A", enabled: false, workspace_id: 1, dependsOn: [1], assertions: [] },
    { id: 3, name: "Feature C", enabled: false, workspace_id: 1, dependsOn: [], assertions: [] },
    { id: 4, name: "Feature D", enabled: true, workspace_id: 2, dependsOn: [], assertions: [] },
    { id: 5, name: "Feature E", enabled: false, workspace_id: 2, dependsOn: [], assertions: [] },
    { id: 6, name: "Feature G", enabled: false, workspace_id: 2, dependsOn: [], assertions: [ new ExpectToBeEqual(false, "requisition.definedVariable", "42")] },
  ];

const list = (): Toggle[] =>  toggles;

export { list };