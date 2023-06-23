export type WorkspaceKind = "closed" | "open"

export type WorkspaceState = "all" | "active" | "archived" | "deleted"

export type WorkspaceSubscriberKind = "subscriber" | "owner";

export type WorkspaceField = {
  description: string;
  id: number;
  kind: WorkspaceKind;
  name: string;
  state: WorkspaceState;
};