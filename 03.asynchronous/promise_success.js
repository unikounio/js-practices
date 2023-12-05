import { db, runPromise, getPromise } from "./promise_function.js";

runPromise(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => {
    return runPromise(
      "INSERT INTO books(title) VALUES(?)",
      "JSふりがなプログラミング"
    );
  })
  .then((book) => {
    console.log(book.lastID);
    return getPromise("SELECT * FROM books");
  })
  .then((book) => {
    console.log(`id: ${book.id}, title: ${book.title}`);
    return runPromise("DROP TABLE books");
  })
  .then(() => {
    db.close();
  });
