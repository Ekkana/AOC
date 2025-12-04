// import { input } from './input.js';
import { input } from './input2.js';

const ROLL = '@';
const EMPTY = '.';
const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
];

const parsedInput = input.split('\n').map((line) => line.split(''));
console.log(parsedInput);

const sol1 = () => {
    let totalItemsToSwitch = 0;
    for (let i = 0; i < parsedInput.length; i++) {
        for (let j = 0; j < parsedInput[i].length; j++) {
            let itemsAround = 0;
            if (parsedInput[i][j] === ROLL) {
                for (const [dirI, dirJ] of DIRECTIONS) {
                    const checkI = i + dirI;
                    const checkJ = j + dirJ;

                    if (
                        checkI < 0 ||
                        checkJ < 0 ||
                        checkI >= parsedInput.length ||
                        checkJ >= parsedInput[i].length
                    ) {
                        continue;
                    } else {
                        if (parsedInput[checkI][checkJ] === ROLL) {
                            itemsAround++;
                        }
                    }
                }
                if (itemsAround <= 3) {
                    totalItemsToSwitch++;
                }
                itemsAround = 0;
            }
        }
    }
    console.log(totalItemsToSwitch);
};

// sol1();

const sol2 = () => {
    let superTotalItemsToSwitch = 0;
    let totalItemsToSwitch = 0;
    let curInput = JSON.parse(JSON.stringify(parsedInput));
    let nextInput = JSON.parse(JSON.stringify(parsedInput));

    while (true) {
        curInput = JSON.parse(JSON.stringify(nextInput));
        nextInput = JSON.parse(JSON.stringify(curInput));
        for (let i = 0; i < curInput.length; i++) {
            for (let j = 0; j < curInput[i].length; j++) {
                let itemsAround = 0;
                if (curInput[i][j] === ROLL) {
                    for (const [dirI, dirJ] of DIRECTIONS) {
                        const checkI = i + dirI;
                        const checkJ = j + dirJ;

                        if (
                            checkI < 0 ||
                            checkJ < 0 ||
                            checkI >= curInput.length ||
                            checkJ >= curInput[i].length
                        ) {
                            continue;
                        } else {
                            if (curInput[checkI][checkJ] === ROLL) {
                                itemsAround++;
                            }
                        }
                    }
                    if (itemsAround <= 3) {
                        totalItemsToSwitch++;
                        nextInput[i][j] = EMPTY;
                    }
                    itemsAround = 0;
                }
            }
        }
        console.log(totalItemsToSwitch);
        if (totalItemsToSwitch === 0) {
            console.log('Finished');
            console.log(superTotalItemsToSwitch);
            break;
        }
        superTotalItemsToSwitch += totalItemsToSwitch;
        totalItemsToSwitch = 0;
    }
};

sol2();
