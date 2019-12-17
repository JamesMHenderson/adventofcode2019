import { IntcodeComputer } from '../intcodeComputer';
import input from './input.txt';

describe('Day 17', () => {
    describe('Part 1', () => {
        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim());
            intcodeComputer.run(true);
            const map = intcodeComputer.outputs.map(char => String.fromCharCode(char)).join('');
            const arrMap = map.trim().split('\n');
            console.log(map);

            let count = 0;

            for (let i = 1; i < arrMap.length - 1; i++) {
                for (let j = 1; j < arrMap[0].length - 1; j++) {
                    if (
                        arrMap[i][j] === '#' &&
                        arrMap[i][j - 1] === '#' &&
                        arrMap[i][j + 1] === '#' &&
                        arrMap[i - 1][j] === '#' &&
                        arrMap[i + 1][j] === '#'
                    ) {
                        count += i * j;
                    }
                }
            }

            expect(count).toBe(3888);
        });
    });

    describe('Part 2', () => {
        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim());
            intcodeComputer.transform0(2);
            const A = 'L,10,R,12,R,12\n'.split('').map(char => char.charCodeAt(0));
            const B = 'R,6,R,10,L,10\n'.split('').map(char => char.charCodeAt(0));
            const C = 'R,10,L,10,L,12,R,6\n'.split('').map(char => char.charCodeAt(0));
            const end = 'n\n'.split('').map(char => char.charCodeAt(0));
            const full = 'A,B,A,C,B,C,B,C,A,C\n'.split('').map(char => char.charCodeAt(0));
            intcodeComputer.input = full.concat(A, B, C, end);
            intcodeComputer.run(true);

            expect(intcodeComputer.output).toBe(927809);
        });
    });
});
