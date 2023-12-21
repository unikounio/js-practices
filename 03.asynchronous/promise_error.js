import {
  runPromise,
  getPromise,
  closePromise,
} from "./asynchronous_db_operations.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => runPromise(db, "INSERT INTO books(title) VALUES(?)", null))
  .catch((err) => {
    if (err.message.includes("NOT NULL constraint failed")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => getPromise(db, "SELECT name FROM books"))
  .catch((err) => {
    if (err.message.includes("no such column")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => runPromise(db, "DROP TABLE books"))
  .then(() => closePromise(db));
