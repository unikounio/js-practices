import {
  runPromise,
  getPromise,
  closePromise,
} from "./asynchronous_db_operations.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
);
const result = await runPromise(
  db,
  "INSERT INTO books(title) VALUES(?)",
  "JSふりがなプログラミング"
);
console.log(`id: ${result.lastID}`);
const book = await getPromise(db, "SELECT * FROM books");
console.log(`id: ${book.id}, title: ${book.title}`);
await runPromise(db, "DROP TABLE books");
await closePromise(db);
