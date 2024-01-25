import MemoRepository from "./memo_repository.js";
import DbOperator from "../db_operator.js";

export default class MemoDbRepository extends MemoRepository {
  constructor() {
    super();
    this.db = new DbOperator();
    this.db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT UNIQUE NOT NULL, content TEXT)"
    );
  }

  async create(title, content) {
    return this.db.run(
      "INSERT INTO memos (title, content) VALUES ($title, $content)",
      { $title: title, $content: content }
    );
  }

  async getAll() {
    return this.db.all("SELECT * FROM memos");
  }

  async getByTitle(title) {
    return this.db.get("SELECT * FROM memos WHERE title = ?", [title]);
  }

  async deleteByTitle(title) {
    return this.db.run("DELETE FROM memos WHERE title = ?", [title]);
  }

  async close() {
    return this.db.close();
  }
}
