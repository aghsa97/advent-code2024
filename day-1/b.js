const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

const input2 = await Deno.readTextFile("./input.txt");
const cleaned = input2.split("\n").map((row) => row.split("  "));
const left = [];
const right = {};
let similarity = 0;

for (const row of cleaned) {
  const value = Number(row[0]);
  const key = Number(row[1]);

  if (!right[key]) {
    right[key] = [];
  }

  right[key].push(1);
  left.push(value);
}

for (const number of left) {
  if (right[number]) {
    similarity += number * right[number].length;
  }
}

console.log(similarity);
