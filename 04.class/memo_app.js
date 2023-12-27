import minimist from "minimist";
import AddMemo from "./add_memo.js";
import ListMemo from "./list_memo.js";
import ReferenceMemo from "./reference_memo.js";
import DeleteMemo from "./delete_memo.js";
import EditMemo from "./edit_memo.js";
import DbOperator from "./db_operator.js";

class MemoApp {
  constructor() {
    this.option = minimist(process.argv.slice(2));
  }

  async run() {
    await DbOperator.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title STRING(50) UNIQUE NOT NULL, content STRING(500))"
    );

    let command;

    if (this.option.l) {
      command = new ListMemo();
    } else if (this.option.r) {
      command = new ReferenceMemo();
    } else if (this.option.d) {
      command = new DeleteMemo();
    } else if (this.option.e) {
      command = new EditMemo();
    } else {
      command = new AddMemo();
    }

    if (command) {
      await command.execute();
    } else {
      console.log("Unknown command");
    }

    await DbOperator.close();
  }
}

export default MemoApp;
