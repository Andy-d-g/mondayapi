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

const _formatFields = (obj: Record<string, any>) => {
  let text = "";
  for (const key of Object.keys(obj)) {
    if (isEmpty(obj[key])) {
      text += ` ${key},`;
      continue;
    }
    text += ` ${key} { ${_formatFields(obj[key])} },`;
  }
  return text.slice(0, -1);
};

export const formatFields = (args: string[]) => _formatFields(listToObj(args));

const customType = z.enum([
  "position_relative_method",
  "type",
  "board_kind",
  "column_type",
  "item_id",
  "kind",
]);
const isString = (v: unknown) => z.string().safeParse(v).success;
const isNumber = (v: unknown) => z.number().safeParse(v).success;
const isCustomType = (v: unknown) => customType.safeParse(v).success;
const isArray = (v: unknown) => Array.isArray(v);

export const formatArgs = (options: Record<string, unknown>) => {
  // clean undefined properties
  Object.keys(options).forEach((key) =>
    options[key] === undefined ? delete options[key] : {}
  );
  const keys = Object.keys(options);
  const listParams = keys.map((key) => {
    if (isCustomType(key)) return `${key}: ${options[key]}`;
    if (isString(options[key])) return `${key}: "${options[key]}"`;
    if (isNumber(options[key])) return `${key}: ${options[key]}`;
    if (isArray(options[key])) {
      const list = options[key] as unknown[];
      const formatedList = list.map((e) => {
        if (isString(e)) return `"${e}"`;
        if (isNumber(e)) return e;
        throw new Error(`type not supported : ${e}`);
      });
      return `${key}: [${formatedList.join(", ")}]`;
    }
    throw new Error(`type not supported : ${options[key]}`);
  });
  return listParams.join(", ");
};
