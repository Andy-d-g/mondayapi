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

### **me**

| Name   | Type                                     | Optional |
| ------ | ---------------------------------------- | -------- |
| fields | [UserField[]](../src/interfaces/user.ts) | False    |

### **getByIds**

| Name    | Type                                           | Optional |
| ------- | ---------------------------------------------- | -------- |
| userIds | [UserField["id"][]](../src/interfaces/user.ts) | False    |
| fields  | [UserField[]](../src/interfaces/user.ts)       | False    |

### **getByEmails**

| Name       | Type                                              | Optional |
| ---------- | ------------------------------------------------- | -------- |
| userEmails | [UserField["email"][]](../src/interfaces/user.ts) | False    |
| fields     | [UserField[]](../src/interfaces/user.ts)          | False    |

### **list**

| Name   | Type                                     | Optional |
| ------ | ---------------------------------------- | -------- |
| limit  | number                                   | False    |
| fields | [UserField[]](../src/interfaces/user.ts) | False    |

### **addToBoard**

| Name   | Type                                            | Optional |
| ------ | ----------------------------------------------- | -------- |
| args   | [AddUserToBoardArgs](../src/interfaces/user.ts) | False    |
| fields | [UserField[]](../src/interfaces/user.ts)        | False    |

### **addToWorkspace**

| Name   | Type                                                        | Optional |
| ------ | ----------------------------------------------------------- | -------- |
| args   | [AddUserToWorkspaceArgs["id"][]](../src/interfaces/user.ts) | False    |
| fields | [UserField[]](../src/interfaces/user.ts)                    | False    |

### **removeFromWorkspace**

| Name        | Type                                                   | Optional |
| ----------- | ------------------------------------------------------ | -------- |
| userIds     | [UserField["id"][]](../src/interfaces/user.ts)         | False    |
| workspaceId | [WorkspaceField["id"]](../src/interfaces/workspace.ts) | False    |
| fields      | [UserField[]](../src/interfaces/user.ts)               | False    |
