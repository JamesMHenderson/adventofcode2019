const nextPosition = (instruction: string, startingPosition: string) => {
    const parsedPosition = startingPosition.split(',').map(x => parseInt(x));
    const position = [];
    const increment = parseInt(instruction.substring(1));

    switch (instruction[0]) {
        case 'R':
            for (let i = 1; i <= increment; i++) {
                const nextPosition = [...parsedPosition];
                nextPosition[0] += i;
                position.push(nextPosition.join(','));
            }
            break;
        case 'L':
            for (let i = 1; i <= increment; i++) {
                const nextPosition = [...parsedPosition];
                nextPosition[0] -= i;
                position.push(nextPosition.join(','));
            }
            break;
        case 'U':
            for (let i = 1; i <= increment; i++) {
                const nextPosition = [...parsedPosition];
                nextPosition[1] += i;
                position.push(nextPosition.join(','));
            }
            break;
        case 'D':
            for (let i = 1; i <= increment; i++) {
                const nextPosition = [...parsedPosition];
                nextPosition[1] -= i;
                position.push(nextPosition.join(','));
            }
            break;
        default:
            throw Error('Invalid instruction');
    }

    return position;
};

const getCoords = (input: string): Array<string> =>
    input.split(',').reduce(
        (acc, value): Array<string> => {
            return acc.concat(nextPosition(value, acc[acc.length - 1]));
        },
        ['0,0'],
    );

const closest = (input1: string, input2: string): number => {
    const coords1 = getCoords(input1);
    const coords2 = getCoords(input2);

    return coords1
        .filter(coord => coords2.includes(coord))
        .map(coord => {
            const values = coord.split(',');
            return Math.abs(Number(values[0])) + Math.abs(Number(values[1]));
        })
        .reduce((acc, value) => (value < acc || acc === 0 ? value : acc));
};

const fewestSteps = (input1: string, input2: string): number => {
    const coords1 = getCoords(input1);
    const coords2 = getCoords(input2);

    return coords1.reduce((acc, coord, index1) => {
        const index2 = coords2.indexOf(coord, 1);
        if (index2 != -1) {
            const steps = index1 + index2;
            return steps < acc || acc === 0 ? steps : acc;
        }

        return acc;
    }, 0);
};

export { closest, fewestSteps };
