# SubItem

## Usage

```typescript
import Api from "mondayapi";
const api = new Api("MONDAY API KEY");
const itemId = 67484;
api.subItem.listByItem(itemId, ["id"]);
```

## API

Defined in [/src/api/item.ts](../src/api/item.ts)

### **create**

| Name   | Type                                           | Optional |
| ------ | ---------------------------------------------- | -------- |
| args   | [CreateSubItemArgs](../src/interfaces/item.ts) | False    |
| fields | [ItemField[]](../src/interfaces/item.ts)       | False    |
| values | Record<string, string \| number>               | False    |

### **listByItem**

| Name   | Type                                     | Optional |
| ------ | ---------------------------------------- | -------- |
| itemId | Number                                   | False    |
| fields | [ItemField[]](../src/interfaces/item.ts) | False    |
