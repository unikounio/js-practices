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
    const answer = await this.question("delete", memos);
    await db_operator.run(
      "DELETE FROM memos WHERE title = ?",
      answer.memo_title
    );
  }
}

export default DeleteMemo;
