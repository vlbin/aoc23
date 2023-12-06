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

const mapReverse = (out: number, translationMap: number[][]) => {
  for (const [dst, src, range] of translationMap) {
    if (dst <= out && dst + range > out) {
      return out + src - dst;
    }
  }

  return out;
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
    .map(([_, ...maps]) => maps.map((map) => map.split(" ").map(Number)))
    .reverse();

  let found: number | undefined;
  let i = 0;
  while (!found) {
    const out = groups.reduce((num, group) => {
      return mapReverse(num, group);
    }, i);

    if (seeds.some(([start, end]) => out >= start && out <= end)) {
      found = i;
    }
    i++;
  }

  return found;
};
