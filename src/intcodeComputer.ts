class IntcodeComputer {
    constructor(state?: string, ...input: Array<number>) {
        this.state = state ? state.split(',').map(value => Number(value)) : [];
        this.input = input;
    }

    transform(value1: number, value2: number) {
        this.state[1] = value1;
        this.state[2] = value2;
    }

    addInput(value: number) {
        this.input.push(value);
    }

    endProgram() {
        this._finished = true;
    }

    private startProgram() {
        if (this._finished) this.index = 0;
        this._finished = false;
    }

    increment(steps: number) {
        this.index += steps;
    }

    private _finished: boolean = false;
    private index: number = 0;
    private inputIndex: number = 0;

    get finished() {
        return this._finished;
    }

    public state: Array<number>;

    public input: Array<number>;
    public output: number = 0;

    private get instruction() {
        return '00000' + this.state[this.index].toString();
    }

    private get firstValue() {
        return this.instruction.substr(-3, 1) === '1'
            ? this.state[this.index + 1]
            : this.state[this.state[this.index + 1]];
    }

    private get secondValue() {
        return this.instruction.substr(-4, 1) === '1'
            ? this.state[this.index + 2]
            : this.state[this.state[this.index + 2]];
    }

    private sum() {
        this.state[this.state[this.index + 3]] = this.firstValue + this.secondValue;
        this.increment(4);
    }

    private multiply() {
        this.state[this.state[this.index + 3]] = this.firstValue * this.secondValue;
        this.increment(4);
    }

    private update() {
        this.state[this.state[this.index + 1]] = this.input[this.inputIndex];
        this.inputIndex++;
        this.increment(2);
    }

    private outputValue() {
        this.output = this.firstValue;
        this.increment(2);
    }

    private jumpTrue() {
        this.firstValue ? (this.index = this.secondValue) : this.increment(3);
    }

    private jumpFalse() {
        this.firstValue ? this.increment(3) : (this.index = this.secondValue);
    }

    private lessThan() {
        this.state[this.state[this.index + 3]] = this.firstValue < this.secondValue ? 1 : 0;
        this.increment(4);
    }

    private equals() {
        this.state[this.state[this.index + 3]] = this.firstValue === this.secondValue ? 1 : 0;
        this.increment(4);
    }

    run() {
        this.startProgram();

        while (this.index < this.state.length) {
            switch (this.instruction.substr(-2)) {
                case '01':
                    this.sum();
                    break;
                case '02':
                    this.multiply();
                    break;
                case '03':
                    this.update();
                    break;
                case '04':
                    this.outputValue();
                    return;
                case '05':
                    this.jumpTrue();
                    break;
                case '06':
                    this.jumpFalse();
                    break;
                case '07':
                    this.lessThan();
                    break;
                case '08':
                    this.equals();
                    break;
                case '99':
                    this.endProgram();
                    return;
                default:
                    throw new Error('Something went wrong');
            }
        }
    }
}

export { IntcodeComputer };
