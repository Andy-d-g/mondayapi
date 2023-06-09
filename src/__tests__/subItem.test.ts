import { after, before, describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { DistinctArgs } from "../interfaces/generics";
import { CreateSubItemArgs, ItemField } from "interfaces";
import api from "./utils";

let board_id = 123;
let group_id = "123";
let item_id = 123;

describe("Sub Item API", () => {
  before(async () => {
    const responseBoard = await api.board.createBoard(
      { board_name: "board_name", board_kind: "share" },
      ["id"]
    );
    board_id = Number(responseBoard.id);
    const responseGroup = await api.group.createGroup(
      { board_id, group_name: "group_name" },
      ["id"]
    );
    group_id = responseGroup.id;
    const responseItem = await api.item.createItem(
      {
        board_id,
        group_id,
        item_name: "item_test",
      },
      ["id"],
      {}
    );
    item_id = Number(responseItem.id);
  });

  after(async () => {
    await api.board.removeBoard(board_id, ["id"]);
  });

  it("createSubItem", async () => {
    const item_name = "test";
    const args: CreateSubItemArgs = {
      item_name,
      parent_item_id: item_id,
    };
    const keys = ["id", "name", "state"] satisfies DistinctArgs<ItemField>;
    const response = await api.subItem.createSubItem(args, keys, {});
    deepStrictEqual(Object.keys(response), keys);
    strictEqual(response.name, item_name);
  });

  it("listSubItemsByItem", async () => {
    const keys = ["id", "name"] satisfies DistinctArgs<ItemField>;
    const response = await api.subItem.listSubItemsByItem(item_id, keys);
    strictEqual(response.length, 1);
    deepStrictEqual(Object.keys(response[0]), keys);
  });
});
