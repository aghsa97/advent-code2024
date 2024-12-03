const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const input2 = await Deno.readTextFile("./input.txt");

const regex = /mul\((\d+),(\d+)\)/g;
const matches = [...input2.matchAll(regex)].map((match) => [
  parseInt(match[1]),
  parseInt(match[2]),
]);

function calc_mul(list) {
  let result = 0;
  for (const arr of list) {
    result += arr[0] * arr[1];
  }

  return result;
}

console.log(calc_mul(matches));
