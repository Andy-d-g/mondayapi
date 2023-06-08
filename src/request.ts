import axios from "axios";
import config from "./config";
import { DistinctArgs, DeepPick } from "./interfaces/generics";

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
  const { data } = response.data;
  if (!data) {
    console.error(response.data);
    throw new Error("No data");
  }
  const key = Object.keys(data).at(0);
  if (!key) {
    console.error(response);
    throw new Error("No key");
  }
  return data[key];
};

export default request;
