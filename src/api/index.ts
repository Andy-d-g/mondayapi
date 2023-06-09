import GroupApi from "./group";
import ColumnApi from "./column";
import BoardApi from "./board";
import ItemApi from "./item";
import SubItemApi from "./subItem";
import WorkspaceApi from "./workspace";
import config from "../config";

interface ApiOptions {
  log?: boolean;
}

class Api {
  constructor(apiKey: string, options: ApiOptions = {}) {
    config.mondayApiKey = apiKey;
    config.log = options.log || false;
  }

  public group = GroupApi;
  public column = ColumnApi;
  public item = ItemApi;
  public subItem = SubItemApi;
  public workspace = WorkspaceApi;
  public board = BoardApi;
}

export default Api;
