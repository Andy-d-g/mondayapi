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
  it("createBoard", async () => {
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
    const response = await api.board.createBoard(args, keys);
    deepStrictEqual(Object.keys(response), keys);
    board = response;
  });

  it("getBoard", async () => {
    const keys = ["id", "description"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.getBoard(board.id, ["id", "description"]);
    deepStrictEqual(Object.keys(response), keys);
    strictEqual(response.description, board.description);
  });

  it("listBoard", async () => {
    const keys = ["id"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.listBoard(keys);
    response.forEach((board) => deepStrictEqual(Object.keys(board), keys));
  });

  it("removeBoard", async () => {
    const keys = ["name", "description"] satisfies DistinctArgs<BoardField>;
    const response = await api.board.removeBoard(board.id, keys);
    deepStrictEqual(Object.keys(response), keys);
  });
});
