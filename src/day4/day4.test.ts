import { numberPasswords, numberPasswordsPart2 } from './day4';

describe('day4', () => {
    describe('part1', () => {
        test('111111', () => {
            expect(numberPasswords(111111, 111111)).toBe(1);
        });

        test('223450', () => {
            expect(numberPasswords(223450, 223450)).toBe(0);
        });

        test('123789', () => {
            expect(numberPasswords(123789, 123789)).toBe(0);
        });

        test('part1', () => {
            expect(numberPasswords(256310, 732736)).toBe(979);
        });
    });

    describe('part2', () => {
        test('112233', () => {
            expect(numberPasswordsPart2(112233, 112233)).toBe(1);
        });

        test('123444', () => {
            expect(numberPasswordsPart2(123444, 123444)).toBe(0);
        });

        test('111122', () => {
            expect(numberPasswordsPart2(111122, 111122)).toBe(1);
        });

        test('part1', () => {
            expect(numberPasswordsPart2(256310, 732736)).toBe(635);
        });
    });
});
