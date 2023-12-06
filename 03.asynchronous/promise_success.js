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
  .then((insertedBook) => {
    console.log(insertedBook.lastID);
    return getPromise("SELECT * FROM books");
  })
  .then((selectedBook) => {
    console.log(`id: ${selectedBook.id}, title: ${selectedBook.title}`);
    return runPromise("DROP TABLE books");
  })
  .then(() => {
    db.close();
  });
