import sqlite3 from "sqlite3";

export default class DbOperator {
  constructor() {
    this.dbConnection = new sqlite3.Database("./memos.db");
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) =>
      this.dbConnection.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      })
    );
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) =>
      this.dbConnection.all(sql, params, (err, row) => {
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
      this.dbConnection.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );
  }
}
