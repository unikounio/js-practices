import minimist from "minimist";
import AddMemo from "./commands/add_memo.js";
import ListMemo from "./commands/list_memo.js";
import ReferenceMemo from "./commands/reference_memo.js";
import DeleteMemo from "./commands/delete_memo.js";
import DbOperator from "./db_operator.js";

export default class MemoApp {
  constructor() {
    this.option = minimist(process.argv.slice(2));
    this.db = new DbOperator();
  }

  async run() {
    await this.#createMemosTable();
    const command = this.#createCommand();
    await command.execute();
    await this.db.close();
  }

  #createMemosTable() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT)"
    );
  }

  #createCommand() {
    if (this.option.l) {
      return new ListMemo(this.db);
    } else if (this.option.r) {
      return new ReferenceMemo(this.db);
    } else if (this.option.d) {
      return new DeleteMemo(this.db);
    } else {
      return new AddMemo(this.db);
    }
  }
}
