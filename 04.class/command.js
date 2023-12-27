import db_operator from "./db_operator.js";
import Memo from "./memo.js";

class Command {
  constructor() {}

  execute() {}

  async fetchMemos() {
    const raw_memos = await db_operator.all("SELECT * FROM memos");
    return raw_memos.map((memo) => new Memo(memo.id, memo.title, memo.content));
  }
}

export default Command;
