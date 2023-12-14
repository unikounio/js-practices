import { db, runPromise, getPromise } from "./promise_function.js";

const asyncErrorHandling = async () => {
  try {
    await runPromise(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
    await runPromise(db, "INSERT INTO books(title) VALUES(?)", null);
  } catch (err) {
    console.error(err.message);
  }
  try {
    await getPromise(db, "SELECT name FROM books");
  } catch (err) {
    console.error(err.message);
  } finally {
    await runPromise(db, "DROP TABLE books");
    db.close();
  }
};

asyncErrorHandling();
