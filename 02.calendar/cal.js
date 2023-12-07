import minimist from "minimist";
import { DateTime } from "luxon";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y || today.getFullYear();
const month = argv.m || today.getMonth() + 1;

console.log(`      ${month}月 ${year}        `);
console.log("日 月 火 水 木 金 土");

const selectedMonth = DateTime.local(year, month);
const startOfMonth = selectedMonth.startOf("month");
const endOfMonth = selectedMonth.endOf("month");

process.stdout.write("   ".repeat(startOfMonth.weekday % 7));

for (
  let currentDate = startOfMonth;
  currentDate <= endOfMonth;
  currentDate = currentDate.plus({ days: 1 })
) {
  process.stdout.write(currentDate.day.toString().padStart(2));

  if (
    currentDate.weekday === 6 ||
    currentDate.toISODate() === endOfMonth.toISODate()
  ) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
