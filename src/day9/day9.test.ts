import { IntcodeComputer } from '../intcodeComputer';
import input from './input.txt';

describe('Day 9', () => {
    describe('part 1', () => {
        test('input is output', () => {
            const inputString = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
            const intcodeComputer = new IntcodeComputer(inputString);
            intcodeComputer.run(true);
            expect(intcodeComputer.outputs.join(',')).toBe(inputString);
        });

        test('output 16 digit number', () => {
            const inputString = '1102,34915192,34915192,7,4,7,99,0';
            const intcodeComputer = new IntcodeComputer(inputString);
            intcodeComputer.run();
            expect(intcodeComputer.output.toString().length).toBe(16);
        });

        test('output 1125899906842624', () => {
            const inputString = '104,1125899906842624,99';
            const intcodeComputer = new IntcodeComputer(inputString);
            intcodeComputer.run(true);
            expect(intcodeComputer.output).toBe(1125899906842624);
        });

        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim(), 1);
            intcodeComputer.run(true);
            expect(intcodeComputer.output).toBe(3765554916);
        });
    });

    describe('part 2', () => {
        test('challenge', () => {
            const intcodeComputer = new IntcodeComputer(input.trim(), 2);
            intcodeComputer.run(true);
            expect(intcodeComputer.output).toBe(76642);
        });
    });
});
