# Group

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const boardId = 67484;
api.group.listGroup(boardId, ["id"]);
```

## API

Defined in [/src/api/group.ts](../src/api/group.ts)

### **listGroup**

| Name    | Type                                       | Optional |
| ------- | ------------------------------------------ | -------- |
| boardId | Number                                     | False    |
| fields  | [GroupField[]](../src/interfaces/group.ts) | False    |

### **createGroup**

| Name   | Type                                          | Optional |
| ------ | --------------------------------------------- | -------- |
| args   | [CreateGroupArgs](../src/interfaces/group.ts) | False    |
| fields | [GroupField[]](../src/interfaces/group.ts)    | False    |

### **removeGroup**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [CreateGroupArgs](../src/interfaces/group.ts) | False    |
| fields | [GroupField[]](../src/interfaces/group.ts)    | False    |
