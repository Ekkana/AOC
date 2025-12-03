// import { input } from "./input.js";
import { input } from './input2.js';

const parsed = input.split('\n');
console.log(parsed);

const sol1 = () => {
    const result = [];
    for (let i = 0; i < parsed.length; i++) {
        let maxLeft = parsed[i][0];
        let maxRight = parsed[i][1];

        for (let j = 1; j < parsed[i].length; j++) {
            if (parsed[i][j] > maxLeft && j !== parsed[i].length - 1) {
                maxLeft = parsed[i][j];
                maxRight = parsed[i][j + 1];
            } else if (parsed[i][j] > maxRight) {
                maxRight = parsed[i][j];
            }
        }
        result.push(maxLeft + maxRight);
        console.log(maxLeft, maxRight);
    }
    console.log(result.reduce((acc, num) => acc + parseInt(num), 0));
};

// sol1();

const sol2 = (resultLength) => {
    const result = [];
    for (let i = 0; i < parsed.length; i++) {
        let maxDigits = parsed[i].slice(-resultLength).split('');
        let maxDigitsIndices = [];
        for (let j = 0; j < resultLength; j++) {
            maxDigitsIndices.push(parsed[i].length - resultLength + j);
        }
        for (let j = 0; j < maxDigits.length; j++) {
            for (
                let k = parsed[i].length - maxDigits.length + j - 1;
                k >= j;
                k--
            ) {
                if (parsed[i][k] >= maxDigits[j]) {
                    if (j === 0 || maxDigitsIndices[j - 1] < k) {
                        maxDigits[j] = parsed[i][k];
                        maxDigitsIndices[j] = k;
                    }
                }
            }
        }

        result.push(maxDigits.join(''));
    }
    console.log(result.reduce((acc, num) => acc + parseInt(num), 0));
};

console.time('sol2');
sol2(12);
console.timeEnd('sol2');
