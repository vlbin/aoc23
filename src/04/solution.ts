export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.replaceAll("  ", " "))
    .map((line) => line.split(": ")[1])
    .map((card) => card.split(" | "))
    .map(([winning, have]) => [winning.split(" "), have.split(" ")])
    .map(([winning, have]) =>
      have.reduce((counter, number) => {
        if (winning.includes(number)) {
          counter = counter ? counter * 2 : 1;
        }
        return counter;
      }, 0)
    )
    .reduce((p, c) => p + c, 0);
};

const processCard = ([winning, have]: string[][]) => {
  return have.filter((number) => winning.includes(number));
};

const runExpandingGame = (cards: string[][][]) => {
  const counts = cards.map(() => 1);

  cards.forEach((card, index) => {
    const wins = processCard(card);
    wins.forEach((_, nextIndex) => {
      counts[index + 1 + nextIndex] += counts[index];
    });
  });
  return counts.reduce((p, c) => p + c, 0);
};

export const part2 = (data: string) => {
  return runExpandingGame(
    data
      .split("\n")
      .map((line) => line.replaceAll("  ", " "))
      .map((line) => line.split(": ")[1])
      .map((card) => card.split(" | "))
      .map(([winning, have]) => [winning.split(" "), have.split(" ")])
  );
};
