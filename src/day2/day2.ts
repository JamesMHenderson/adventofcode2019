import { IntcodeComputer } from '../intcodeComputer';

const getState = (input: string): string => {
    const intcodeComputer = new IntcodeComputer(input);
    intcodeComputer.run();
    return intcodeComputer.state.join(',');
};

const transformInput = (input: string): Array<number> => {
    const intcodeComputer = new IntcodeComputer(input);
    intcodeComputer.transform(12, 2);
    intcodeComputer.run();
    return intcodeComputer.state;
};

const findInput = (input: string, value: number): number => {
    const intcodeComputer = new IntcodeComputer(input);

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const transformedIntcode = Object.assign(new IntcodeComputer(), { state: [...intcodeComputer.state] });
            transformedIntcode.transform(i, j);
            transformedIntcode.run();
            if (transformedIntcode.state[0] === value) {
                return i * 100 + j;
            }
        }
    }

    throw new Error('Failed to identify values');
};

export { getState, transformInput, findInput };
