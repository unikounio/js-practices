import readline from "readline";
import Command from "./command.js";
import DbOperator from "./db_operator.js";

class AddMemo extends Command {
  constructor() {
    super();
    this.inputReader = readline.createInterface({
      input: process.stdin,
    });
  }

  async execute() {
    let lines = [];
    //TODO:プライベートメソッドとして分けたら読みやすくなるかも
    for await (const line of this.inputReader) {
      lines.push(line);
    }
    try {
      await DbOperator.run(
        "INSERT INTO memos (title, content) VALUES ($title, $content)",
        { $title: lines[0], $content: lines.slice(1).join("\n") }
      );
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
        if (lines[0] === undefined) {
          console.error("Input for the first line must be required.");
        } else {
          console.error(
            "A memo with the same title already exists. Please use a different title."
          );
        }
      } else {
        throw error;
      }
    }
  }
}

export default AddMemo;
