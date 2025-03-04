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
try {
  await runPromise(db, "INSERT INTO books(title) VALUES(?)", null);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await getPromise(db, "SELECT name FROM books");
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runPromise(db, "DROP TABLE books");
await closePromise(db);
