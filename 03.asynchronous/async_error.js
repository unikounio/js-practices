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
try {
  await runPromise(db, "INSERT INTO books(title) VALUES(?)", null);
} catch (err) {
  if (err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await getPromise(db, "SELECT name FROM books");
} catch (err) {
  if (err.message.includes("no such column")) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runPromise(db, "DROP TABLE books");
await closePromise(db);
