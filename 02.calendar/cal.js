import minimist from "minimist";
import { DateTime } from "luxon";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y || today.getFullYear();
const month = argv.m || today.getMonth() + 1;

console.log("      " + month + "月 " + year + "        ");
console.log("日 月 火 水 木 金 土");

const dt = DateTime.local(year, month);
const firstDt = dt.startOf("month");
const lastDt = dt.endOf("month");

process.stdout.write("   ".repeat(firstDt.weekday % 7));

for (
  let current = firstDt;
  current <= lastDt;
  current = current.plus({ days: 1 })
) {
  process.stdout.write(current.day.toString().padStart(2));

  if (current.weekday === 6 || current.toISODate() === lastDt.toISODate()) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
