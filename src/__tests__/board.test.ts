import { describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { BoardField, BoardKind, CreateBoardArgs } from "../interfaces/board";
import { DistinctArgs } from "../interfaces/generics";
import api from "./utils";

let board = {
  board_kind: "public",
  name: "test",
  id: 123,
  description: "description",
};

describe("Board API", () => {
  it("create", async () => {
    const args: CreateBoardArgs = {
      board_kind: board.board_kind as BoardKind,
      board_name: board.name,
      description: board.description,
    };
    const keys = [
      "id",
      "board_kind",
      "name",
      "description",
    ] satisfies DistinctArgs<BoardField>;
    const response = await api.board.create(args, keys);
    deepStrictEqual(Object.keys(response), keys);
    board = response;
  });

  it("get", async () => {
    const keys = ["id", "description"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.get(board.id, ["id", "description"]);
    deepStrictEqual(Object.keys(response), keys);
    strictEqual(response.description, board.description);
  });

  it("list", async () => {
    const keys = ["id"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.list(keys);
    response.forEach((board) => deepStrictEqual(Object.keys(board), keys));
  });

  it("remove", async () => {
    const keys = ["name", "description"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.remove(board.id, keys);
    deepStrictEqual(Object.keys(response), keys);
  });
});
