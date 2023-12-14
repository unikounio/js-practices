import {
  db,
  runPromise,
  getPromise,
  closePromise,
} from "./promise_function.js";

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runPromise(
      db,
      "INSERT INTO books(title) VALUES(?)",
      "JSふりがなプログラミング"
    )
  )
  .then((row) => {
    console.log(`id: ${row.lastID}`);
    return getPromise(db, "SELECT * FROM books");
  })
  .then((book) => {
    console.log(`id: ${book.id}, title: ${book.title}`);
    return runPromise(db, "DROP TABLE books");
  })
  .then(() => closePromise(db));
