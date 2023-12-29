import minimist from "minimist";
import AddMemo from "./commands/add_memo.js";
import ListMemo from "./commands/list_memo.js";
import ReferenceMemo from "./commands/reference_memo.js";
import DeleteMemo from "./commands/delete_memo.js";
import DbOperator from "./db_operator.js";

class MemoApp {
  constructor() {
    this.option = minimist(process.argv.slice(2));
  }

  async run() {
    await this.#createMemosTable();
    const command = this.#createCommand();
    await command.execute();
    await DbOperator.close();
  }

  #createMemosTable() {
    return DbOperator.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT)"
    );
  }

  #createCommand() {
    if (this.option.l) {
      return new ListMemo();
    } else if (this.option.r) {
      return new ReferenceMemo();
    } else if (this.option.d) {
      return new DeleteMemo();
    } else {
      return new AddMemo();
    }
  }
}

export default MemoApp;
