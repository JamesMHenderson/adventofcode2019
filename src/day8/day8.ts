type Size = {
    x: number;
    y: number;
};

const createImageLayerString = (input: string, { x, y }: Size): Array<string> => {
    const layers = [];
    const layerSize = x * y;

    let i = 0;

    while (i < input.length) {
        layers.push(input.substr(i, layerSize));
        i += layerSize;
    }

    return layers;
};

const checkLayers = (input: string, size: Size): number => {
    const layers = createImageLayerString(input, size);

    const fewest0 = layers.reduce((acc, value) => {
        if (value.split('0').length < acc.split('0').length) {
            return value;
        } else {
            return acc;
        }
    });

    return Array.from(fewest0).filter(x => x === '1').length * Array.from(fewest0).filter(x => x === '2').length;
};

const createImageLayers = (input: string, { x, y }: Size): Array<Array<string>> => {
    const layers: Array<Array<string>> = [];
    const layerSize = x * y;

    let i = 0;

    while (i < input.length) {
        let j = 0;
        const layerInput = input.substr(i, layerSize);
        const layer = [];
        while (j < layerInput.length) {
            layer.push(layerInput.substr(j, x));
            j += x;
        }
        layers.push(layer);
        i += layerSize;
    }

    return layers;
};

const createImage = (input: string, size: Size): Array<string> => {
    const layers = createImageLayers(input, size);
    const image = [];

    for (let j = 0; j < size.y; j++) {
        let layerRow = '';
        for (let i = 0; i < size.x; i++) {
            for (let k in layers) {
                if (layers[k][j][i] !== '2') {
                    layerRow += layers[k][j][i] === '0' ? '.' : '#';
                    break;
                }
            }
        }
        image.push(layerRow);
    }

    return image;
};

export { createImageLayers, checkLayers, createImage };
