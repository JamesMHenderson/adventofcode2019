import testInput from './testInput.txt';
import testInput2 from './testInput2.txt';
import input from './Input.txt';
import { countOrbits, findRoute } from './day6';

describe('day 6', () => {
    test('example', () => {
        const orbits = testInput.split('\r\n');
        expect(countOrbits(orbits)).toBe(42);
    });

    test('part1', () => {
        const orbits = input.split('\r\n');
        expect(countOrbits(orbits)).toBe(241064);
    });

    test('example part2', () => {
        const orbits = testInput2.split('\r\n');
        expect(findRoute(orbits)).toBe(4);
    });

    test('part2', () => {
        const orbits = input.split('\r\n');
        expect(findRoute(orbits)).toBe(418);
    });
});
