import { positions } from './day11';
import input from './input.txt';

describe('Day 11', () => {
    describe('Part 1', () => {
        test('challenge', () => {
            // not 5654
            expect(Object.keys(positions(input.trim())).length).toBe(1771);
        });

        test('challenge part 2', () => {
            const ship = positions(input.trim(), { '0,0': 1 });

            const shipPos = Object.keys(ship).map(position => position.split(',').map(i => parseInt(i)));

            const minX = shipPos.reduce((acc: number, value: Array<number>) => (value[0] < acc ? value[0] : acc), 0);
            const maxX = shipPos.reduce((acc: number, value: Array<number>) => (value[0] > acc ? value[0] : acc), 0);
            const minY = shipPos.reduce((acc: number, value: Array<number>) => (value[1] < acc ? value[1] : acc), 0);
            const maxY = shipPos.reduce((acc: number, value: Array<number>) => (value[1] > acc ? value[1] : acc), 0);

            const paintedShip = Array(maxY - minY + 1)
                .fill(' ')
                .map(() => [...Array(maxX - minX + 1).fill(' ')]);

            Object.keys(ship).forEach(key => {
                const pos = key.split(',').map(i => parseInt(i));
                paintedShip[pos[1] - minY][pos[0] - minX] = ship[key] === 0 ? ' ' : '#';
            });

            expect(paintedShip.map(row => row.join(''))).toMatchSnapshot();
        });
    });
});