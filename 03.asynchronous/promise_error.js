import { db, runPromise, getPromise } from "./promise_function.js";

runPromise(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => runPromise("INSERT INTO books(title) VALUES(?)", null))
  .catch((err) => console.error(err.message))
  .then(() => getPromise("SELECT name FROM books"))
  .catch((err) => console.error(err.message))
  .then(() => runPromise("DROP TABLE books"))
  .then(() => db.close());
