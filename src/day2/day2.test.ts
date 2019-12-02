import { findInput, getState, transformInput } from './day2';
import input from './input.txt';

describe('day 2', () => {
    test('1,9,10,3,2,3,11,0,99,30,40,50', () => {
        expect(getState('1,9,10,3,2,3,11,0,99,30,40,50')).toBe('3500,9,10,70,2,3,11,0,99,30,40,50');
    });

    test('part 1 examples', () => {
        expect(getState('1,0,0,0,99')).toBe('2,0,0,0,99');
        expect(getState('2,3,0,3,99')).toBe('2,3,0,6,99');
        expect(getState('2,4,4,5,99,0')).toBe('2,4,4,5,99,9801');
        expect(getState('1,1,1,4,99,5,6,0,99')).toBe('30,1,1,4,2,5,6,0,99');
    });

    test('part1', () => {
        expect(transformInput(input)[0]).toBe(4330636);
    });

    test('part2', () => {
        console.log(findInput(input, 19690720));
    });
});