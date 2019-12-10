import inputExample1 from './inputExample1.txt';
import inputExample2 from './inputExample2.txt';
import { calculatePosition, destroyAstroids } from './day10';
import input from './input.txt';

describe('Day 10', () => {
    describe('part 1', () => {
        test('example 1', () => {
            const map = inputExample1.split('\r\n').map(row => Array.from(row));

            expect(calculatePosition(map)).toEqual({
                position: [3, 4],
                result: 8,
            });
        });

        test('example 2', () => {
            const map = inputExample2.split('\r\n').map(row => Array.from(row));

            expect(calculatePosition(map)).toEqual({
                position: [11, 13],
                result: 210,
            });
        });

        test('challenge', () => {
            const map = input
                .trim()
                .split('\r\n')
                .map(row => Array.from(row));

            expect(calculatePosition(map)).toEqual({
                position: [23, 20],
                result: 334,
            });
        });
    });

    describe('part 2', () => {
        test('example', () => {
            const map = inputExample2
                .trim()
                .split('\r\n')
                .map(row => Array.from(row));

            expect(destroyAstroids(map, [8, 3])).toBe(802);
        });

        test('challenge', () => {
            const map = input
                .trim()
                .split('\r\n')
                .map(row => Array.from(row));

            expect(destroyAstroids(map, [23, 20])).toBe(1119);
        });
    });
});
