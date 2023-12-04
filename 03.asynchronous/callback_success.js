import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run(
      "INSERT INTO books(title) VALUES(?)",
      "JSふりがなプログラミング",
      function () {
        console.log(this.lastID);
        db.get("select * from books", function (err, row) {
          console.log(`id: ${row.id}, title: ${row.title}`);
          db.run("drop table books");
          db.close();
        });
      }
    );
  }
);
