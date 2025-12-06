// import { input } from './input.js';
import { input } from './input2.js';

const sol1 = () => {
    const lines = input.split('\n').map((line) => line.trim());
    console.log('lines', lines);

    // replace spaces with one space
    lines.forEach((line, index) => {
        lines[index] = line.replace(/\s+/g, ' ');
    });

    console.log('lines after space normalization', lines);

    const parsed = [];
    for (let i = 0; i < lines.length - 1; i++) {
        parsed.push(lines[i].split(' ').map((num) => parseInt(num, 10)));
    }

    const symbols = lines[lines.length - 1].split(' ');
    console.log('parsed', parsed);
    console.log('symbols', symbols);

    let total = 0;

    for (let i = 0; i < parsed[0].length; i++) {
        let subtotal = 0;
        for (let j = 0; j < parsed.length; j++) {
            if (j === 0) {
                subtotal = parsed[j][i];
                continue;
            }
            switch (symbols[i]) {
                case '+':
                    subtotal += parsed[j][i];
                    break;
                case '-':
                    subtotal -= parsed[j][i];
                    break;
                case '*':
                    console.log('subtotal before multiply', subtotal);
                    console.log('multiplying by', parsed[j][i]);
                    subtotal *= parsed[j][i];
                    break;
                case '/':
                    subtotal /= parsed[j][i];
                    break;
                default:
                    console.log('Unknown symbol', symbols[i]);
            }
        }
        total += subtotal;
    }
    console.log('Total:', total);
    return total;
};

// sol1();

const sol2 = () => {
    const lines = input.split('\n').map((line) => line);
    let operation = lines[lines.length - 1][0];
    let resultStr = '';

    for (let j = 0; j < lines[0].length; j++) {
        let num = '';
        if (lines[lines.length - 1][j] !== ' ') {
            operation = lines[lines.length - 1][j];
        }
        for (let i = 0; i < lines.length - 1; i++) {
            num += lines[i][j];
        }
        if (num.trim().length === 0) {
            resultStr = resultStr.slice(0, -1);
            resultStr += num.trim() + '+';
        } else {
            resultStr += num.trim() + operation;
        }
    }

    resultStr = resultStr.slice(0, -1);
    return eval(resultStr);
};

console.time('sol2');
console.log(sol2());
console.timeEnd('sol2');
