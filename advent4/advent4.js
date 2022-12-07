const fs = require("fs");
const readline = require("readline");

function read() {
    const readStream = fs.createReadStream("input.txt", "utf-8");
    const rl = readline.createInterface({input: readStream});
    rl.on("error", (error) => console.log(error.message));
    rl.on("line", parseLine);
    rl.on("close", () => console.log(`Part 1: ${sum}, Part 2: ${sum2}`));
}

function parseLine(line) {
    let ranges = line.split(",");
    ranges = ranges.map((range) => range.split("-"));
    for (let sub in ranges) {
        ranges[sub] = ranges[sub].map((value) => Number(value));
    }
    if ((ranges[0][0] <= ranges[1][1] && ranges[0][1] >= ranges[1][0])) {
        sum2++;
    } else {
        return;
    }
    if ((ranges[0][0] <= ranges[1][0] && ranges[0][1] >= ranges[1][1]) ||
        (ranges[0][0] >= ranges[1][0] && ranges[0][1] <= ranges[1][1])) {
        sum++;
    }
}

let sum = 0;
let sum2 = 0;
read()