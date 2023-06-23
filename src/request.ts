import axios from "axios";
import config from "./config";
import { DistinctArgs, DeepPick } from "./interfaces/generics";
import util from "util";

export enum ResponseFormatEnum {
  OBJECT = "object",
  ARRAY = "array",
}

const request = async <
  T extends Record<string, unknown>,
  K extends DistinctArgs<T>,
  R extends ResponseFormatEnum = ResponseFormatEnum.OBJECT
>(
  query: string
): Promise<
  R extends ResponseFormatEnum.ARRAY
    ? Array<DeepPick<T, K[number]>>
    : DeepPick<T, K[number]>
> => {
  const response = await axios.post(
    "https://api.monday.com/v2",
    { query },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: config.mondayApiKey,
      },
    }
  );
  const { data, errors } = response.data;
  if (errors) {
    console.error(`Query : ${query}`);
    console.error(util.inspect(errors, false, null, true));
    throw new Error("Invalid request");
  }
  const key = Object.keys(data).at(0)!;
  return data[key];
};

export default request;
