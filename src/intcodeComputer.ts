class IntcodeComputer {
    constructor(state?: string, ...input: Array<number>) {
        this.state = state?.split(',').map(value => Number(value)) || [];
        this.input = input;
    }

    private _finished = false;
    private index = 0;
    private inputIndex = 0;
    private relativeBase = 0;

    transform(value1: number, value2: number) {
        this.state[1] = value1;
        this.state[2] = value2;
    }

    addInput(value: number) {
        this.input.push(value);
    }

    public state: Array<number>;
    public input: Array<number>;
    public outputs: Array<number> = [];

    get output(): number {
        return this.outputs[this.outputs.length - 1];
    }

    get finished(): boolean {
        return this._finished;
    }

    private increment(steps: number): void {
        this.index += steps;
    }

    private instruction(start: number, length?: number): string {
        return ('00000' + this.state[this.index].toString()).substr(start, length);
    }

    private position(i: number): number {
        switch (this.instruction(-(i + 2), 1)) {
            case '1':
                return this.index + i;
            case '2':
                return (this.state[this.index + i] || 0) + this.relativeBase;
            default:
                return this.state[this.index + i] || 0;
        }
    }

    private value(i: number): number {
        return this.state[this.position(i)] || 0;
    }

    private sum(): void {
        this.state[this.position(3)] = this.value(1) + this.value(2);
        this.increment(4);
    }

    private multiply(): void {
        this.state[this.position(3)] = this.value(1) * this.value(2);
        this.increment(4);
    }

    private update(): void {
        this.state[this.position(1)] = this.input[this.inputIndex];
        this.inputIndex++;
        this.increment(2);
    }

    private outputValue(): void {
        this.outputs.push(this.value(1));
        this.increment(2);
    }

    private jumpTrue(): void {
        this.value(1) ? (this.index = this.value(2)) : this.increment(3);
    }

    private jumpFalse(): void {
        this.value(1) ? this.increment(3) : (this.index = this.value(2));
    }

    private lessThan(): void {
        this.state[this.position(3)] = this.value(1) < this.value(2) ? 1 : 0;
        this.increment(4);
    }

    private equals(): void {
        this.state[this.position(3)] = this.value(1) === this.value(2) ? 1 : 0;
        this.increment(4);
    }

    private updateRelativeBase(): void {
        this.relativeBase += this.value(1);
        this.increment(2);
    }

    private endProgram(): void {
        this._finished = true;
    }

    private startProgram(): void {
        if (this._finished) this.index = 0;
        this._finished = false;
    }

    private instructionObj: { [instruction: string]: () => void } = {
        '01': this.sum,
        '02': this.multiply,
        '03': this.update,
        '04': this.outputValue,
        '05': this.jumpTrue,
        '06': this.jumpFalse,
        '07': this.lessThan,
        '08': this.equals,
        '09': this.updateRelativeBase,
        '99': this.endProgram,
    };

    run(toEnd: boolean = false): void {
        this.startProgram();

        while (!this.finished) {
            const instruction = this.instructionObj[this.instruction(-2)];
            if (!instruction) throw new Error('Something went wrong');

            instruction.bind(this)();

            if (instruction === this.outputValue && !toEnd) return;
        }
    }
}

export { IntcodeComputer };
