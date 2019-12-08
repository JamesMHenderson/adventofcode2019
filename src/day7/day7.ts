import { IntcodeComputer } from '../intcodeComputer';

const getOutput = (input: string, inputValue: number, phases: Array<number>, loop: boolean): number => {
    const intcodeComputers: Array<IntcodeComputer> = [];

    const firstIntcode = new IntcodeComputer(input, phases[0], inputValue);

    intcodeComputers.push(firstIntcode);

    for (let i = 1; i < phases.length; i++) {
        const state = Object.assign(new IntcodeComputer(), { state: [...firstIntcode.state], input: [phases[i]] });
        intcodeComputers.push(state);
    }

    while (true) {
        for (let i = 0; i < phases.length; i++) {
            const intcodeComputer = intcodeComputers[i];
            intcodeComputer.run();
            intcodeComputers[(i + 1) % phases.length].addInput(intcodeComputer.output);
            if (i + 1 === phases.length && (!loop || intcodeComputer.finished)) {
                return intcodeComputer.output;
            }
        }
    }
};

const getHighestOutput = (input: string) => {
    let iterations = [[0], [1], [2], [3], [4]];

    for (let i = 0; i < 4; i++) {
        iterations = getIterations(iterations, 4, 0);
    }

    return iterations.reduce((acc, phases) => {
        const output = getOutput(input, 0, phases, false);
        return output > acc ? output : acc;
    }, 0);
};

const getHighestLoopOutput = (input: string) => {
    let iterations = [[5], [6], [7], [8], [9]];

    for (let i = 0; i < 4; i++) {
        iterations = getIterations(iterations, 9, 5);
    }

    return iterations.reduce((acc, phases) => {
        const output = getOutput(input, 0, phases, true);
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
