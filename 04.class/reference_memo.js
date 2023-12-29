import Command from "./command.js";

class ReferenceMemo extends Command {
  constructor() {
    super();
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (memos.length === 0) {
      console.log("There are no memos.");
      return;
    }

    const answer = await this.question("see", memos);
    const chosen_memo = memos.find((memo) => memo.title === answer.memo_title);
    console.log(chosen_memo.fullText());
  }
}

export default ReferenceMemo;
