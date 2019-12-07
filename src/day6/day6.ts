type Orbits = {
    [orbit: string]: string;
};

type Orbitted = {
    [orbit: string]: Array<string>;
};

const map = (input: Array<string>): Orbits => {
    return input.reduce((acc: Orbits, value: string) => {
        const orbits: Array<string> = value.split(')');
        acc[orbits[1]] = orbits[0];
        return acc;
    }, {});
};

const mapReverse = (input: Array<string>): Orbitted => {
    return input.reduce((acc: Orbitted, value: string) => {
        const orbits: Array<string> = value.split(')');
        if (!acc[orbits[0]]) {
            acc[orbits[0]] = [];
        }
        acc[orbits[0]].push(orbits[1]);
        return acc;
    }, {});
};

const countOrbits = (input: Array<string>) => {
    const orbits = map(input);
    const start = 'COM';
    let orbitCount = 0;

    Object.keys(orbits).forEach(orbit => {
        let position = orbit;
        while (true) {
            orbitCount++;
            position = orbits[position];
            if (position === start) {
                break;
            }
        }
    });

    return orbitCount;
};

const findRoute = (input: Array<string>) => {
    const orbits = map(input);
    const start = 'YOU';
    const finish = 'SAN';

    const startToCOM = [];

    let currentPosition = start;

    while (true) {
        currentPosition = orbits[currentPosition];
        startToCOM.push(currentPosition);
        if (currentPosition === 'COM') {
            break;
        }
    }

    currentPosition = finish;
    const endToCOM: Array<string> = [];

    while (true) {
        currentPosition = orbits[currentPosition];
        endToCOM.push(currentPosition);
        if (currentPosition === 'COM') {
            break;
        }
    }

    const firstShared = startToCOM.find(po => endToCOM.includes(po));
    if (!firstShared) throw new Error('An error occurred');
    return startToCOM.indexOf(firstShared) + endToCOM.indexOf(firstShared);
};

export { countOrbits, findRoute };
