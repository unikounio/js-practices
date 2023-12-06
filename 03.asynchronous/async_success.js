import { db, runPromise, getPromise } from "./promise_function.js";

async function asyncSuccess() {
  await runPromise(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  const insertedBook = await runPromise(
    "INSERT INTO books(title) VALUES(?)",
    "JSふりがなプログラミング"
  );
  console.log(insertedBook.lastID);
  const selectedBook = await getPromise("SELECT * FROM books");
  console.log(`id: ${selectedBook.id}, title: ${selectedBook.title}`);
  await runPromise("DROP TABLE books");
  db.close();
}

asyncSuccess();
