import readline from "readline";
import Command from "./command.js";
import DbOperator from "./db_operator.js";

class AddMemo extends Command {
  constructor() {
    super();
    this.lines = [];
    //TODO: rlのフィールド名を検討
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async execute() {
    //TODO:プライベートメソッドとして分けたら読みやすくなるかも
    for await (const line of this.rl) {
      this.lines.push(line);
    }

    try {
      await DbOperator.run(
        "INSERT INTO memos (title, content) VALUES ($title, $content)",
        { $title: this.lines[0], $content: this.lines.slice(1).join("\n") }
      );
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
        console.error("Input for the first line must be required.");
      } else {
        throw error;
      }
    }
  }
}

export default AddMemo;
