const day = Bun.argv[2] === "today" ? new Date().getDate() : Bun.argv[2];
const mode = Bun.argv[3] ?? "input";
const padded = Number(day) < 10 ? "0" + day : day;

const solution = await import(`../src/${padded}/solution`);

const file = Bun.file(`src/${padded}/${mode}.txt`);

file.text().then((data) => {
  console.log(`running with ${mode} data`);

  console.log("output 1: ", solution.part1(data));
  console.log("output 2: ", solution.part2(data));
});
