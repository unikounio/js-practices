import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () =>
    db.run("INSERT INTO books(title) VALUES(?)", null, (err) => {
      if (err) {
        console.error(err.message);
      }
      db.get("SELECT name FROM books", (err) => {
        if (err) {
          console.error(err.message);
        }
        db.run("DROP TABLE books");
        db.close();
      });
    })
);
