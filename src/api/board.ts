import { BoardField } from "../@types/board";
import { DistinctArgs } from "../@types/generics";
import { formatFields } from "../apiHelper";
import request from "../request";

class BoardApi {
  public static getBoard = <T extends DistinctArgs<BoardField>>(
    boardId: number,
    fields: T
  ) => {
    return request<BoardField, typeof fields>(
      `query { boards (ids: ${boardId}) {${formatFields(fields)}} }`
    );
  };

  public static listBoard = async <T extends DistinctArgs<BoardField>>(
    fields: T
  ) => {
    return request<BoardField, typeof fields>(
      `query { boards {${formatFields(fields)}} }`
    );
  };

  /*
  public static createBoard = <T extends DistinctArgs<BoardField>>(
    args: CreateBoardArgs,
    fields: T
  ) => {
    return request<BoardField, typeof fields>(
      `mutation { create_board () {${formatFields(fields)}} }`
    );
  };
  */

  public static removeBoard = <T extends DistinctArgs<BoardField>>(
    boardId: string,
    fields: T
  ) => {
    return request<BoardField, typeof fields>(
      // prettier-ignore
      `mutation { delete_board (board_id: ${boardId}) {${formatFields(fields)}} }`
    );
  };
}

export default BoardApi;
