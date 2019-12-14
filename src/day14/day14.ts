type Chemicals = {
    [chemical: string]: number;
};

type Reaction = {
    output: number;
    input: Chemicals;
};

const getReactions = (input: Array<string>) => {
    const reactions: { [output: string]: Reaction } = {};
    input.forEach(reactionInput => {
        const reaction: Reaction = {
            output: 0,
            input: {},
        };

        const parts = reactionInput.split('=>');

        const output = parts[1].trim().split(' ');
        reaction.output = parseInt(output[0]);

        parts[0]
            .trim()
            .split(',')
            .forEach(input => {
                const inputArr = input.trim().split(' ');
                reaction.input[inputArr[1]] = parseInt(inputArr[0]);
            });

        reactions[output[1]] = reaction;
    });

    return reactions;
};

const calculateOre = (input: Array<string>) => {
    const reactions = getReactions(input);

    const requiredChemicals: { [chemical: string]: number } = {
        FUEL: 1,
    };

    const additionalChemicals: { [chemical: string]: number } = {};

    while (true) {
        const chemicals = Object.keys(requiredChemicals);
        if (chemicals.length === 1 && chemicals[0] === 'ORE') break;

        chemicals.forEach(chemical => {
            if (chemical === 'ORE') return;
            let noRequired = requiredChemicals[chemical];
            delete requiredChemicals[chemical];

            const reaction = reactions[chemical];

            if (additionalChemicals[chemical]) {
                while (additionalChemicals[chemical] > 0 && noRequired > 0) {
                    noRequired--;
                    additionalChemicals[chemical]--;
                }
            }

            const noReactions = Math.ceil(noRequired / reaction.output);
            const additional = reaction.output * noReactions - noRequired;
            additionalChemicals[chemical] = (additionalChemicals[chemical] || 0) + additional;

            Object.entries(reaction.input).forEach(([key, value]) => {
                requiredChemicals[key] = (requiredChemicals[key] || 0) + value * noReactions;
            });
        });
    }

    return requiredChemicals.ORE;
};

const calculateFuel = (input: Array<string>, noOre: number) => {
    const reactions = getReactions(input);

    const singleFuel = calculateOre(input);

    let count = Math.floor(noOre / singleFuel);

    const requiredChemicals: { [chemical: string]: number } = {
        FUEL: count,
    };

    const additionalChemicals: { [chemical: string]: number } = {};

    while (true) {
        const chemicals = Object.keys(requiredChemicals);
        if (chemicals.length === 1 && chemicals[0] === 'ORE') {
            if (requiredChemicals.ORE > noOre) {
                return count - 1;
            }

            const noFuel = Math.floor((noOre - requiredChemicals.ORE) / singleFuel);
            requiredChemicals.FUEL = noFuel || 1;
            count += noFuel || 1;
            continue;
        }

        chemicals.forEach(chemical => {
            if (chemical === 'ORE') return;
            let noRequired = requiredChemicals[chemical];
            delete requiredChemicals[chemical];

            const reaction = reactions[chemical];

            if (additionalChemicals[chemical]) {
                while (additionalChemicals[chemical] > 0 && noRequired > 0) {
                    noRequired--;
                    additionalChemicals[chemical]--;
                }
            }

            const noReactions = Math.ceil(noRequired / reaction.output);
            const additional = reaction.output * noReactions - noRequired;
            additionalChemicals[chemical] = (additionalChemicals[chemical] || 0) + additional;

            Object.entries(reaction.input).forEach(([key, value]) => {
                requiredChemicals[key] = (requiredChemicals[key] || 0) + value * noReactions;
            });
        });
    }
};

export { calculateOre, calculateFuel };
