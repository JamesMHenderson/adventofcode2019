import { lcm } from 'mathjs';

enum Axis {
    X = 'x',
    Y = 'y',
    Z = 'z',
}

class Moon {
    constructor(position: string) {
        const posArr = position.split(',').map(position => {
            const indexEq = position.indexOf('=');
            const indexCom = position.indexOf('>');
            return parseInt(position.substring(indexEq + 1, indexCom === -1 ? undefined : indexCom));
        });
        this.pX = posArr[0];
        this.pY = posArr[1];
        this.pZ = posArr[2];
    }

    pX: number;
    pY: number;
    pZ: number;

    vX = 0;
    vY = 0;
    vZ = 0;

    incrementVelocity(axis: Axis, value: number) {
        switch (axis) {
            case Axis.Z:
                this.vZ += value;
                return;
            case Axis.X:
                this.vX += value;
                return;
            case Axis.Y:
                this.vY += value;
                return;
        }
    }

    position(axis: Axis) {
        switch (axis) {
            case Axis.Z:
                return this.pZ;
            case Axis.X:
                return this.pX;
            case Axis.Y:
                return this.pY;
        }
    }

    move() {
        this.moveX();
        this.moveY();
        this.moveZ();
    }

    moveX() {
        this.pX += this.vX;
    }

    moveY() {
        this.pY += this.vY;
    }

    moveZ() {
        this.pZ += this.vZ;
    }

    calculateEnergy(): number {
        return (
            (Math.abs(this.pX) + Math.abs(this.pY) + Math.abs(this.pZ)) *
            (Math.abs(this.vX) + Math.abs(this.vY) + Math.abs(this.vZ))
        );
    }
}

const compare = (current: number, other: number): number => {
    if (current > other) return -1;
    if (current === other) return 0;
    if (current < other) return 1;

    throw Error('invalid');
};

class Planet {
    constructor(moons: Array<string>) {
        moons.forEach(moon => this.moons.push(new Moon(moon)));
    }

    moons: Array<Moon> = [];

    getNewPositions() {
        for (let i = 0; i < this.moons.length; i++) {
            for (let j = i + 1; j < this.moons.length; j++) {
                const moon1 = this.moons[i];
                const moon2 = this.moons[j];
                const z = compare(moon1.pZ, moon2.pZ);
                moon1.vZ += z;
                moon2.vZ -= z;
                const x = compare(moon1.pX, moon2.pX);
                moon1.vX += x;
                moon2.vX -= x;
                const y = compare(moon1.pY, moon2.pY);
                moon1.vY += y;
                moon2.vY -= y;
            }
        }

        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].move();
        }
    }

    getNewPosition(axis: Axis) {
        for (let i = 0; i < this.moons.length; i++) {
            for (let j = i + 1; j < this.moons.length; j++) {
                const moon1 = this.moons[i];
                const moon2 = this.moons[j];
                const value = compare(moon1.position(axis), moon2.position(axis));
                moon1.incrementVelocity(axis, value);
                moon2.incrementVelocity(axis, -value);
            }
        }
    }

    getNewPositionsZ() {
        this.getNewPosition(Axis.Z);

        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].moveZ();
        }
    }

    getNewPositionsX() {
        this.getNewPosition(Axis.X);

        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].moveX();
        }
    }

    getNewPositionsY() {
        this.getNewPosition(Axis.Y);

        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].moveY();
        }
    }

    findDuplicateState() {
        let countX = 0;
        let countY = 0;
        let countZ = 0;

        while (true) {
            this.getNewPositionsX();
            countX++;
            if (this.moons.every(moon => moon.vX === 0)) break;
        }

        while (true) {
            this.getNewPositionsY();
            countY++;
            if (this.moons.every(moon => moon.vY === 0)) break;
        }

        while (true) {
            this.getNewPositionsZ();
            countZ++;
            if (this.moons.every(moon => moon.vZ === 0)) break;
        }

        return 2 * lcm(countX, lcm(countY, countZ));
    }

    getTotalEnergy(time: number): number {
        let count = 0;

        while (count < time) {
            this.getNewPositions();
            count++;
        }

        return this.moons.reduce((acc, moon) => acc + moon.calculateEnergy(), 0);
    }
}

export { Planet };
