import Command from "./command.js";

class ListMemo extends Command {
  constructor() {
    super();
  }

  async execute() {
    const memos = await this.fetchMemos();
    if (memos.length === 0) {
      console.log("There are no memos.");
      return;
    }
    for (const memo of memos) {
      console.log(memo.title);
    }
  }
}

export default ListMemo;
