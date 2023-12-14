import { db, runPromise, getPromise } from "./promise_function.js";

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => runPromise(db, "INSERT INTO books(title) VALUES(?)", null))
  .catch((err) => console.error(err.message))
  .then(() => getPromise(db, "SELECT name FROM books"))
  .catch((err) => console.error(err.message))
  .then(() => runPromise(db, "DROP TABLE books"))
  .then(() => db.close());
