const mapSuit = (card: string, withJoker = false) =>
  card === "J" && withJoker
    ? 1
    : Number.isInteger(Number(card))
    ? Number(card)
    : "TJQKA".indexOf(card) + 10;

const group = (hand: number[]) =>
  hand.reduce((values, card) => {
    if (values[card]) {
      values[card] += 1;
    } else {
      values[card] = 1;
    }
    return values;
  }, {} as Record<string, number>);

const five = (hand: number[]) =>
  Object.values(group(hand)).some((v) => v === 5);

const four = (hand: number[]) =>
  Object.values(group(hand)).some((v) => v === 4);

const three = (hand: number[]) =>
  Object.values(group(hand)).some((v) => v === 3);

const twoPair = (hand: number[]) =>
  Object.values(group(hand)).filter((value) => value === 2).length === 2;
const pair = (hand: number[]) =>
  Object.values(group(hand)).filter((value) => value === 2).length === 1;

const highCard = (hand: number[]) =>
  Object.values(group(hand)).every((v) => v === 1);

const comp = (
  func: (hand: number[]) => boolean,
  hand1: number[],
  hand2: number[]
) => {
  const r1 = func(hand1);
  const r2 = func(hand2);
  if (r1 && !r2) return -1;
  if (!r1 && r2) return 1;
  return 0;
};

const compareCards = (hand1: number[], hand2: number[]) => {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] > hand2[i]) {
      return -1;
    } else if (hand2[i] > hand1[i]) {
      return 1;
    }
  }
  return 0;
};

const bestVariant = (hand: number[]) => {
  const sorted = Object.entries(group(hand)).sort(([k1, v1], [k2, v2]) => {
    return v2 - v1;
  });

  const index = Math.max(
    0,
    sorted.findIndex((f) => f[0] !== "1")
  );

  const mod = hand.map((c) => (c === 1 ? Number(sorted[index][0]) : c));

  return mod;
};

const sorter = (hand1: [number, number[]], hand2: [number, number[]]) => {
  const mod1 = bestVariant(hand1[1]);
  const mod2 = bestVariant(hand2[1]);

  return [five, four, three, twoPair, pair, highCard].reduce(
    (result, func, i, funcs) => {
      if (i === funcs.length - 1 && result === 0) {
        result = compareCards(hand1[1], hand2[1]);
      } else if (result === 0) {
        return comp(func, mod1, mod2);
      }

      return result;
    },
    0
  );
};

export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([hand, bid]) =>
        [Number(bid), hand.split("").map((card) => mapSuit(card))] as [
          number,
          number[]
        ]
    )
    .sort(sorter)
    .reduce((acc, [bid], i, arr) => {
      return (arr.length - i) * bid + acc;
    }, 0);
};

export const part2 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([hand, bid]) =>
        [Number(bid), hand.split("").map((card) => mapSuit(card, true))] as [
          number,
          number[]
        ]
    )
    .sort(sorter)
    .reduce((acc, [bid, hand], i, arr) => {
      return (arr.length - i) * bid + acc;
    }, 0);
};
