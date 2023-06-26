import { UserField } from "./user";

export type WorkspaceKind = "closed" | "open";

export type WorkspaceState = "all" | "active" | "archived" | "deleted";

export type WorkspaceSubscriberKind = "subscriber" | "owner";

export type WorkspaceField = {
  description: string;
  id: number;
  kind: WorkspaceKind;
  name: string;
  state: WorkspaceState;
  owners_subscribers: UserField[];
  users_subscribers: UserField[];
};

export type CreateWorkspaceArgs = {
  description?: string;
  kind: WorkspaceKind;
  name: string;
};
