const parseMap = (data: string) =>
  data
    .split("\n\n")[1]
    .split("\n")
    .map((line) =>
      line
        .split("=")
        .map((x) =>
          x.trim().replaceAll("(", "").replaceAll(")", "").split(", ")
        )
    )
    .reduce(
      (obj, [[origin], [L, R]]) => ({
        ...obj,
        [origin]: {
          R,
          L,
        },
      }),
      {} as Record<string, { R: string; L: string }>
    );

export const part1 = (data: string) => {
  const instructions = data.split("\n\n")[0].split("") as Array<"L" | "R">;

  const map = parseMap(data);

  let position = "AAA";
  let index = 0;
  while (position !== "ZZZ") {
    position = map[position][instructions[index % instructions.length]];
    index++;
  }

  return index;
};

const lcmList = ([a, b, ...rest]: number[]): number =>
  rest.length ? lcmList([lcm(a, b), ...rest]) : lcm(a, b);

const lcm = (num1: number, num2: number) => (num1 * num2) / gcd(num1, num2);

const gcd = (num1: number, num2: number): number =>
  num1 % num2 === 0 ? num2 : gcd(num2, num1 % num2);

export const part2 = (data: string) => {
  const instructions = data.split("\n\n")[0].split("") as Array<"L" | "R">;
  const map = parseMap(data);

  const startingNodes = Object.keys(map).filter((key) => key.endsWith("A"));

  const counters = startingNodes.map((aNode, i) => {
    let index = 0;

    let position = startingNodes[i];

    while (position[position.length - 1] !== "Z") {
      position = map[position][instructions[index % instructions.length]];
      index++;
    }
    return index;
  });

  return lcmList(counters);
};
