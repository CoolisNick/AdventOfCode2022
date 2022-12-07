const fs = require("fs");
const readLine = require("readline");

function read() {
    const readStream = fs.createReadStream("inputTest.txt", "utf-8");
    const rl = readLine.createInterface({input: readStream});
    rl.on("error", (error) => console.log(error.message));
    rl.on("line", parseLine);
    rl.on("close", () => console.log(buckets));
}

function parseLine(line) {
    if (!numBuckets) {
        numBuckets = (line.length + 1) / 4;
        for (let i = 0; i < numBuckets; i++) {
            buckets[i] = new Array();
        }
    }
    if (buildingBuckets) {
        if (line[1] === "1") {
            buildingBuckets = false;
        }
        for (let i = 0; i < numBuckets; i++) {
            let crate = line[i * 4 + 1];
            if (crate !== " ") {
                buckets[i].splice(0, 0, crate);
            }
        }
    }
}

const buckets = [];
let numBuckets;
let buildingBuckets = true;
read();