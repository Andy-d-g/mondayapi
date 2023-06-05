import axios from "axios";
import config from "./config";
import { DistinctArgs, DeepPick } from "./interfaces/generics";

const request = async <
  T extends Record<string, unknown>,
  K extends DistinctArgs<T>
>(
  query: string
): Promise<DeepPick<T, K[number]>> => {
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
    console.log(response.data);
    throw new Error("No data");
  }
  const key = Object.keys(data).at(0);
  if (!key) {
    console.log(response);
    throw new Error("No key");
  }
  return data[key];
};

export default request;
