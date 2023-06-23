# Group

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.group.list(boardId, ["id"]);
```

## API

Defined in [/src/api/group.ts](../src/api/group.ts)

### **list**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [GroupField[]](../src/interfaces/group.ts) | False    |

### **create**

| Name   | Type                                          | Optional |
| ------ | --------------------------------------------- | -------- |
| args   | [CreateGroupArgs](../src/interfaces/group.ts) | False    |
| fields | [GroupField[]](../src/interfaces/group.ts)    | False    |

### **remove**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [CreateGroupArgs](../src/interfaces/group.ts) | False    |
| fields | [GroupField[]](../src/interfaces/group.ts)    | False    |
