// import { input } from './input.js';
import { input } from './input2.js';

const freshIngredientsIds = input
    .split('\n\n')[0]
    .split('\n')
    .map((line) => line.split('-').map(Number));

console.log(freshIngredientsIds);

const ingredientsToBuy = input.split('\n\n')[1].split('\n').map(Number);

const sol1 = () => {
    let freshCount = 0;
    for (const id of ingredientsToBuy) {
        for (const [start, end] of freshIngredientsIds) {
            if (id >= start && id <= end) {
                console.log(
                    `Ingredient ID ${id} is fresh (in range ${start}-${end})`,
                );
                freshCount++;
                break;
            }
        }
    }
    console.log(freshCount);
    return freshCount;
};

// sol1();

const sol2 = () => {
    const results = [];
    freshIngredientsIds.sort((a, b) => a[0] - b[0]);

    for (const [start, end] of freshIngredientsIds) {
        if (!results.length || start > results[results.length - 1][1] + 1) {
            results.push([start, end]);
        } else {
            results[results.length - 1][1] = Math.max(
                results[results.length - 1][1],
                end,
            );
        }
    }

    console.log(
        results.reduce((acc, [start, end]) => acc + (end - start + 1), 0),
    );
};

sol2();
