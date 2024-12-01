const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

const input2 = await Deno.readTextFile("./input.txt");
const cleaned = input2.split("\n").map((row) => row.split("  "));
const left = [];
const right = [];
let total_distance = 0;

for (const row of cleaned) {
  left.push(Number(row[0]));
  right.push(Number(row[1]));
}

left.sort();
right.sort();

for (let i = 0; i < cleaned.length; i++) {
  const curr_distance = Math.abs(left[i] - right[i]);
  total_distance += curr_distance;
}

console.log(total_distance);
