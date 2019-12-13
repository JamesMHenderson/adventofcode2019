import input from './input.txt';
import { IntcodeComputer } from '../intcodeComputer';

describe('Day 13', () => {
    describe('part 1', () => {
        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim());
            intcodeComputer.run(true);
            let count = 0;
            for (let i = 2; i < intcodeComputer.outputs.length; i += 3) {
                if (intcodeComputer.outputs[i] === 2) count++;
            }

            expect(count).toBe(309);
        });
    });

    describe('part 2', () => {
        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim(), 0);
            intcodeComputer.run(true);
            intcodeComputer.transform0(2);
            let count = -1;
            let score = 0;
            while (count != 0) {
                count = 0;
                let ballPosition = [0, 0];
                let paddlePosition = [0, 0];
                const outputs = intcodeComputer.outputs;
                const board: Array<Array<number>> = Array(25)
                    .fill(0)
                    .map(() => [...Array(35).fill(' ')]);
                for (let i = 0; i < outputs.length; i += 3) {
                    if (outputs[i] === -1 && outputs[i + 2] != 0) {
                        score = outputs[i + 2];
                        continue;
                    }

                    board[outputs[i + 1]][outputs[i]] = outputs[i + 2];

                    if (outputs[i + 2] === 2) count++;

                    if (outputs[i + 2] === 4) ballPosition = [outputs[i], outputs[i + 1]];
                    if (outputs[i + 2] === 3) paddlePosition = [outputs[i], outputs[i + 1]];
                }

                if (ballPosition[0] < paddlePosition[0]) intcodeComputer.addInput(-1);
                if (ballPosition[0] > paddlePosition[0]) intcodeComputer.addInput(1);
                if (ballPosition[0] === paddlePosition[0]) intcodeComputer.addInput(0);

                // console.log(board.map(value => value.join('')));

                intcodeComputer.outputs = [];
                intcodeComputer.run(true);
            }

            expect(score).toBe(309);
        });
    });
});