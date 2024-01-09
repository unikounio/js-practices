import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", null, (err) => {
      if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
        console.error(err.message);
      } else {
        throw err;
      }
      db.get("SELECT name FROM books", (err) => {
        if (err instanceof Error && err.code === "SQLITE_ERROR") {
          console.error(err.message);
        } else {
          throw err;
        }
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    });
  }
);
