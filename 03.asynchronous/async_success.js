import { db, runPromise, getPromise } from "./promise_function.js";

const asyncSuccess = async () => {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  const insertedBook = await runPromise(
    db,
    "INSERT INTO books(title) VALUES(?)",
    "JSふりがなプログラミング"
  );
  console.log(`id: ${insertedBook.lastID}`);
  const book = await getPromise(db, "SELECT * FROM books");
  console.log(`id: ${book.id}, title: ${book.title}`);
  await runPromise(db, "DROP TABLE books");
  db.close();
};

asyncSuccess();
