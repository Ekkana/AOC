// import { input } from './input.js';
import { input } from './input2.js';

const START = 'S';
const SPLIT = '^';
const EMPTY = '.';

const parsed = input.split('\n').map((line) => line.trim());

const sol1 = () => {
    const startPos = [0, 0];
    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[i].length; j++) {
            if (parsed[i][j] === START) {
                startPos[0] = i;
                startPos[1] = j;
            }
        }
    }

    const splits = [];
    const findPaths = (start, foundPaths = []) => {
        for (let i = start[0] + 1; i < parsed.length; i++) {
            const char = parsed[i][start[1]];
            if (char === SPLIT) {
                splits.push([i, start[1]]);
                findPaths([i, start[1] - 1], [...foundPaths, [i, start[1]]]);
                findPaths([i, start[1] + 1], [...foundPaths, [i, start[1]]]);
                break;
            } else if (char === EMPTY) {
                continue;
            }
        }
    };
    const paths = findPaths(startPos);

    console.log(splits.length);
    console.log(paths.length);
};

// sol1();

const sol2 = () => {
    const startPos = [0, 0];
    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[i].length; j++) {
            if (parsed[i][j] === START) {
                startPos[0] = i;
                startPos[1] = j;
            }
        }
    }

    const memo = [];
    const findPaths = (start) => {
        const memoKey = `${start[0]}-${start[1]}`;
        if (start[0] === parsed.length - 1) {
            memo[memoKey] = 1;
            return 1;
        }
        if (memo[memoKey]) {
            return memo[memoKey];
        }

        const nextIndex = [start[0] + 1, start[1]];
        const char = parsed[nextIndex[0]][nextIndex[1]];

        let result = 0;

        if (char === SPLIT) {
            const leftPath = findPaths([nextIndex[0], nextIndex[1] - 1]);
            const rightPath = findPaths([nextIndex[0], nextIndex[1] + 1]);
            result = leftPath + rightPath;
        }
        if (char === EMPTY) {
            result = findPaths(nextIndex);
        }
        memo[memoKey] = result;
        return result;
    };

    console.log(findPaths(startPos));
};

console.time('sol2');
sol2();
console.timeEnd('sol2');
