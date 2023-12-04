export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((line) => line.split(": ")[1])
    .map((card) => card.split(" | "))
    .map(([winning, have]) => [
      winning.split(" ").filter((x) => x.length),
      have.split(" ").filter((x) => x.length),
    ])
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
  return have.filter((number) => winning.includes(number)).length;
};

const runExpandingGame = (cards: string[][][]) => {
  let counter = cards.length;
  let stacks = cards.map((card) => [card]);
  const winningNumbersPerCard = cards.map(processCard);

  stacks.forEach((stack, stackIndex) => {
    stack.forEach(() => {
      for (
        let i = stackIndex;
        i < winningNumbersPerCard[stackIndex] + stackIndex;
        i++
      ) {
        stacks[i + 1].push(stacks[i + 1][0]);
        counter++;
      }
    });
  });

  return counter;
};

export const part2 = (data: string) => {
  return runExpandingGame(
    data
      .split("\n")
      .map((line) => line.split(": ")[1])
      .map((card) => card.split(" | "))
      .map(([winning, have]) => [
        winning.split(" ").filter((x) => x.length),
        have.split(" ").filter((x) => x.length),
      ])
  );
};
