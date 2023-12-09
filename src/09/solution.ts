const diff = ([a, b, ...rest]: number[]): number[] =>
  rest.length ? [b - a, ...diff([b, ...rest])] : [b - a];

const explore = (line: number[], tree: number[][] = []): number[][] => {
  if (line.every((num) => num === 0)) return tree;
  const l = diff(line);
  tree.push(l);
  return explore(l, tree);
};

export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .map((line) => explore(line, [line]))
    .map((history) => {
      history.reverse().forEach((line, i, lines) => {
        if (i === 0) {
          line.push(0);
        } else {
          line.push(
            line[line.length - 1] + lines[i - 1][lines[i - 1].length - 1]
          );
        }
      });

      return history;
    })
    .reduce((acc, history) => {
      acc +=
        history[history.length - 1][history[history.length - 1].length - 1];
      return acc;
    }, 0);
};

export const part2 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split(" ").map(Number))
    .map((line) => explore(line, [line]))
    .map((history) => {
      history.reverse().forEach((line, i, lines) => {
        if (i === 0) {
          line.unshift(0);
        } else {
          line.unshift(line[0] - lines[i - 1][0]);
        }
      });

      return history;
    })
    .reduce((acc, history) => {
      acc += history[history.length - 1][0];
      return acc;
    }, 0);
};
