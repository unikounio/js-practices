import minimist from "minimist";
import AddMemo from "./commands/add_memo.js";
import ListMemo from "./commands/list_memo.js";
import ReferenceMemo from "./commands/reference_memo.js";
import DeleteMemo from "./commands/delete_memo.js";
import MemoDbRepository from "./repositries/memo_db_repository.js";

export default class MemoApp {
  constructor() {
    this.option = minimist(process.argv.slice(2));
    this.repository = new MemoDbRepository();
  }

  async run() {
    const command = this.#createCommand();
    await command.execute();
    await this.repository.close();
  }

  #createCommand() {
    if (this.option.l) {
      return new ListMemo(this.repository);
    } else if (this.option.r) {
      return new ReferenceMemo(this.repository);
    } else if (this.option.d) {
      return new DeleteMemo(this.repository);
    } else {
      return new AddMemo(this.repository);
    }
  }
}
