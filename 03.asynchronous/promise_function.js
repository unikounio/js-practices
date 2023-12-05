import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(":memory:");

export const runPromise = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export const getPromise = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, book) {
      if (err) reject(err);
      else resolve(book);
    });
  });
};
