export const part1 = (data: string) => {
  return "wowowowokwo";
};

export const part2 = (data: string) => {};

/*Bun.file(`src/01/input.txt`).text().then(res => {
  let t1 = Bun.nanoseconds();
  const result1 = part1(res);
  let t2 = Bun.nanoseconds();
  console.log(result1, "time: ", t2-t1, "ns/iter");
  t1 = Bun.nanoseconds();
  const result2 = part2(res);
  t2 = Bun.nanoseconds();
  console.log(result2, "time: ", t2-t1, "ns/iter");
})*/
