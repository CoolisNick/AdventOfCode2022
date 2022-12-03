const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
let lastLineBreak = -1;
let calorieList = [];
let topTotalCalories = [0, 0, 0];
let newLineBreak;
while ((newLineBreak = data.indexOf("\n", lastLineBreak + 1)) !== -1) {
    if (newLineBreak === lastLineBreak + 1) {
        const totalCalories = sumCalories(calorieList);
        checkTopTotal(totalCalories, topTotalCalories);
        calorieList = [];
        lastLineBreak = newLineBreak;
        continue;
    }
    const calories = Number(data.substring(lastLineBreak + 1, newLineBreak));
    console.log(calories);
    calorieList.push(calories);
    lastLineBreak = newLineBreak;
}
const totalCalories = sumCalories(calorieList);
checkTopTotal(totalCalories, topTotalCalories);
console.log(topTotalCalories);
console.log(sumCalories(topTotalCalories));

function sumCalories(calorieList) {
    let sum = 0;
    for (const calories of calorieList) {
        sum += calories;
    }
    return sum;
}

function checkTopTotal(totalCalories, topTotalCalories) {
    console.log(`Checking ${totalCalories}`);
    let minIndex = 0;
    for (let i = 0; i < 3; i++) {
        if (topTotalCalories[i] < topTotalCalories[minIndex]) {
            minIndex = i;
        }
    }
    if (totalCalories > topTotalCalories[minIndex]) {
        topTotalCalories[minIndex] = totalCalories;
        return true;
    }
    return false;
}