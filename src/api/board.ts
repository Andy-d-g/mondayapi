import { BoardField, CreateBoardArgs } from "../interfaces/board";
import { DistinctArgs } from "../interfaces/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class BoardApi {
  /**
   * Get board by id
   * @template {T}
   * @param {number} boardId - The board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
   */
  public static getBoard = async <T extends DistinctArgs<BoardField<1>>>(
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
   * @template {T}
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an array of object which contains provide fields
   */
  public static listBoard = async <T extends DistinctArgs<BoardField<1>>>(
    fields: T
  ) => {
    return request<BoardField<1>, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { boards {${formatFields(fields)}} }`
    );
  };

  /**
   * Create board
   * @template {T}
   * @param {CreateBoardArgs} args - The board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
   */
  public static createBoard = <T extends DistinctArgs<BoardField<1>>>(
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
   * @template {T}
   * @param {number} boardId - The board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
   */
  public static removeBoard = <T extends DistinctArgs<BoardField<1>>>(
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
