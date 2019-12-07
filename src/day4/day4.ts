const checkDigitsAccend = (input: Array<number>) => {
    for (let i = input.length; i > 0; i--) {
        if (input[i] < input[i - 1]) {
            input[i] = input[i - 1];
            return false;
        }
    }

    return true;
};

const numberPasswords = (input1: number, input2: number): number => {
    let count = 0;
    let input: number = input1;

    while (input <= input2) {
        const inputArr = Array.from(input.toString()).map(x => parseInt(x));

        if (!checkDigitsAccend(inputArr)) {
            input = inputArr.reduce((acc, val) => {
                return parseInt(`${acc}${val}`);
            });
            continue;
        }

        if (new Set(inputArr).size !== inputArr.length) {
            count++;
        }

        input++;
    }

    return count;
};

const numberPasswordsPart2 = (input1: number, input2: number): number => {
    let count = 0;
    let input: number = input1;

    while (input <= input2) {
        const inputArr = Array.from(input.toString()).map(x => parseInt(x));

        if (!checkDigitsAccend(inputArr)) {
            input = inputArr.reduce((acc, val) => {
                return parseInt(`${acc}${val}`);
            });
            continue;
        }

        const inputSet = new Set(inputArr);

        if (inputSet.size !== inputArr.length) {
            let i = 0;
            while (i < inputArr.length) {
                const lastIndex = inputArr.lastIndexOf(inputArr[i]);
                if (lastIndex - i === 1) {
                    count++;
                    break;
                }

                i = lastIndex + 1;
            }
        }

        input++;
    }

    return count;
};

export { numberPasswords, numberPasswordsPart2 };
