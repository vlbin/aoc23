export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split("").filter((x) => "1234567890".includes(x)))
    .map((line) => [line[0], line[line.length - 1]])
    .map((x) => x.join(""))
    .map(Number)
    .reduce((p, c) => p + c, 0);
};

const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as Record<string, number>;

const replaceNumber = (num: string) => {
  let newNum = "";
  for (let i = 0; i < num.length; i++) {
    for (let k = 0; k < num.length; k++) {
      if ("123456789".includes(num.slice(i, k + 1))) {
        newNum += num.slice(i, k + 1);
      }
      if (map[num.slice(i, k + 1)]) {
        newNum += map[num.slice(i, k + 1)];
      }
    }
  }
  return newNum;
};

export const part2 = (data: string) => {
  return data
    .split("\n")
    .map(replaceNumber)
    .map((line) => line.split("").filter((x) => "1234567890".includes(x)))
    .map((line) => [line[0], line[line.length - 1]])
    .map((x) => x.join(""))
    .map(Number)
    .reduce((p, c) => p + c, 0);
};
