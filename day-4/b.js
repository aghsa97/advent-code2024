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
const A = "A";
const MAS = "MAS";
const SAM = "SAM";

function count_x_mas(list) {
  let count = 0;
  for (let line = 0; line < list.length; line++) {
    for (let char = 0; char < list[line].length; char++) {
      let to_check_left_up = "";
      let to_check_right_down = "";
      if (list[line][char] === A) {
        if (
          list[line - 1] &&
          list[line + 1] &&
          list[line][char + 1] &&
          list[line][char - 1]
        ) {
          to_check_left_up =
            list[line - 1][char - 1] + A + list[line + 1][char + 1];
          to_check_right_down =
            list[line - 1][char + 1] + A + list[line + 1][char - 1];
          if (
            (to_check_left_up === MAS || to_check_left_up === SAM) &&
            (to_check_right_down === MAS || to_check_right_down === SAM)
          ) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

console.log(count_x_mas(cleanded));
