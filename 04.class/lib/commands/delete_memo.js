import Command from "./command.js";

export default class DeleteMemo extends Command {
  constructor(db) {
    super(db);
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (this.checkMemosEmpty(memos)) return;
    const answer = await this.question("delete", memos);
    await this.repository.deleteByTitle(answer.memo_title);
  }
}
