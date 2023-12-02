export const part1 = (data: string) => {
  return data
    .split("\n")
    .map((game, gameId) => ({
      game: game
        .split(": ")[1]
        .split("; ")
        .map((set) =>
          set.split(", ").reduce(
            (acc, curr) => {
              const [num, color] = curr.split(" ");
              acc[color] += Number(num);

              return acc;
            },
            { red: 0, blue: 0, green: 0 } as Record<string, number>
          )
        ),
      gameId: gameId + 1,
    }))
    .reduce((acc, { game, gameId }) => {
      if (
        game.every(
          (game) => game.red <= 12 && game.green <= 13 && game.blue <= 14
        )
      ) {
        acc += gameId;
      }
      return acc;
    }, 0);
};

export const part2 = (data: string) => {
  return data
    .split("\n")
    .map((game, index) =>
      game
        .split(": ")[1]
        .split("; ")
        .map((set) =>
          set.split(", ").reduce(
            (acc, curr) => {
              const [num, color] = curr.split(" ");
              acc[color] = Math.max(acc[color], Number(num));

              return acc;
            },
            { red: 0, green: 0, blue: 0 } as Record<string, number>
          )
        )
        .reduce(
          (acc, curr, i) => {
            return {
              red: Math.max(acc.red, curr.red),
              blue: Math.max(acc.blue, curr.blue),
              green: Math.max(acc.green, curr.green),
            };
          },
          { red: 0, green: 0, blue: 0 }
        )
    )
    .reduce((prev, curr) => {
      prev += Object.values(curr).reduce((p, c) => p * c, 1);
      return prev;
    }, 0);
};
