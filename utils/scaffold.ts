import { mkdirSync } from "node:fs";

const day = Bun.argv[2] ? Number(Bun.argv[2]) : new Date().getDate();

const padded = day < 10 ? "0" + day : day;

mkdirSync(`src/${padded}`);

const template = `export const part1 = (data: string) => {}

export const part2 = (data: string) => {}
`;

Bun.write(`src/${padded}/test.txt`, "");
Bun.write(`src/${padded}/input.txt`, "");
Bun.write(`src/${padded}/solution.ts`, template);
