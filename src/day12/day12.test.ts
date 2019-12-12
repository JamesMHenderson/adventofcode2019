import { Planet } from './day12';

describe('day11', () => {
    describe('part1', () => {
        test('example1', () => {
            const input1 = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

            const planet = new Planet(input1.split('\n'));
            expect(planet.getTotalEnergy(10)).toBe(179);
        });

        test('example2', () => {
            const input1 = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

            const planet = new Planet(input1.split('\n'));
            expect(planet.getTotalEnergy(100)).toBe(1940);
        });

        test('Challenge', () => {
            const input1 = `<x=5, y=-1, z=5>
<x=0, y=-14, z=2>
<x=16, y=4, z=0>
<x=18, y=1, z=16>`;

            const planet = new Planet(input1.split('\n'));
            expect(planet.getTotalEnergy(1000)).toBe(7928);
        });
    });

    describe('part2', () => {
        test('example1', () => {
            const input1 = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;
            const planet = new Planet(input1.split('\n'));

            expect(planet.findDuplicateState()).toBe(2772);
        });

        test('example2', () => {
            const input1 = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

            const planet = new Planet(input1.split('\n'));
            expect(planet.findDuplicateState()).toBe(4686774924);
        });

        test('challenge', () => {
            const input1 = `<x=5, y=-1, z=5>
<x=0, y=-14, z=2>
<x=16, y=4, z=0>
<x=18, y=1, z=16>`;

            const planet = new Planet(input1.split('\n'));
            expect(planet.findDuplicateState()).toBe(518311327635164);
        });
    });
});
