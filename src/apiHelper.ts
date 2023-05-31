import { z } from "zod";

const isEmpty = (obj: Record<string, unknown>) => Object.keys(obj).length === 0;

const listToObj = (list: string[], obj: Record<string, any> = {}) => {
  for (const el of list) {
    if (!el.includes(".") && !obj[el.split(".").at(0)!]) {
      obj[el.split(".").at(0)!] = {};
    }
    if (el.includes(".")) {
      const chunks = el.split(".");
      const name = chunks.at(0)!;
      const rest = chunks.slice(1);
      obj[name] = listToObj(rest, obj[name]);
    }
  }
  return obj;
};

const formatFields_ = (obj: Record<string, any>) => {
  let text = "";
  for (const key of Object.keys(obj)) {
    if (isEmpty(obj[key])) {
      text += ` ${key},`;
    } else {
      text += ` ${key} { ${formatFields_(obj[key])} },`;
    }
  }
  return text.slice(0, -1);
};

export const formatFields = (args: string[]) => {
  const obj = listToObj(args)
  return formatFields_(obj)
};

const customType = z.enum([
  "position_relative_method",
  "type",
  "board_kind",
  "column_type",
  "item_id",
]);
const isString = (v: unknown) => z.string().safeParse(v).success;
const isNumber = (v: unknown) => z.number().safeParse(v).success;
const isCustomType = (v: unknown) => customType.safeParse(v).success;

export const formatArgs = (options: Record<string, unknown>) => {
  const keys = Object.keys(options);
  const listParams = keys.map((key) => {
    if (isCustomType(options[key])) {
      return `${key}: ${options[key]}`;
    }
    if (isString(options[key])) {
      return `${key}: "${options[key]}"`;
    }
    if (isNumber(options[key])) {
      return `${key}: ${options[key]}`;
    }
    throw new Error("type not supported");
  });
  return listParams.join(", ");
};
