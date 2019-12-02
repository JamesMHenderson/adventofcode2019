const calculateMass = (mass: number): number => {
    return Math.floor(mass / 3) - 2;
};

const calculateFuelMass = (mass: number): number => {
    let fuel = 0;
    let nextMass = mass;
    while (true) {
        nextMass = calculateMass(nextMass);
        if (nextMass <= 0) {
            break;
        }
        fuel += nextMass;
    }

    return fuel;
};

const calculateTotal = (masses: Array<number>): number => {
    return masses.reduce((acc, value): number => {
        return acc + calculateMass(value);
    }, 0);
};

const calculateTotalFuelMass = (masses: Array<number>): number => {
    return masses.reduce((acc, value): number => {
        return acc + calculateFuelMass(value);
    }, 0);
};

export { calculateMass, calculateTotal, calculateFuelMass, calculateTotalFuelMass };
