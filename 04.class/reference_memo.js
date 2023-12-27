import Enquirer from "enquirer";
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

    const question = {
      type: "select",
      name: "memo_title",
      message: "Choose a note you want to delete:",
      choices: memos.map((memo) => memo.title),
    };
    const answer = await Enquirer.prompt(question);
    const chosen_memo = memos.find((memo) => memo.title === answer.memo_title);
    console.log(chosen_memo.fullText());
  }
}

export default ReferenceMemo;
