import example from './example.txt';
import example2 from './example2.txt';
import example3 from './example3.txt';
import example4 from './example4.txt';
import example5 from './example5.txt';
import input from './input.txt';
import { calculateFuel, calculateOre } from './day14';

describe('Day 14', () => {
    describe('Part 1', () => {
        test('example1', () => {
            expect(calculateOre(example.trim().split('\r\n'))).toBe(31);
        });

        test('example2', () => {
            expect(calculateOre(example2.trim().split('\r\n'))).toBe(165);
        });

        test('example3', () => {
            expect(calculateOre(example3.trim().split('\r\n'))).toBe(13312);
        });

        test('example4', () => {
            expect(calculateOre(example4.trim().split('\r\n'))).toBe(180697);
        });

        test('example5', () => {
            expect(calculateOre(example5.trim().split('\r\n'))).toBe(2210736);
        });

        test('challenge', () => {
            expect(calculateOre(input.trim().split('\r\n'))).toBe(202617);
        });
    });

    describe('part2', () => {
        const trillion = 1000000000000;
        test('example5', () => {
            const puzzleInput = example5.trim().split('\r\n');
            expect(calculateFuel(puzzleInput, trillion)).toBe(460664);
        });

        test('example4', () => {
            const puzzleInput = example4.trim().split('\r\n');
            expect(calculateFuel(puzzleInput, trillion)).toBe(5586022);
        });

        test('example3', () => {
            const puzzleInput = example3.trim().split('\r\n');
            expect(calculateFuel(puzzleInput, trillion)).toBe(82892753);
        });

        test('challenge', () => {
            const puzzleInput = input.trim().split('\r\n');
            expect(calculateFuel(puzzleInput, trillion)).toBe(7863863);
        });
    });
});
