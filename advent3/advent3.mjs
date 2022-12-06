import fs from "fs";
import readline from "readline";

async function read(parseLine) {
    return new Promise((resolve) => {
        const readStream = fs.createReadStream("input.txt", "utf-8");
        const rl = readline.createInterface({input: readStream});
        rl.on("error", (error) => console.log(error.message));
        rl.on("line", parseLine);
        rl.on("close", () => {
            sumLetters();
            resolve();
        });
    });
}

function parseLinePt1(line) {
    const pack1 = line.slice(0, line.length / 2);
    const pack2 = line.slice(line.length / 2)
    letters.push(findCommon(pack1, pack2));
}

function findCommon(string1, string2, string3) {
    if (string3) {
        return findCommon(string1, findCommon(string2, string3))
    }
    let common = "";
    for (const item of string1) {
        let cont = false;
        for (let i of common) {
            if (item === i) {
                cont = true;
                break;
            }
        }
        if (cont) {
            continue;
        }
        const index = string2.indexOf(item);
        if (index !== -1) {
            common = common.concat(item);
        }
    }
    return common;
}

function sumLetters() {
    let sum = 0;
    for (const item of letters) {
        const priority = item.charCodeAt(0);
        if (priority > 96) {
            sum += priority - 96;
        } else {
            sum += priority - 38;
        }
    }
    console.log(`Sum: ${sum}`);
}

function parseLinePt2(line) {
    packs.push(line);
    if (packs.length === 3) {
        letters.push(findCommon(packs[0], packs[1], packs[2]))
        packs = [];

    }
}

let packs = [];
let letters = [];
await read(parseLinePt1);
letters = [];
await read(parseLinePt2);