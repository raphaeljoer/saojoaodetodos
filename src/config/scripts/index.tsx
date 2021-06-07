import { TagManager } from "./google/tagmanager";

export namespace Scripts {
  export namespace Google {
    export const tagmanager = {
      header: TagManager.header(),
      body: TagManager.body(),
    }
  }
}