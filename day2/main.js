// import { input } from "./input.js";
import { input } from "./input2.js";
const pairs = [];

input.split(",").forEach((x) => {
  const pair = x.split("-").map((y) => y);
  pairs.push(pair);
});

const areHalvesEqual = (strNum) => {
  if (strNum.length % 2 !== 0) {
    return false;
  }

  const firstHalf = strNum.slice(0, strNum.length / 2);
  const secondHalf = strNum.slice(strNum.length / 2);
  console.log(firstHalf, "-", secondHalf);
  return firstHalf === secondHalf;
};

const areNPartsEqual = (strNum) => {
  const possiblePartLength = [];

  for (let i = 1; i <= strNum.length / 2; i++) {
    if (strNum.length % i === 0) {
      possiblePartLength.push(i);
    }
  }

  const checkPartsEqual = (strNum, partLength) => {
    const numParts = strNum.length / partLength;
    const parts = [];
    for (let i = 0; i < numParts; i++) {
      const part = strNum.slice(i * partLength, (i + 1) * partLength);
      parts.push(part);
    }
    const firstPart = parts[0];
    for (let j = 1; j < parts.length; j++) {
      if (parts[j] !== firstPart) {
        return false;
      }
    }
    return true;
  };

  for (let k = 0; k < possiblePartLength.length; k++) {
    const partLength = possiblePartLength[k];
    if (checkPartsEqual(strNum, partLength)) {
      return true;
    }
  }
  // console.log("Possible part lengths for", strNum, ":", possiblePartLength);
  return false;
};

const foundEqual = [];
for (let i = 0; i < pairs.length; i++) {
  const pair = pairs[i];
  const startNum = parseInt(pair[0]);
  const endNum = parseInt(pair[1]);

  for (let j = startNum; j <= endNum; j++) {
    // console.log("Checking number:", j);
    const strNum = j.toString();
    if (areNPartsEqual(strNum)) {
      foundEqual.push(j);
    }
  }
}
console.log(pairs);
console.log(foundEqual.reduce((acc, val) => acc + val, 0));
