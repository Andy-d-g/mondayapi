# Monday API helper

This library allow to make common request to the monday api with NodeJS

There is probably some bugs in it for the moment.

Feel free to [help me](#contribute)

## Installation

```sh
# npm
$ npm install mondayapi

# yarn
$ yarn install mondayapi
```

## Requirement

You need to have a developper [monday api key](https://support.monday.com/hc/en-us/articles/360005144659-Does-monday-com-have-an-API-)

## Usage

```typescript
import Api from "mondayapi";

const api = new Api("MONDAY API KEY");

const boardId = 123;
const groupId = 456;
const items = await api.item.listItemsByGroup(boardId, groupId, ["id", "name"]);
// ⚠️ (Board | Item) id needs to be cast : Number(id)
```

## Documentation

We provide for the moment 1 level of depth (items.items).
It can be increase if you customize the library.
Contact me if you think that it's important to let you the ability to customize it.

The official monday api documentation : https://developer.monday.com/api-reference/docs

- [Workspace API](./documentation/workspace.md)
- [Item API](./documentation/item.md)
- [Sub item API](./documentation/subItem.md)
- [Group API](./documentation/group.md)
- [Column API](./documentation/column.md)
- [Board API](./documentation/board.md)

## Contribute

[join me on Github](https://github.com/Andy-d-g/mondayapi)
