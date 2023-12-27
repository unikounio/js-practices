import sqlite3 from "sqlite3";

class DbOperator {
  constructor() {
    this.db = new sqlite3.Database("./memos.db");
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) =>
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      })
    );
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) =>
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    );
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) =>
      this.db.all(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    );
  }

  close() {
    return new Promise((resolve, reject) =>
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );
  }
}

export default new DbOperator();
