export interface Workspace {
    id: number;
    name: string;
}

const workspaces: Workspace[] = [
    { id: 1, name: "dev" },
    { id: 2, name: "prod" },
    { id: 3, name: "intg" }
];

const list = (): Workspace[] => workspaces;

export { list }