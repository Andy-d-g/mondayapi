# Column

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.column.listByBoard(boardId, ["id"]);
```

## API

Defined in [/src/api/column.ts](../src/api/column.ts)

### **create**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [CreateColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [ColumnField[]](../src/interfaces/column.ts)    | False    |

### **remove**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [RemoveColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [BoardField[]](../src/interfaces/board.ts)      | False    |

### **update**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [UpdateColumnArgs](../src/interfaces/column.ts) | False    |
| fields | [BoardField[]](../src/interfaces/board.ts)      | False    |
| values | Record<string, string \| number>                | False    |

### **listByBoard**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |
