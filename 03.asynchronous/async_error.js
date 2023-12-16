import {
  db,
  runPromise,
  getPromise,
  closePromise,
} from "./sqlite_promisification.js";

const asyncErrorHandling = async () => {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  try {
    await runPromise(db, "INSERT INTO books(title) VALUES(?)", null);
  } catch (err) {
    console.error(err.message);
  }
  try {
    await getPromise(db, "SELECT name FROM books");
  } catch (err) {
    console.error(err.message);
  }
  await runPromise(db, "DROP TABLE books");
  closePromise(db);
};

asyncErrorHandling();
