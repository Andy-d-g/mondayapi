# Board

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.board.get(boardId, ["id"]);
```

## API

Defined in [/src/api/board.ts](../src/api/board.ts)

### **get**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |

### **create**

| Name   | Type                                          | Optional |
| ------ | --------------------------------------------- | -------- |
| args   | [CreateBoardArgs](../src/interfaces/board.ts) | False    |
| fields | [BoardField[]](../src/interfaces/board.ts)    | False    |

### **list**

| Name   | Type                                       | Optional |
| ------ | ------------------------------------------ | -------- |
| fields | [BoardField[]](../src/interfaces/board.ts) | False    |

### **remove**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |
