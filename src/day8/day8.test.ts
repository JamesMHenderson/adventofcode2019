import { createImageLayers, checkLayers, createImage } from './day8';
import input from './input.txt';

describe('day 8', () => {
    describe('Part 1', () => {
        test('example', () => {
            expect(checkLayers('123456789012', { x: 3, y: 2 })).toBe(1);
        });

        test('challenge', () => {
            expect(checkLayers(input.trim(), { x: 25, y: 6 })).toBe(1690);
        });
    });

    describe('Part 2', () => {
        test('example', () => {
            expect(createImage('0222112222120000', { x: 2, y: 2 })).toMatchSnapshot();
        });

        test('challenge', () => {
            expect(createImage(input.trim(), { x: 25, y: 6 })).toMatchSnapshot();
        });
    });
});
