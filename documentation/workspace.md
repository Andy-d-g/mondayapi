# Workspace

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const workspaceId = 67484;
api.workspace.getWorkspace(workspaceId, ["id"]);
```

## API

Defined in [/src/api/workspace.ts](../src/api/workspace.ts)

### **getWorkspace**

| Name        | Type                                               | Optional |
| ----------- | -------------------------------------------------- | -------- |
| workspaceId | Number                                             | False    |
| fields      | [WorkspaceField[]](../src/interfaces/workspace.ts) | False    |
