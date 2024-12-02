const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const input2 = await Deno.readTextFile("./input.txt");
const cleanded = input2
  .split("\n")
  .map((row) => row.split(" ").map((number) => Number(number)));

const ATLEST = 1;
const ATMOST = 3;

let safe = 0;
for (const row of cleanded) {
  if (is_safe(row)) {
    safe++;
  }
}

function is_safe(row) {
  const sign = row[0] - row[row.length - 1] > 0 ? 1 : -1;
  let isSafe = true;
  for (let i = 1; i < row.length; i++) {
    const prev = row[i - 1];
    const curr = row[i];
    if (!is_fullfilling_condetion(prev, curr, sign)) {
      const copy = [...row.slice(0, i), ...row.slice(i + 1)];
      const copy2 = [...row.slice(0, i - 1), ...row.slice(i)];
      if (!is_really_safe(copy, sign) && !is_really_safe(copy2, sign)) {
        isSafe = false;
        break;
      }
    }
  }

  return isSafe;
}

function is_really_safe(row, sign) {
  let isReallySafe = true;
  for (let i = 1; i < row.length; i++) {
    const prev = row[i - 1];
    const curr = row[i];
    if (!is_fullfilling_condetion(prev, curr, sign)) {
      isReallySafe = false;
      break;
    }
  }

  return isReallySafe;
}

function is_fullfilling_condetion(prev, curr, sign) {
  if (
    Math.abs(prev - curr) >= ATLEST &&
    Math.abs(prev - curr) <= ATMOST &&
    (prev - curr) * sign > 0
  ) {
    return true;
  }
  return false;
}

console.log(safe);
