const transform = (input: Array<number>, inputValue: number): Array<number> => {
    const outputs: Array<number> = [];

    let i = 0;

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
                input[input[i + 1]] = inputValue;
                i += 2;
                break;
            case '04':
                outputs.push(value1);
                i += 2;
                break;
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
                return outputs;
            default:
                throw new Error('Something went wrong');
        }
    }

    throw new Error('program did not end');
};

const getOutput = (input: string, inputValue: number): number => {
    const inputArray = input.split(',').map(value => Number(value));

    const outputs = transform(inputArray, inputValue);

    return outputs[outputs.length - 1];
};

export { getOutput };
