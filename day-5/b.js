const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
const input2 = await Deno.readTextFile("./input.txt");

const rules = input2.split("\n").filter((v) => v.includes("|"));
const updates = input2.split("\n").filter((v) => v.includes(","));

function get_updates_order(update) {
  const pages = update.split(",");
  const curr_rules = [];
  for (let i = 0; i < pages.length - 1; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const rule = pages[i] + "|" + pages[j];
      curr_rules.push(rule);
    }
  }
  return curr_rules;
}

function is_right_order(rules, update) {
  const curr_rules = get_updates_order(update);
  let matches = true;
  for (const curr_rule of curr_rules) {
    if (!rules.includes(curr_rule)) {
      matches = false;
    }
  }
  return matches;
}

function reorder(rules, update) {
  const pages = update.split(",");
  const new_update = [];

  for (const page of pages) {
    if (new_update.length === 0) {
      new_update.push(page);
      continue;
    }
    const page_rules = rules
      .filter((v) => v.startsWith(page))
      .map((v) => v.split("|")[1]);

    for (let i = new_update.length - 1; i >= 0; i--) {
      if (page_rules.includes(new_update[i])) {
        new_update[i + 1] = new_update[i];
        new_update[i] = page;
      } else if (!new_update.includes(page)) {
        new_update.push(page);
        break;
      }
    }
  }

  return new_update.join(",");
}

function get_middle_page_number(update) {
  const pages = update.split(",").map(Number);
  const number = pages[Math.floor(pages.length / 2)];

  return number;
}

function check_updates_order(rules, updates) {
  let middle_sum = 0;
  for (const update of updates) {
    if (!is_right_order(rules, update)) {
      const reorderd = reorder(rules, update);
      middle_sum += get_middle_page_number(reorderd);
    }
  }

  return middle_sum;
}

console.log(check_updates_order(rules, updates));
