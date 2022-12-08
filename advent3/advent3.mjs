import fs from "fs";
import readline from "readline";

class Run {
    packs = [];
    letters = [];
    part;

    constructor(options) {
        this.part = options.part;
    }

    parseLinePt1(line) {
        const pack1 = line.slice(0, line.length / 2);
        const pack2 = line.slice(line.length / 2)
        this.letters.push(this.findCommon(pack1, pack2));
    }

    findCommon(string1, string2, string3) {
        for (const item of string1) {
            if (string2.indexOf(item) !== -1 &&
                (!string3 || string3.indexOf(item) !== -1)) {
                return item;
            }
        }
    }

    sumLetters() {
        let sum = 0;
        for (const item of this.letters) {
            const priority = item.charCodeAt(0);
            if (priority > 96) {
                sum += priority - 96;
            } else {
                sum += priority - 38;
            }
        }
        console.log(`Part ${this.part} Sum: ${sum}`);
    }

    parseLinePt2(line) {
        this.packs.push(line);
        if (this.packs.length === 3) {
            this.letters.push(this.findCommon(this.packs[0], this.packs[1], this.packs[2]))
            this.packs = [];

        }
    }
    
    read() {
        const readStream = fs.createReadStream("input.txt", "utf-8");
        const rl = readline.createInterface({ input: readStream });
        rl.on("error", (error) => console.log(error.message));
        rl.on("line", (line) => {
            if (this.part === 1) {
                this.parseLinePt1(line);
            } else {
                this.parseLinePt2(line);
            }
        });
        rl.on("close", () => {
            this.sumLetters();
        });
    }
}

new Run({ part: 1}).read();
new Run({ part: 2}).read();
