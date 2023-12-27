//選んだメモが削除される。
import Enquirer from "enquirer";
import Command from "./command.js";
import db_operator from "./db_operator.js";

class DeleteMemo extends Command {
  constructor() {
    super();
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (memos.length === 0) {
      console.log("There are no memos.");
      return;
    }

    const question = {
      type: "select",
      name: "memo_title",
      message: "Choose a note you want to delete:",
      choices: memos.map((memo) => memo.title),
    };
    const answer = await Enquirer.prompt(question);
    await db_operator.run(
      "DELETE FROM memos WHERE title = ?",
      answer.memo_title
    );
  }
}

export default DeleteMemo;
