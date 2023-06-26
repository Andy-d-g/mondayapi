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
    const formatedArgs = formatArgs({ ids: [boardId] });
    const formatedFields = formatFields(fields);
    const response = await request<
      BoardField<1>,
      typeof fields,
      ResponseFormatEnum.ARRAY
    >(`query { boards (${formatedArgs}) {${formatedFields}} }`);
    return response[0];
  };

  /**
   * List boards
   */
  public static list = async <T extends DistinctArgs<BoardField<1>>>(
    fields: T
  ) => {
    const formatedFields = formatFields(fields);
    return request<BoardField<1>, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { boards {${formatedFields}} }`
    );
  };

  /**
   * Create board
   */
  public static create = <T extends DistinctArgs<BoardField<1>>>(
    args: CreateBoardArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return request<BoardField<1>, typeof fields>(
      `mutation { create_board (${formatedArgs}) {${formatedFields}} }`
    );
  };

  /**
   * Remove board by id
   */
  public static remove = <T extends DistinctArgs<BoardField<1>>>(
    boardId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ board_id: boardId });
    const formatedFields = formatFields(fields);
    return request<BoardField<1>, typeof fields>(
      `mutation { delete_board (${formatedArgs}) {${formatedFields}} }`
    );
  };
}

export default BoardApi;
