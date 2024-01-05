import Enquirer from "enquirer";
import Memo from "../memo.js";

export default class Command {
  constructor(db) {
    this.db = db;
  }

  execute() {}

  async runSql(sql, params = []) {
    return this.db.run(sql, params);
  }

  async fetchMemos() {
    const raw_memos = await this.db.all("SELECT * FROM memos");
    return raw_memos.map((memo) => new Memo(memo.id, memo.title, memo.content));
  }

  checkMemosEmpty(memos) {
    if (memos.length === 0) {
      console.log("There are no memos.");
      return true;
    }
    return false;
  }

  async question(command, memos) {
    const question = {
      type: "select",
      name: "memo_title",
      message: `Choose a note you want to ${command}:`,
      choices: memos.map((memo) => memo.title),
    };
    return await Enquirer.prompt(question);
  }
}
