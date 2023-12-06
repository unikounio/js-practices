import { db, runPromise, getPromise } from "./promise_function.js";

async function asyncErrorHandling() {
  try {
    await runPromise(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
    await runPromise("INSERT INTO books(title) VALUES(?)", null);
  } catch (err) {
    console.error(err.message);
  }
  try {
    await getPromise("SELECT name FROM books");
  } catch (err) {
    console.error(err.message);
  } finally {
    await runPromise("DROP TABLE books");
    db.close();
  }
}

asyncErrorHandling();
