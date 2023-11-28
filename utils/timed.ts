const day = Bun.argv[2] === "today" ? new Date().getDate() : Bun.argv[2];
const mode = Bun.argv[3] ?? "input";
const padded = Number(day) < 10 ? "0" + day : day;

const solution = await import(`../src/${padded}/solution`);

const file = Bun.file(`src/${padded}/${mode}.txt`);

const timed = (callback: () => void) => {
  const t1 = Bun.nanoseconds();
  const result = callback();
  const t2 = Bun.nanoseconds();
  console.log("output: ", result);
  console.log("time: ", `${t2 - t1}ns`);
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
