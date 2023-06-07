# Column

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.column.listColumnByBoard(boardId, ["id"]);
```

## API

Defined in [/src/api/column.ts](../src/api/column.ts)

### **createColumn**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [CreateColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [ColumnField[]](../src/interfaces/column.ts)    | False    |

### **removeColumn**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [RemoveColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [BoardField[]](../src/interfaces/board.ts)      | False    |

### **updateColumn**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [UpdateColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [BoardField[]](../src/interfaces/board.ts)      | False    |
| values | Record<string, string \| number>                | False    |

### **listColumnByBoard**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |
