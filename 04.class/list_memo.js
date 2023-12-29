import Command from "./command.js";

class ListMemo extends Command {
  constructor() {
    super();
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (this.checkMemosEmpty(memos)) return;
    for (const memo of memos) {
      console.log(memo.title);
    }
  }
}

export default ListMemo;
