const isNumber = (data: string) => {
  return Number.isInteger(Number(data));
};

interface NumberType {
  value: string;
  row: number;
  col: number;
}

const findNumbers = (rows: string[]) => {
  const numbers: NumberType[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let number = "";
    let start = -1;
    for (let k = 0; k < rows[0].length; k++) {
      const val = row[k];
      if (isNumber(val)) {
        if (start === -1) {
          start = k;
        }
        number += val;
      } else if (start !== -1) {
        numbers.push({
          value: number,
          col: start,
          row: i,
        });
        number = "";
        start = -1;
      }
    }
    if (number.length) {
      numbers.push({
        value: number,
        col: start,
        row: i,
      });
      number = "";
      start = -1;
    }
  }

  return numbers;
};

export const part1 = (data: string) => {
  const rows = data.split("\n");
  const numbers = findNumbers(rows);
  const partNumbers: number[] = [];
  for (const number of numbers) {
    let added = false;
    const end = number.col + number.value.length;
    for (let i = number.col; i < end; i++) {
      for (const y of [-1, 0, 1]) {
        for (const x of [-1, 0, 1]) {
          if (
            rows[number.row + y] &&
            rows[number.row + y][i + x] &&
            rows[number.row + y][i + x] !== "." &&
            !isNumber(rows[number.row + y][i + x]) &&
            !added
          ) {
            partNumbers.push(Number(number.value));
            added = true;
          }
        }
      }
    }
  }
  return partNumbers.reduce((prev, curr) => prev + curr, 0);
};

const findGears = (rows: string[]) => {
  const coordinates: number[][] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let k = 0; k < row.length; k++) {
      if (row[k] === "*") {
        coordinates.push([k, i]);
      }
    }
  }
  return coordinates;
};

export const part2 = (data: string) => {
  const rows = data.split("\n");
  const numbers = findNumbers(rows);
  const gears = findGears(rows);
  const gearSums: number[] = [];

  for (const [gearX, gearY] of gears) {
    const adjacent = numbers.filter((number) => {
      const range = Array(number.value.length)
        .fill(0)
        .map((_, i) => [i + number.col, number.row]);

      const val = range.some(
        (coordinate) =>
          Math.sqrt(
            Math.pow(coordinate[0] - gearX, 2) +
              Math.pow(coordinate[1] - gearY, 2)
          ) < 2
      );

      return val;
    });

    if (adjacent.length === 2) {
      gearSums.push(adjacent.reduce((p, c) => p * Number(c.value), 1));
    }
  }

  return gearSums.reduce((p, c) => p + c, 0);
};
