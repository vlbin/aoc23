const distances = (time: number, record: number) => {
  const root = Math.sqrt(Math.pow(time / 2, 2) - (record + 1));
  const x1 = Math.ceil(time / 2 - root);
  const x2 = Math.floor(time / 2 + root);

  return x2 - x1 + 1;
};

export const part1 = (data: string) => {
  const [times, records] = data
    .split("\n")
    .map((x) => x.split(":")[1])
    .map((x) =>
      x
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length)
        .map(Number)
    );

  return times.reduce((acc, time, i) => {
    return acc * distances(time, records[i]);
  }, 1);
};

export const part2 = (data: string) => {
  const [time, record] = data
    .split("\n")
    .map((x) => x.split(":")[1])
    .map((x) => x.replaceAll(" ", ""))
    .map(Number);

  return distances(time, record);
};
