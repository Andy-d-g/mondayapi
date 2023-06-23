import { BoardField, CreateBoardArgs } from "../interfaces/board";
import { DistinctArgs } from "../interfaces/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class BoardApi {
  /**
   * Get board by id
   */
  public static get = async <T extends DistinctArgs<BoardField<1>>>(
    boardId: number,
    fields: T
  ) => {
    return (
      await request<BoardField<1>, typeof fields, ResponseFormatEnum.ARRAY>(
        `query { boards (ids: ${boardId}) {${formatFields(fields)}} }`
      )
    )[0];
  };

  /**
   * List boards
   */
  public static list = async <T extends DistinctArgs<BoardField<1>>>(
    fields: T
  ) => {
    return request<BoardField<1>, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { boards {${formatFields(fields)}} }`
    );
  };

  /**
   * Create board
   */
  public static create = <T extends DistinctArgs<BoardField<1>>>(
    args: CreateBoardArgs,
    fields: T
  ) => {
    return request<BoardField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_board (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };

  /**
   * Remove board by id
   */
  public static remove = <T extends DistinctArgs<BoardField<1>>>(
    boardId: number,
    fields: T
  ) => {
    return request<BoardField<1>, typeof fields>(
      // prettier-ignore
      `mutation { delete_board (board_id: ${boardId}) {${formatFields(fields)}} }`
    );
  };
}

export default BoardApi;
