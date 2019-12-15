import input from './input.txt';
import { getRoute, fillOxygen } from './day15';

describe('Day 15', () => {
    describe('Part 1', () => {
        test('challenge', () => {
            expect(getRoute(input.trim())).toBe(232);
        });
    });

    describe('Part 2', () => {
        test('challenge', () => {
            expect(fillOxygen(input.trim())).toBe(320);
        });
    });
});
