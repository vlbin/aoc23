const mapSuit = (card: string, withJoker = false) =>
  card === "J" && withJoker
    ? 1
    : Number.isInteger(Number(card))
    ? Number(card)
    : "TJQKA".indexOf(card) + 10;

const group = (hand: number[]) =>
  hand.reduce(
    (values, card) => ({
      ...values,
      [card]: (values[card] || 0) + 1,
    }),
    {} as Record<string, number>
  );

const kind = (size: number) => (hand: number[]) =>
  Object.values(group(hand)).some((v) => v === size);

const pairs = (n: number) => (hand: number[]) =>
  Object.values(group(hand)).filter((value) => value === 2).length === n;

const highCard = (hand: number[]) =>
  Object.values(group(hand)).every((v) => v === 1);

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

  return hand.map((c) => (c === 1 ? Number(sorted[index][0]) : c));
};

const sorter = (hand1: [number, number[]], hand2: [number, number[]]) => {
  const mod1 = bestVariant(hand1[1]);
  const mod2 = bestVariant(hand2[1]);

  return [kind(5), kind(4), kind(3), pairs(2), pairs(1), highCard].reduce(
    (result, func, i, funcs) => {
      if (i === funcs.length - 1 && result === 0) {
        result = compareCards(hand1[1], hand2[1]);
      } else if (result === 0) {
        const r1 = func(mod1);
        const r2 = func(mod2);
        if (r1 && !r2) return -1;
        if (!r1 && r2) return 1;
        return 0;
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
    .reduce((acc, [bid], i, arr) => (arr.length - i) * bid + acc, 0);
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
    .reduce((acc, [bid], i, arr) => (arr.length - i) * bid + acc, 0);
};
