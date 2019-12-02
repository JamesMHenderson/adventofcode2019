const transform = (input: Array<number>): Array<number> => {
    for (let i = 0; i < input.length; i += 4) {
        switch (input[i]) {
            case 1:
                input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
                continue;
            case 2:
                input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
                continue;
            case 99:
                return input;
            default:
                throw new Error('Something went wrong');
        }
    }

    throw new Error('program did not end');
};

const getState = (input: string): string => {
    const inputArray = input.split(',').map(value => Number(value));
    return transform(inputArray).join(',');
};

const transformInput = (input: string): Array<number> => {
    const inputArray = input.split(',').map(value => Number(value));

    inputArray[1] = 12;
    inputArray[2] = 2;

    return transform(inputArray);
};

const findInput = (input: string, value: number): number => {
    const inputArray = input.split(',').map(value => Number(value));

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const transformedInput = [...inputArray];
            transformedInput[1] = i;
            transformedInput[2] = j;
            if (transform(transformedInput)[0] === value) {
                return i * 100 + j;
            }
        }
    }

    throw new Error('Failed to identify values');
};

export { getState, transformInput, findInput };
