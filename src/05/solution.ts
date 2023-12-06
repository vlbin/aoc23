const map = (raw: number, translationMap: number[][]) => {
  let mapped = raw;
  let hasMapped = false;

  for (const [dst, src, range] of translationMap) {
    if (raw >= src && raw <= src + range && !hasMapped) {
      mapped = dst - src + raw;
      break;
    }
  }

  return mapped;
};

export const part1 = (data: string) => {
  const [_seeds, ..._groups] = data.split("\n\n");
  const seeds = _seeds.split(": ")[1].split(" ").map(Number);
  const groups = _groups
    .map((group) => group.split("\n"))
    .map(([_, ...maps]) => maps.map((map) => map.split(" ").map(Number)));
  const locations = seeds.map((seed) => {
    return groups.reduce((loc, curr) => {
      return map(loc, curr);
    }, seed);
  });
  return Math.min(...locations);
};

export const part2 = (data: string) => {
  const [_seeds, ..._groups] = data.split("\n\n");

  const seeds = _seeds
    .split(": ")[1]
    .split(" ")
    .map(Number)
    .reduce((expanded, curr, i, seeds) => {
      if (i % 2) {
        expanded[expanded.length - 1].push(seeds[i - 1] + curr);
      } else {
        expanded.push([curr]);
      }
      return expanded;
    }, [] as number[][]);

  const groups = _groups
    .map((group) => group.split("\n"))
    .map(([_, ...maps]) => maps.map((map) => map.split(" ").map(Number)));

  const locations = seeds.map(([startSeed, endSeed]) => {
    return [
      groups.reduce((loc, curr) => {
        return map(loc, curr);
      }, startSeed),
      groups.reduce((loc, curr) => {
        return map(loc, curr);
      }, endSeed),
    ];
  });

  // let value = 1000000000;
  // for (let [start, end] of seeds) {
  //   while (start < end) {
  //     const newValue = groups.reduce((loc, curr) => {
  //       return map(loc, curr);
  //     }, start);

  //     if (newValue < value) {
  //       value = newValue;
  //     }
  //     start++;
  //   }
  // }
  return locations;
};
