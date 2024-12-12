const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const input2 = await Deno.readTextFile("./input.txt");
let cleaned = input2.split("\n");
let [ROW, COL] = find_guard(cleaned);

const temp = cleaned[ROW].split("");
temp[COL] = ".";
cleaned[ROW] = temp.join("");

const positions = new Set();

function find_guard(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "^") {
        return [i, j];
      }
    }
  }
}

function move_guard(list, direction) {
  if (
    ROW + 1 >= list.length ||
    ROW - 1 < 0 ||
    COL + 1 >= list[ROW].length ||
    COL - 1 < 0
  ) {
    return;
  }
  if (direction === "up") {
    if (list[ROW - 1][COL] === ".") {
      positions.add(`${ROW}-${COL}`);
      ROW--;
      move_guard(list, "up");
    } else {
      move_guard(list, "right");
    }
  } else if (direction === "right") {
    if (list[ROW][COL + 1] === ".") {
      positions.add(`${ROW}-${COL}`);
      COL++;
      move_guard(list, "right");
    } else {
      move_guard(list, "down");
    }
  } else if (direction === "down") {
    if (list[ROW + 1][COL] === ".") {
      positions.add(`${ROW}-${COL}`);
      ROW++;
      move_guard(list, "down");
    } else {
      move_guard(list, "left");
    }
  } else if (direction === "left") {
    if (list[ROW][COL - 1] === ".") {
      positions.add(`${ROW}-${COL}`);
      COL--;
      move_guard(list, "left");
    } else {
      move_guard(list, "up");
    }
  }
}

move_guard(cleaned, "up");
console.log(positions.size + 1);
