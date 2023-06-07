# Board

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.board.getBoard(boardId, ["id"]);
```

## API

Defined in [/src/api/board.ts](../src/api/board.ts)

### **getBoard**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |

### **listBoard**

| Name   | Type                                       | Optional |
| ------ | ------------------------------------------ | -------- |
| fields | [BoardField[]](../src/interfaces/board.ts) | False    |

### **removeBoard**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [BoardField[]](../src/interfaces/board.ts) | False    |
