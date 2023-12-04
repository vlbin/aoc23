const day = Bun.argv[2] === "today" ? new Date().getDate() : Bun.argv[2];
const mode = Bun.argv[3] ?? "input";
const padded = Number(day) < 10 ? "0" + day : day;

const solution = await import(`../src/${padded}/solution`);

const file = Bun.file(`src/${padded}/${mode}.txt`);

const timings: number[] = [];
let result: unknown;

const timed = (callback: () => void) => {
  Array(10)
    .fill(0)
    .forEach(() => {
      const t1 = Bun.nanoseconds();
      result = callback();
      const t2 = Bun.nanoseconds();
      timings.push(t2 - t1);
    });
  console.log("output: ", result);
  console.log(
    "time: ",
    `${timings.reduce((p, c) => p + c, 0) / 10 / 1000} microseconds`
  );
};

file.text().then((data) => {
  console.log(`running with ${mode} data`);
  timed(() => {
    return solution.part1(data);
  });

  timed(() => {
    return solution.part2(data);
  });
});
