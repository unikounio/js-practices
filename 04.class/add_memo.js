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
    for await (const line of this.inputReader) {
      lines.push(line);
    }
    try {
      await this.#insertMemoToDb(lines);
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
        this.#handleConstraintError(lines[0]);
      } else {
        throw error;
      }
    }
  }

  #insertMemoToDb(lines) {
    return DbOperator.run(
      "INSERT INTO memos (title, content) VALUES ($title, $content)",
      { $title: lines[0], $content: lines.slice(1).join("\n") }
    );
  }

  #handleConstraintError(memo_title) {
    if (memo_title === undefined) {
      console.error("Input for the first line must be required.");
    } else {
      console.error(
        "A memo with the same title already exists. Please use a different title."
      );
    }
  }
}

export default AddMemo;
