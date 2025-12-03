import { input } from "./input.js";

const moves = [];

input.split("\n").forEach((x) => {
  moves.push(x);
});

let curVal = 50;
let totalZeroes = 0;
const totalSteps = 100;

for (let i = 0; i < moves.length; i++) {
  const direction = moves[i][0];
  const val = parseInt(moves[i].slice(1));
  const cleanedVal = val % totalSteps;
  const rotations = Math.floor(val / totalSteps);

  switch (direction) {
    case "L":
      const newValue = curVal - cleanedVal;

      if (newValue < 0) {
        if (curVal !== 0) {
          totalZeroes++;
        }
        curVal = newValue + totalSteps;
      } else {
        curVal = newValue;
      }
      break;
    case "R":
      const newVal = curVal + cleanedVal;

      if (newVal > totalSteps) {
        if (curVal !== 0) {
          totalZeroes++;
        }
        curVal = newVal - totalSteps;
      } else if (newVal === totalSteps) {
        curVal = 0;
      } else {
        curVal = newVal;
      }

      break;
  }
  if (rotations > 0) {
    totalZeroes += rotations;
  }
  if (curVal === 0) {
    totalZeroes++;
  }
}

console.log("Total times at 0:", totalZeroes);
