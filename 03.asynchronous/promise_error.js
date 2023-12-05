import { db, runPromise, getPromise } from "./promise_function.js";

runPromise(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => {
    return runPromise("INSERT INTO books(title) VALUES(?)", null);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => {
    return getPromise("SELECT name FROM books");
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => {
    return runPromise("DROP TABLE books");
  })
  .then(() => {
    db.close();
  });
