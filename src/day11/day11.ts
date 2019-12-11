import { IntcodeComputer } from '../intcodeComputer';

const positions = (input: string, shipStart: { [position: string]: number } = {}) => {
    let direction = 0;
    const currentPosition = [0, 0];

    const ship: { [position: string]: number } = shipStart;

    const changeDirection = (rotation: number) => {
        if (rotation === 0) {
            direction--;
            if (direction < 0) direction = 3;
        } else if (rotation === 1) {
            direction++;
            direction = direction % 4;
        } else {
            throw new Error('Error');
        }
    };

    const updatePosition = (rotation: number) => {
        changeDirection(rotation);

        switch (direction) {
            case 0:
                currentPosition[1]++;
                break;
            case 1:
                currentPosition[0]++;
                break;
            case 2:
                currentPosition[1]--;
                break;
            case 3:
                currentPosition[0]--;
                break;
            default:
                throw new Error('Invalid direction');
        }
    };

    const intcodeComputer = new IntcodeComputer(input);

    while (!intcodeComputer.finished) {
        const position = currentPosition.join(',');
        const currentColour = ship[position] || 0;
        intcodeComputer.addInput(currentColour);
        intcodeComputer.run();
        ship[position] = intcodeComputer.output;
        intcodeComputer.run();
        updatePosition(intcodeComputer.output);
    }

    return ship;
};

export { positions };
