const fs = require("fs");
const readLine = require("readline");

function read() {
    let state = {};
    const readStream = fs.createReadStream("input.txt", "utf-8");
    const rl = readLine.createInterface({input: readStream});
    rl.on("error", (error) => console.log(error.message));
    rl.on("line", (line) => state = parseLine(line, state));
    rl.on("close", () => console.log(topCrates(state.buckets)));
}

function parseLine(line, state) {
    const buckets = state.buckets || [];
    let numBuckets = state.numBuckets;
    let buildingBuckets = (state.buildingBuckets === undefined ? true : state.buildingBuckets);

    if (!numBuckets) {
        numBuckets = (line.length + 1) / 4;
        for (let i = 0; i < numBuckets; i++) {
            buckets[i] = new Array();
        }
    }
    if (buildingBuckets) {
        if (line[1] === "1") {
            buildingBuckets = false;
        } else {
            for (let i = 0; i < numBuckets; i++) {
                let crate = line[i * 4 + 1];
                if (crate !== " ") {
                    buckets[i].splice(0, 0, crate);
                }
            }
        }
    } else {
        let spaceIndex;
        const moveNum = Number(line.substring(5, spaceIndex = line.indexOf(" ", 5)));
        const fromBucket = (Number(line.substring(spaceIndex + 6, spaceIndex = line.indexOf(" ", spaceIndex + 6))) - 1);
        const toBucket = (Number(line.substring(spaceIndex + 4)) - 1);
        if (moveNum) {
            for (let i = 0; i < moveNum; i++) {
                const movingCrate = buckets[fromBucket].pop();
                buckets[toBucket].push(movingCrate);
            }
        }
    }
    return {
        buckets,
        numBuckets,
        buildingBuckets,
    };
}

function topCrates(buckets) {
    let top = "";
    for (let i = 0; i < buckets.length; i++) {
        top = top.concat(buckets[i].pop());
    }
    return top;
}

read();
