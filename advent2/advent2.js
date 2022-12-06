const fs = require("fs");
const readline = require("readline");

function read(getSignPoints, getMatchupPoints) {
    const readStream = fs.createReadStream("input.txt", "utf-8");
    let rl = readline.createInterface({input: readStream});
    rl.on("error", (error) => console.log(error.message));
    rl.on("line", (line) => parseData(line, getSignPoints, getMatchupPoints));
    rl.on("close", () => console.log(parseData.sum));
}

function parseData(data, getSignPoints, getMatchupPoints) {
    const firstChar = data[0];
    const secondChar = data[2];
    parseData.sum += getSignPoints(secondChar, firstChar);
    parseData.sum += getMatchupPoints(firstChar, secondChar);
}

function getSignPointsPt1(mySign) {
    switch (mySign) {
        case "X":
            return 1;
        case "Y":
            return 2;
        default:
            return 3;
    }
}

function getMatchupPointsPt1(opponentSign, mySign) {
    const win = 6;
    const draw = 3;
    const loss = 0;
    if (opponentSign === "A") {
        switch (mySign) {
            case "X":
                return draw;
            case "Y":
                return win;
            default:
                return loss;
        }
    }
    if (opponentSign === "B") {
        switch (mySign) {
            case "X":
                return loss;
            case "Y":
                return draw;
            default:
                return win;
        }
    }
    switch (mySign) {
        case "X":
            return win;
        case "Y":
            return loss;
        default:
            return draw;
    }
}

function getSignPointsPt2(outcome, opponentSign) {
    const rock = 1;
    const paper = 2;
    const scissors = 3;
    if (opponentSign === "A") {
        switch (outcome) {
            case "X":
                return scissors;
            case "Y":
                return rock;
            default:
                return paper;
        }
    }
    if (opponentSign === "B") {
        switch (outcome) {
            case "X":
                return rock;
            case "Y":
                return paper;
            default:
                return scissors;
        }
    }
    switch (outcome) {
        case "X":
            return paper;
        case "Y":
            return scissors;
        default:
            return rock;
    }
}

function getMatchupPointsPt2(opponentSign, outcome) {
    switch (outcome) {
        case "X":
            return 0;
        case "Y":
            return 3;
        default:
            return 6;
    }
}

parseData.sum = 0;
read(getSignPointsPt2, getMatchupPointsPt2);