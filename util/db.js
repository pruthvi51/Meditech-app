import * as SQLite from "expo-sqlite";
import Reminder from "../models/Reminder";

const database = SQLite.openDatabase("reminder.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS reminder(
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                day TEXT NOT NULL,
                hours TEXT NOT NULL,
                min TEXT NOT NULL,
                notId TEXT NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
}

export function getReminders() {
  //   const dispatch = useDispatch();
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM reminder`,
        [],
        (_, res) => {
          const ans = [];
          for (let rem of res.rows._array) {
            ans.push(
              new Reminder(
                rem.name,
                rem.imageUri,
                rem.day,
                rem.hours,
                rem.min,
                rem.notifId
              )
            );
          }
          //   console.log("all rows: ", ans);

          //   dispatch(reminderActions.initRemainders(ans));
          resolve(ans);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function insert(reminder) {
  //   console.log(reminder);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO reminder(name, imageUri, day, hours, min, notId) VALUES(?, ?, ?, ?, ?, ?)`,
        [
          reminder.name,
          reminder.imageUri,
          reminder.day,
          reminder.hours.toString(),
          reminder.min.toString(),
          reminder.notifId.toString(),
        ],
        (_, res) => {
          console.log("insertion : ", res);
        },
        (_, err) => {
          console.log(err);
        }
      );
    });
  });
  return promise;
}

export function deleteOne(name) {
  //   console.log(name);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM reminder WHERE name = '${name}'`,
        [],
        (_, res) => resolve(),
        (_, err) => {
          console.log(err);
          reject();
        }
      );
    });
  });
  return promise;
}

export function deleteAll() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM reminder`,
        [],
        (_, res) => {
          console.log(res), resolve();
        },
        (_, err) => {
          console.log(err);
          reject();
        }
      );
    });
  });
  return promise;
}
