export interface WorkspaceData {
  id: number;
  name: string;
}

export const workspaces: WorkspaceData[] = [
  { id: 1, name: "dev" },
  { id: 2, name: "prod" },
  { id: 3, name: "intg" }
];