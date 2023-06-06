# Monday API helper

This library allow to make common request to the monday api with NodeJS

## Before use ⚠️

Warning : returns Id(s) are typed as number but are in reality strings

Why ? Because API expect number, but return string. So the API of the library match with the expect value of the monday API

Also, we provide only 1 level of depth (items.items). It can be increase if you customize the library

There is some bugs in it for the moment.

## Documentation

The official monday api documentation : https://developer.monday.com/api-reference/docs

## How to install

```sh
# npm
$ npm install monday-api

# yarn
$ yarn install monday-api
```

## How to use

You need to have a developper monday api key

```typescript
import Api from "mondayapi";

const api = new Api("MONDAY API KEY");

const boardId = 123;
const groupId = 456;
const items = await api.item.listItemsByGroup(
    boardId, 
    groupId, 
    ["id","name"]
);
// items[0].id is string same if the type says number
// You need to cast it into number
// Number(items[0].id)
```



