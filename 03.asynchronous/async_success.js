import {
  db,
  runPromise,
  getPromise,
  closePromise,
} from "./sqlite_promisification.js";

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
