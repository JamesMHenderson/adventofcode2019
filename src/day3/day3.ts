const nextPosition = (instruction: string, position: Array<number>, positions: Array<string>) => {
    const increment = parseInt(instruction.substring(1));

    let instructionFunction: (nextPosition: Array<number>) => void = (): void => {
        throw Error('undefined function');
    };

    switch (instruction[0]) {
        case 'R':
            instructionFunction = (nextPosition: Array<number>) => {
                nextPosition[0]++;
            };
            break;
        case 'L':
            instructionFunction = (nextPosition: Array<number>) => {
                nextPosition[0]--;
            };
            break;
        case 'U':
            instructionFunction = (nextPosition: Array<number>) => {
                nextPosition[1]++;
            };
            break;
        case 'D':
            instructionFunction = (nextPosition: Array<number>) => {
                nextPosition[1]--;
            };
            break;
        default:
            throw Error('Invalid instruction');
    }

    for (let i = 1; i <= increment; i++) {
        instructionFunction(position);
        positions.push(position.join(','));
    }
};

const getCoords = (input: string): Array<string> => {
    const position = [0, 0];
    return input.split(',').reduce(
        (acc, value): Array<string> => {
            nextPosition(value, position, acc);
            return acc;
        },
        ['0,0'],
    );
};

const closest = (input1: string, input2: string): number => {
    const coords1 = getCoords(input1);
    const coords2 = getCoords(input2);

    const lookup: { [coord: string]: string } = {};

    coords2.forEach(coords => {
        lookup[coords] = coords;
    });

    return coords1.reduce((acc, coords) => {
        if (!lookup[coords]) return acc;
        const values = coords.split(',');
        const value = Math.abs(Number(values[0])) + Math.abs(Number(values[1]));
        return value < acc || acc === 0 ? value : acc;
    }, 0);
};

const fewestSteps = (input1: string, input2: string): number => {
    const coords1 = getCoords(input1);
    const coords2 = getCoords(input2);

    const lookup: { [coord: string]: number } = {};

    coords2.forEach((coords, i) => {
        lookup[coords] = i;
    });

    return coords1.reduce((acc, coords, index1) => {
        const index2 = lookup[coords];
        if (index2 === undefined) return acc;

        const steps = index1 + index2;
        return steps < acc || acc === 0 ? steps : acc;
    }, 0);
};

export { closest, fewestSteps };
