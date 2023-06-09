// https://developer.monday.com/api-reference/docs/users

import { BoardField, BoardSubscriberKind } from "./board";
import { NonEmptyArray } from "./generics";
import { WorkspaceField, WorkspaceSubscriberKind } from "./workspace";

export type UserField = {
  country_code: string;
  current_language: string;
  email: string;
  enabled: boolean;
  id: number;
  is_admin: boolean;
  is_guest: boolean;
  is_pending: boolean;
  is_view_only: boolean;
  is_verified: boolean;
  location: string;
  mobile_phone: string;
  name: string;
  phone: string;
  photo_small: string;
  photo_original: string;
  photo_thumb: string;
  photo_thumb_small: string;
  photo_tiny: string;
  sign_up_product_kind: string;
  title: string;
  url: string;
  utc_hours_diff: number;
};

export type AddUserToBoardArgs = {
  userIds: NonEmptyArray<UserField["id"]>;
  boardId: number;
  boardKind?: BoardSubscriberKind;
};

export type AddUserToWorkspaceArgs = {
  userIds: NonEmptyArray<UserField["id"]>;
  workspaceId: WorkspaceField["id"];
  workspaceKind?: WorkspaceSubscriberKind;
};
