import { IntcodeComputer } from '../intcodeComputer';

const getOutput = (input: string, inputValue: number): number => {
    const intcodeComputer = new IntcodeComputer(input, inputValue);
    while (!intcodeComputer.finished) {
        intcodeComputer.run();
    }
    return intcodeComputer.output;
};

export { getOutput };
