import minimist from "minimist";
import { DateTime } from "luxon";

let argv = minimist(process.argv.slice(2));
let today = new Date();
let year = argv.y || today.getFullYear();
let month = argv.m || today.getMonth() + 1;

console.log("      " + month + "月 " + year + "        ");
console.log("日 月 火 水 木 金 土");

const dt = DateTime.local(year, month);
const firstDt = dt.startOf("month");
const lastDt = dt.endOf("month");

process.stdout.write(`${"   ".repeat(firstDt.weekday)}`);

for (
  let current = firstDt;
  current <= lastDt;
  current = current.plus({ days: 1 })
) {
  process.stdout.write(current.day.toString().padStart(2));
  //    土曜日を表示した後に改行を入れる
  if (current.weekday === 6 || current.day === lastDt.day) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
