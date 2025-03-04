import Command from "./command.js";

export default class ListMemo extends Command {
  constructor(repository) {
    super(repository);
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (this.checkMemosEmpty(memos)) return;
    for (const memo of memos) {
      console.log(memo.title);
    }
  }
}
