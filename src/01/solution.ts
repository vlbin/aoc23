export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split("").filter((x) => Number.isInteger(Number(x))))
    .reduce(
      (acc, line) =>
        acc + Number(`${line[0] ?? 0}${line[line.length - 1] ?? 0}`),
      0
    );
};

const map = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const replaceNumber = (num: string) => {
  let newNum = "";
  for (let i = 0; i < num.length; i++) {
    for (let k = i; k < num.length; k++) {
      const slice = num.slice(i, k + 1);
      const index = map.indexOf(slice);
      if (Number.isInteger(Number(slice))) {
        newNum += slice;
        break;
      } else if (index > -1) {
        newNum += index + 1;
        break;
      }
    }
  }
  return newNum;
};

export const part2 = (data: string) => {
  return data
    .split("\n")
    .map((line) =>
      replaceNumber(line)
        .split("")
        .filter((x) => Number.isInteger(Number(x)))
    )
    .reduce(
      (acc, line) =>
        acc + Number(`${line[0] ?? 0}${line[line.length - 1] ?? 0}`),
      0
    );
};
