# User

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const limit = 50;
api.user.listByBoard(limit, ["id"]);
```

## API

Defined in [/src/api/user.ts](../src/api/user.ts)

### **list**

| Name   | Type                                     | Optional |
| ------ | ---------------------------------------- | -------- |
| limit  | number                                   | False    |
| fields | [UserField[]](../src/interfaces/user.ts) | False    |

### **addToBoard**

| Name    | Type                                              | Optional |
| ------- | ------------------------------------------------- | -------- |
| userId  | [UserField["id"]](../src/interfaces/user.ts)      | False    |
| boardId | [BoardField["id"]](../src/interfaces/board.ts)    | False    |
| kind    | [BoardSubscriberKind](../src/interfaces/board.ts) | False    |
| fields  | [UserField[]](../src/interfaces/user.ts)          | False    |

### **addToWorkspace**

| Name        | Type                                                      | Optional |
| ----------- | --------------------------------------------------------- | -------- |
| userId      | [UserField["id"]](../src/interfaces/user.ts)              | False    |
| workspaceId | [WorkspaceField["id"]](../src/interfaces/workspace.ts)    | False    |
| kind        | [WorkspaceSubscriberKind](../src/interfaces/workspace.ts) | False    |
| fields      | [UserField[]](../src/interfaces/user.ts)                  | False    |

### **removeFromWorkspace**

| Name        | Type                                                   | Optional |
| ----------- | ------------------------------------------------------ | -------- |
| userId      | [UserField["id"]](../src/interfaces/user.ts)           | False    |
| workspaceId | [WorkspaceField["id"]](../src/interfaces/workspace.ts) | False    |
| fields      | [UserField[]](../src/interfaces/user.ts)               | False    |
