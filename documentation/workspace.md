# Workspace

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const workspaceId = 67484;
api.workspace.get(workspaceId, ["id"]);
```

## API

Defined in [/src/api/workspace.ts](../src/api/workspace.ts)

### **create**

| Name        | Type                                                  | Optional |
| ----------- | ----------------------------------------------------- | -------- |
| workspaceId | [CreateWorkspaceArgs](../src/interfaces/workspace.ts) | False    |
| fields      | [WorkspaceField[]](../src/interfaces/workspace.ts)    | False    |

### **get**

| Name        | Type                                               | Optional |
| ----------- | -------------------------------------------------- | -------- |
| workspaceId | Number                                             | False    |
| fields      | [WorkspaceField[]](../src/interfaces/workspace.ts) | False    |

### **remove**

| Name        | Type                                               | Optional |
| ----------- | -------------------------------------------------- | -------- |
| workspaceId | Number                                             | False    |
| fields      | [WorkspaceField[]](../src/interfaces/workspace.ts) | False    |
