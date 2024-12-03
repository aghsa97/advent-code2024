const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const input2 = await Deno.readTextFile("./input.txt");

const regex = /(?:mul\((\d+),(\d+)\))|(do\(\)|don't\(\))/g;
const matches = [...input2.matchAll(regex)].map((match) => [
  match[3] ? "" : parseInt(match[1]),
  match[3] ? "" : parseInt(match[2]),
  match[3] ? match[3] : "",
]);

function calc_mul(list) {
  let result = 0;
  let _do = true;
  for (const arr of list) {
    if (arr[2] === "don't()") {
      _do = false;
    } else if (arr[2] === "do()") {
      _do = true;
    }
    if (_do) {
      result += arr[0] * arr[1];
    }
  }

  return result;
}

console.log(calc_mul(matches));
