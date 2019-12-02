import { calculateTotal, calculateMass, calculateFuelMass, calculateTotalFuelMass } from './day1';
import input from './input.txt';

describe('Day 1', () => {
    test('mass of 12 requires 2 fuel', () => {
        expect(calculateMass(12)).toBe(2);
    });

    test('mass of 14 requires 2 fuel', () => {
        expect(calculateMass(14)).toBe(2);
    });

    test('mass of 1969 requires 654 fuel', () => {
        expect(calculateMass(1969)).toBe(654);
    });

    test('mass of 100756 requires 33583 fuel', () => {
        expect(calculateMass(100756)).toBe(33583);
    });

    test('total mass, 12 & 14', () => {
        expect(calculateTotal([12, 14, 100756])).toBe(33587);
    });

    test('total mass', () => {
        const masses = input.split('\r\n').filter(row => row!);
        expect(calculateTotal(masses.map(mass => Number(mass)))).toBe(3402609);
    });

    test('calculate fuel mass', () => {
        expect(calculateFuelMass(14)).toBe(2);
        expect(calculateFuelMass(1969)).toBe(966);
        expect(calculateFuelMass(100756)).toBe(50346);
    });

    test('calculate total fuel mass', () => {
        const masses = input.split('\r\n');
        expect(calculateTotalFuelMass(masses.map(mass => Number(mass)))).toBe(5101025);
    });
});
