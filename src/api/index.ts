import GroupApi from "./group";
import ColumnApi from "./column";
import BoardApi from "./board";
import ItemApi from "./item";
import SubItemApi from "./subItem";
import WorkspaceApi from "./workspace";
import config from "../config";
import UserApi from "./user";

class Api {
  constructor(apiKey: string) {
    config.mondayApiKey = apiKey;
  }

  public group = GroupApi;
  public column = ColumnApi;
  public item = ItemApi;
  public subItem = SubItemApi;
  public workspace = WorkspaceApi;
  public board = BoardApi;
  public user = UserApi
}

export default Api;
