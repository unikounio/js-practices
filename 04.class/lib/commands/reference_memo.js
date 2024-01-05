import Command from "./command.js";

export default class ReferenceMemo extends Command {
  constructor(db) {
    super(db);
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (this.checkMemosEmpty(memos)) return;
    const answer = await this.question("see", memos);
    const chosen_memo = memos.find((memo) => memo.title === answer.memo_title);
    console.log(chosen_memo.fullText());
  }
}
