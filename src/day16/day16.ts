const fftLoop = (input: string, phases: number) => {
    let inputArr = input.split('').map(Number);
    const basePattern = [0, 1, 0, -1];
    let count = 0;

    while (count < phases) {
        inputArr = inputArr.map((value, index, arr) => {
            let sum = 0;
            for (let i = index; i < arr.length; i += (index + 1) * 2) {
                const baseIndex = Math.floor(((i + 1) / (index + 1)) % 4);
                sum +=
                    arr.slice(i, Math.min(i + index + 1, arr.length)).reduce((acc, value) => acc + value) *
                    basePattern[baseIndex];
            }
            return Math.abs(sum) % 10;
        });

        count++;
    }

    return inputArr.join('');
};

const fftLoop2 = (input: string, phases: number) => {
    let inputArr = input.split('').map(Number);
    let count = 0;

    while (count < phases) {
        for (let i = inputArr.length - 1; i >= 0; i--) {
            inputArr[i] = ((inputArr[i + 1] || 0) + inputArr[i]) % 10;
        }

        count++;
    }

    return inputArr.join('');
};

const largeFftLoop = (input: string) => {
    const offset = Number(input.substr(0, 7));
    const inputString = input.repeat(10000);
    return fftLoop2(inputString.substring(offset), 100).substr(0, 8);
};

export { fftLoop, largeFftLoop };
