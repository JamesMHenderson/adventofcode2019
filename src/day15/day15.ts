import { IntcodeComputer } from '../intcodeComputer';

type Map = {
    [location: string]: string;
};

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

const mapShip = (input: string, map: Map) => {
    const intcodeComputer = new IntcodeComputer(input);

    type Location = {
        position: Array<number>;
        state: Array<number>;
    };

    let currentLocations: Array<Location> = [
        {
            position: [0, 0],
            state: [...intcodeComputer.state],
        },
    ];
    let oxygenLocation = [0, 0];
    map['0,0'] = '.';

    const getNextMapStep = () => {
        currentLocations = currentLocations.reduce((acc: Array<Location>, { position, state }: Location) => {
            const locations: { [key: number]: Array<number> } = {
                1: [position[0], position[1] + 1],
                2: [position[0], position[1] - 1],
                3: [position[0] - 1, position[1]],
                4: [position[0] + 1, position[1]],
            };

            for (let i = 1; i < 5; i++) {
                if (map[locations[i].join(',')]) continue;
                intcodeComputer.state = [...state];
                intcodeComputer.addInput(i);
                intcodeComputer.run();
                switch (intcodeComputer.output) {
                    case 0:
                        map[locations[i].join(',')] = '#';
                        break;
                    case 1:
                        acc.push({ position: locations[i], state: [...intcodeComputer.state] });
                        map[locations[i].join(',')] = '.';
                        break;
                    case 2:
                        oxygenLocation = [...locations[i]];
                        acc.push({ position: locations[i], state: [...intcodeComputer.state] });
                        map[locations[i].join(',')] = 'O';
                        break;
                    default:
                        throw Error('Unknown output');
                }
            }

            return acc;
        }, []);
    };

    while (currentLocations.length > 0) {
        getNextMapStep();
    }

    return oxygenLocation;
};

const getRoute = (input: string) => {
    const map: Map = {};
    mapShip(input, map);
    const startLocation = [0, 0];

    let currentLocations = [[...startLocation]];
    let count = 0;
    let found = false;

    const checkPosition = () => {
        currentLocations = currentLocations.reduce((acc: Array<Array<number>>, currentLocation: Array<number>) => {
            const locations: { [key: string]: Array<number> } = {
                1: [currentLocation[0], currentLocation[1] + 1],
                2: [currentLocation[0], currentLocation[1] - 1],
                3: [currentLocation[0] - 1, currentLocation[1]],
                4: [currentLocation[0] + 1, currentLocation[1]],
            };

            const values: { [key: string]: string } = {
                1: map[locations[1].join(',')],
                2: map[locations[2].join(',')],
                3: map[locations[3].join(',')],
                4: map[locations[4].join(',')],
            };

            const current = currentLocation.join(',');
            map[current] = 'x';

            const oxygen = Object.values(values).some(value => value === 'O');

            const open = Object.keys(values).filter(key => values[key] === '.' || values[key] === 'O');

            if (oxygen) {
                found = true;
            }

            if (open.length === 0) {
                return acc;
            }

            open.forEach(key => acc.push(locations[key]));

            return acc;
        }, []);
    };

    while (!found) {
        checkPosition();
        count++;
    }

    return count;
};

const fillOxygen = (input: string) => {
    const map: Map = {};
    const startLocation = mapShip(input, map);

    let currentLocations = [[...startLocation]];
    let count = 0;

    const checkPosition = () => {
        currentLocations = currentLocations.reduce((acc: Array<Array<number>>, currentLocation: Array<number>) => {
            const locations: { [key: string]: Array<number> } = {
                1: [currentLocation[0], currentLocation[1] + 1],
                2: [currentLocation[0], currentLocation[1] - 1],
                3: [currentLocation[0] - 1, currentLocation[1]],
                4: [currentLocation[0] + 1, currentLocation[1]],
            };

            const values: { [key: string]: string } = {
                1: map[locations[1].join(',')],
                2: map[locations[2].join(',')],
                3: map[locations[3].join(',')],
                4: map[locations[4].join(',')],
            };

            const current = currentLocation.join(',');
            map[current] = 'O';

            const open = Object.keys(values).filter(key => values[key] === '.');

            if (open.length === 0) {
                return acc;
            }

            open.forEach(key => acc.push(locations[key]));

            return acc;
        }, []);
    };

    while (currentLocations.length > 0) {
        checkPosition();
        count++;
    }

    return count - 1;
};

export { mapShip, getRoute, fillOxygen };
