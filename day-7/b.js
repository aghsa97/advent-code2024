const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
const input2 = await Deno.readTextFile("./input.txt");

const cleaned = input2.split("\n");
const operators = ["+", "*", "|"];

function find_true_equations(list) {
  const results = [];
  for (const row of list) {
    const target = Number(row.split(":")[0]);
    const numbers = row.split(":")[1].trim("").split(" ").map(Number);
    const operationsList = checkCombination(numbers);
    for (const operations of operationsList) {
      let res = numbers[0];
      for (let i = 0; i < operations.length; i++) {
        if (operations[i] === "+") {
          res += numbers[i + 1];
        } else if (operations[i] === "*") {
          res *= numbers[i + 1];
        } else {
          res = Number(`${res}${numbers[i + 1]}`);
        }
      }
      if (res === target) {
        results.push(res);
        break;
      }
    }
  }

  return results;
}

function calculate_resutls(list) {
  const results = find_true_equations(list);
  let res = 0;
  for (const result of results) {
    res += result;
  }

  return res;
}

function checkCombination(numbers) {
  let operatorCombination = operators.map((v) => [v]);
  for (let i = 1; i < numbers.length - 1; i++) {
    operatorCombination = operatorCombination.flatMap((comp) =>
      operators.map((v) => [...comp, v])
    );
  }

  return operatorCombination;
}

console.log("res: ", calculate_resutls(cleaned));
