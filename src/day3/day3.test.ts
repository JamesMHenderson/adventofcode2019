import { closest, fewestSteps } from './day3';
import input from './input.txt';

describe('Day 3', () => {
    test('part1 examples', () => {
        expect(closest('R8,U5,L5,D3', 'U7,R6,D4,L4')).toBe(6);
        expect(closest('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toBe(159);
        expect(closest('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toBe(
            135,
        );
    });

    test('part 1', () => {
        const inputArr = input.split('\r\n');
        expect(closest(inputArr[0], inputArr[1])).toBe(5319);
    });

    test('part2 examples', () => {
        expect(fewestSteps('R8,U5,L5,D3', 'U7,R6,D4,L4')).toBe(30);
        expect(fewestSteps('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toBe(610);
        expect(fewestSteps('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toBe(
            410,
        );
    });

    test('part 2', () => {
        const inputArr = input.split('\r\n');
        expect(fewestSteps(inputArr[0], inputArr[1])).toBe(122514);
    });
});
