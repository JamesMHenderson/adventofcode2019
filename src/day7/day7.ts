type State = {
    index: number;
    input: Array<number>;
    inputIndex: number;
    inputValues: Array<number>;
    output: number;
};

const transform = (state: State) => {
    let { index: i, inputIndex, inputValues, input } = state;

    while (i < input.length) {
        const instruction = '0000' + input[i].toString();
        const value1 = instruction.substr(-3, 1) === '1' ? input[i + 1] : input[input[i + 1]];
        const value2 = instruction.substr(-4, 1) === '1' ? input[i + 2] : input[input[i + 2]];

        switch (instruction.substr(-2)) {
            case '01':
                input[input[i + 3]] = value1 + value2;
                i += 4;
                break;
            case '02':
                input[input[i + 3]] = value1 * value2;
                i += 4;
                break;
            case '03':
                input[input[i + 1]] = inputValues[inputIndex];
                inputIndex++;
                i += 2;
                break;
            case '04':
                i += 2;
                state.index = i;
                state.inputIndex = inputIndex;
                state.output = value1;
                return;
            case '05':
                if (value1) {
                    i = value2;
                } else {
                    i += 3;
                }
                break;
            case '06':
                if (!value1) {
                    i = value2;
                } else {
                    i += 3;
                }
                break;
            case '07':
                if (value1 < value2) {
                    input[input[i + 3]] = 1;
                } else {
                    input[input[i + 3]] = 0;
                }
                i += 4;
                break;
            case '08':
                if (value1 === value2) {
                    input[input[i + 3]] = 1;
                } else {
                    input[input[i + 3]] = 0;
                }
                i += 4;
                break;
            case '99':
                state.index = 0;
                return;
            default:
                throw new Error('Something went wrong');
        }
    }

    throw new Error('program did not end');
};

const getOutput = (input: Array<number>, inputValue: number, phases: Array<number>, loop: boolean): number => {
    const states: Array<State> = [];

    for (let i = 0; i < phases.length; i++) {
        const inputValues = [phases[i]];
        if (i === 0) inputValues.push(inputValue);

        states.push({
            input: [...input],
            index: 0,
            inputValues,
            inputIndex: 0,
            output: 0,
        });
    }

    while (true) {
        for (let i = 0; i < phases.length; i++) {
            const state = states[i];
            transform(state);
            states[(i + 1) % phases.length].inputValues.push(state.output);
            if (i + 1 === phases.length && (!loop || state.index === 0)) {
                return state.output;
            }
        }
    }
};

const getHighestOutput = (input: string) => {
    const inputArray = input.split(',').map(value => Number(value));

    let iterations = [[0], [1], [2], [3], [4]];

    for (let i = 0; i < 4; i++) {
        iterations = getIterations(iterations, 4, 0);
    }

    return iterations.reduce((acc, phases) => {
        const output = getOutput(inputArray, 0, phases, false);
        return output > acc ? output : acc;
    }, 0);
};

const getHighestLoopOutput = (input: string) => {
    const inputArray = input.split(',').map(value => Number(value));

    let iterations = [[5], [6], [7], [8], [9]];

    for (let i = 0; i < 4; i++) {
        iterations = getIterations(iterations, 9, 5);
    }

    return iterations.reduce((acc, phases) => {
        const output = getOutput(inputArray, 0, phases, true);
        return output > acc ? output : acc;
    }, 0);
};

const getIterations = (iterations: Array<Array<number>>, highest: number, lowest: number) => {
    return iterations.reduce((acc: Array<Array<number>>, iteration: Array<number>) => {
        for (let i = lowest; i <= highest; i++) {
            const newIteration = [...iteration, i];
            if (newIteration.length === new Set(newIteration).size) {
                acc.push(newIteration);
            }
        }
        return acc;
    }, []);
};

export { getHighestOutput, getHighestLoopOutput };
