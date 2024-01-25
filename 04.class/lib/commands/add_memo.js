import readline from "readline";
import Command from "./command.js";

export default class AddMemo extends Command {
  constructor(repository) {
    super(repository);
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
      await this.repository.create(lines[0], lines.slice(1).join("\n"));
    } catch (error) {
      if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
        this.#handleConstraintError(lines[0]);
      } else {
        throw error;
      }
    }
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
