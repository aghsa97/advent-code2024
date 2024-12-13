const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const input2 = await Deno.readTextFile("./input.txt");
const cleaned = input2.split("\n");

function extract_frequency(list) {
  const nodes = new Map();
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      const symbol = list[i][j];
      if (symbol !== ".") {
        nodes.set(`${i}-${j}`, symbol);
      }
    }
  }

  return Array.from(nodes);
}

function count_antinodes(list) {
  const nodes = extract_frequency(list);
  const antinodes = new Set();
  for (let i = 0; i < nodes.length; i++) {
    const curr = nodes[i][1];
    const [curr_row, curr_col] = nodes[i][0].split("-");
    for (let j = i + 1; j < nodes.length; j++) {
      if (curr === nodes[j][1]) {
        const [row, col] = nodes[j][0].split("-");
        const diff_row = parseInt(curr_row) - parseInt(row);
        const diff_col = parseInt(curr_col) - parseInt(col);
        const r_t = parseInt(curr_row) + diff_row;
        const c_t = parseInt(curr_col) + diff_col;
        const r_b = parseInt(curr_row) - diff_row * 2;
        const c_b = parseInt(curr_col) - diff_col * 2;

        if (list[r_t]?.[c_t] !== undefined) {
          antinodes.add(`${r_t}-${c_t}`);
        }
        if (list[r_b]?.[c_b] !== undefined) {
          antinodes.add(`${r_b}-${c_b}`);
        }
      }
    }
  }

  return antinodes.size;
}

console.log(count_antinodes(cleaned));
