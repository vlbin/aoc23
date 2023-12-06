const distance = (hold: number, time: number) => {
  return hold * (time - hold);
};

const distances = (time: number, record: number) => {
  return Array.from({ length: time + 1 })
    .map((_, i) => distance(i, time))
    .filter((dist) => dist > record).length;
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
