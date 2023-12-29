import Enquirer from "enquirer";
import db_operator from "./db_operator.js";
import Memo from "./memo.js";

class Command {
  constructor() {}

  execute() {}

  async fetchMemos() {
    const raw_memos = await db_operator.all("SELECT * FROM memos");
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

export default Command;
