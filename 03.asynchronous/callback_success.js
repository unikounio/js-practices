import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books(title) VALUES(?)",
      "JSふりがなプログラミング",
      function () {
        console.log(`id: ${this.lastID}`);
        db.get("SELECT * FROM books", (_, book) => {
          console.log(`id: ${book.id}, title: ${book.title}`);
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      }
    );
  }
);
