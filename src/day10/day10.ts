function roundToPrecision(x: number, precision: number) {
    let y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

const countAstroids = (input: Array<Array<string | number>>, position: Array<number>): void => {
    for (let i = 0; i < input.length; i++) {
        xPosition: for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '.') continue;
            if (i === position[1] && j === position[0]) continue;

            const m = (position[1] - i) / (position[0] - j);

            if (!Number.isFinite(m)) {
                const maxY = position[1] < i ? i : position[1];
                const startY = position[1] < i ? position[1] + 1 : i + 1;
                for (let y = startY; y < maxY; y++) {
                    if (y === position[1]) continue;
                    if (y === i) continue;

                    if (input[y][j] !== '.') {
                        continue xPosition;
                    }
                }
            } else {
                const c = position[1] - position[0] * m;

                const maxX = position[0] < j ? j : position[0];
                const startX = position[0] < j ? position[0] + 1 : j + 1;

                for (let x = startX; x < maxX; x++) {
                    let y = m * x + c;
                    y = roundToPrecision(y, 0.01);
                    if (x === position[0] && y === position[1]) continue;
                    if (x === j && y === i) continue;

                    if (Number.isInteger(y) && input[y][x] !== '.') {
                        continue xPosition;
                    }
                }
            }

            const value = input[position[1]][position[0]];

            input[position[1]][position[0]] = value === '#' ? 1 : Number(value) + 1;
        }
    }
};

const calculatePosition = (input: Array<Array<string | number>>) => {
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] !== '.') {
                countAstroids(input, [x, y]);
            }
        }
    }

    let position = [0, 0];

    const result = input.reduce((acc: number, value, y): number => {
        for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === 'number') {
                if (acc < value[i]) {
                    position = [i, y];
                    acc = Number(value[i]);
                }
            }
        }
        return acc;
    }, 0);

    return { position, result };
};

type AstroidMeta = {
    x: number;
    y: number;
    angle: number;
    distance: number;
};

const destroyAstroids = (input: Array<Array<string>>, [x1, y1]: Array<number>) => {
    const asteroids = input
        .reduce((acc: Array<AstroidMeta>, row: Array<string>, y: number): Array<AstroidMeta> => {
            return row.reduce((acc2: Array<AstroidMeta>, value: string, x: number): Array<AstroidMeta> => {
                if (value === '#' && !(x === x1 && y === y1)) {
                    acc2.push({
                        x,
                        y,
                        angle: Math.atan2(y - y1, x - x1) * (180 / Math.PI),
                        distance: Math.hypot(x1 - x, y1 - y),
                    });
                }
                return acc2;
            }, acc);
        }, [])
        .sort((a, b) => a.angle - b.angle);

    const angles = Array.from(new Set(asteroids.map(({ angle }) => angle)));

    let position = angles.indexOf(-90);
    let counter = 0;
    asteroids.sort((a, b) => a.distance - b.distance);

    while (asteroids.length > 0) {
        const asteroid = asteroids
            .filter(({ angle }) => angle === angles[position])
            .sort((a, b) => a.distance - b.distance)[0];

        if (asteroid) {
            asteroids.filter(({ x, y }) => !(x === asteroid.x && y === asteroid.y));

            if (++counter === 200) {
                return asteroid.x * 100 + asteroid.y;
            }
        }

        position = position < asteroids.length ? position + 1 : 0;
    }
};

export { calculatePosition, destroyAstroids };
