import { BoardField } from "../interfaces/board";
import { DistinctArgs } from "../interfaces/generics";
import { formatFields } from "../apiHelper";
import request from "../request";

class BoardApi {
  /**
   * Get board by id
   * @template {T}
   * @param {number} boardId - The board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
   */
  public static getBoard = <T extends DistinctArgs<BoardField>>(
    boardId: number,
    fields: T
  ) => {
    return request<BoardField, typeof fields>(
      `query { boards (ids: ${boardId}) {${formatFields(fields)}} }`
    );
  };

  /**
   * List boards
   * @template {T}
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
   */
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

  /**
   * Remove board by id
   * @template {T}
   * @param {number} boardId - The board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<BoardField, T>>} A promise of an object which contains provide fields
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
