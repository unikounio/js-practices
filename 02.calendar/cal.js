import minimist from "minimist";
import { DateTime } from "luxon";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = Number(argv.y) || today.getFullYear();
const month = Number(argv.m) || today.getMonth() + 1;

if (!Number.isInteger(year)) {
  console.error(`cal: not a valid year ${year}`);
  process.exit(1);
} else if (year < 1 || year > 9999) {
  console.error(`cal: year \`${year}' not in range 1..9999`);
  process.exit(1);
}

if (!Number.isInteger(month) || month < 1 || month > 12) {
  console.error(`cal: ${month} is neither a month number (1..12) nor a name`);
  process.exit(1);
}

console.log(`      ${month}月 ${year}        `);
console.log("日 月 火 水 木 金 土");

const firstDateOfMonth = DateTime.local(year, month, 1);
const lastDateOfMonth = firstDateOfMonth.endOf("month");

process.stdout.write("   ".repeat(firstDateOfMonth.weekday % 7));

for (
  let currentDate = firstDateOfMonth;
  currentDate <= lastDateOfMonth;
  currentDate = currentDate.plus({ days: 1 })
) {
  process.stdout.write(currentDate.day.toString().padStart(2));

  if (
    currentDate.weekday === 6 ||
    currentDate.hasSame(lastDateOfMonth, "day")
  ) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
