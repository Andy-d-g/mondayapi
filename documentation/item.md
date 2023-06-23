# Item

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.item.listByBoard(boardId, ["id"]);
```

## API

Defined in [/src/api/item.ts](../src/api/item.ts)

### **create**

| Name   | Type                                        | Optional |
| ------ | ------------------------------------------- | -------- |
| args   | [CreateItemArgs](../src/interfaces/item.ts) | False    |
| fields | [ItemField[]](../src/interfaces/item.ts)    | False    |
| values | Record<string, string \| number>            | False    |

### **listByBoard**

| Name    | Type                             | Optional |
| ------- | -------------------------------- | -------- |
| boardId | Number                           | False    |
| values  | Record<string, string \| number> | False    |

### **listByGroup**

| Name    | Type                                     | Optional |
| ------- | ---------------------------------------- | -------- |
| boardId | Number                                   | False    |
| groupId | Number                                   | False    |
| fields  | [ItemField[]](../src/interfaces/item.ts) | False    |
