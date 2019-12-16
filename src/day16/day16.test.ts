import { fftLoop, largeFftLoop } from './day16';
import input from './input.txt';

describe('Day 16', () => {
    describe('Part 1', () => {
        test('example 1', () => {
            expect(fftLoop('12345678', 1)).toBe('48226158');
        });

        test('example 2', () => {
            expect(fftLoop('80871224585914546619083218645595', 100).substr(0, 8)).toBe('24176176');
        });

        test('example 3', () => {
            expect(fftLoop('19617804207202209144916044189917', 100).substr(0, 8)).toBe('73745418');
        });

        test('example 4', () => {
            expect(fftLoop('69317163492948606335995924319873', 100).substr(0, 8)).toBe('52432133');
        });

        test('challenge', () => {
            expect(fftLoop(input.trim(), 100).substr(0, 8)).toBe('19944447');
        });
    });

    describe('Part 2', () => {
        test('example 1', () => {
            expect(largeFftLoop('03036732577212944063491565474664')).toBe('84462026');
        });

        test('challenge', () => {
            expect(largeFftLoop(input.trim())).toBe('81207421');
        });
    });
});
