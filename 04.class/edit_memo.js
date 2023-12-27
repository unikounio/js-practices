//
import Command from "./command.js";
import db_operator from "./db_operator.js";

class EditMemo extends Command {
  constructor() {
    super();
  }

  async execute() {
    const memos = await this.fetchMemos();
  }
}

export default EditMemo;
