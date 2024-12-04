const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const input2 = await Deno.readTextFile("./input.txt");
const cleanded = input2.split("\n");
const X = "X";
const M = "M";
const A = "A";
const S = "S";

function xmas_horizontal(list) {
  let count = 0;
  for (const line of list) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === X) {
        if (line[i + 1] === M && line[i + 2] === A && line[i + 3] === S) {
          count++;
        }
        if (line[i - 1] === M && line[i - 2] === A && line[i - 3] === S) {
          count++;
        }
      }
    }
  }

  return count;
}

function xmas_vertical(list) {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j][i] === X) {
        if (
          list[j + 3] &&
          list[j + 1][i] === M &&
          list[j + 2][i] === A &&
          list[j + 3][i] === S
        ) {
          count++;
        }
        if (
          list[j - 3] &&
          list[j - 1][i] === M &&
          list[j - 2][i] === A &&
          list[j - 3][i] === S
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

function xmas_diagonal(list) {
  let count = 0;
  for (let line = 0; line < list.length; line++) {
    for (let char = 0; char < list[line].length; char++) {
      if (list[line][char] === X) {
        if (
          list[line + 3] &&
          list[line + 3][char + 3] &&
          list[line + 1][char + 1] === M &&
          list[line + 2][char + 2] === A &&
          list[line + 3][char + 3] === S
        ) {
          count++;
        }
        if (
          list[line + 3] &&
          list[line + 3][char - 3] &&
          list[line + 1][char - 1] === M &&
          list[line + 2][char - 2] === A &&
          list[line + 3][char - 3] === S
        ) {
          count++;
        }
        if (
          list[line - 3] &&
          list[line - 3][char + 3] &&
          list[line - 1][char + 1] === M &&
          list[line - 2][char + 2] === A &&
          list[line - 3][char + 3] === S
        ) {
          count++;
        }
        if (
          list[line - 3] &&
          list[line - 3][char - 3] &&
          list[line - 1][char - 1] === M &&
          list[line - 2][char - 2] === A &&
          list[line - 3][char - 3] === S
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

console.log(
  xmas_horizontal(cleanded) + xmas_vertical(cleanded) + xmas_diagonal(cleanded)
);
