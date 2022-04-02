export const GRID_STEP = 20;
export const MAX_WIDTH = 500;
export const MAX_HEIGHT = 500;
export const GAME_SPEED = 100;
export const MAX_X_COORD = MAX_WIDTH / GRID_STEP;
export const MAX_Y_COORD = MAX_HEIGHT / GRID_STEP;
export const SNAKE_SIDE = 18;
/**
 * @param min - inclusive
 * @param max - exclusive
 * @return integer value
 * */
export function random(min = 0, max = MAX_X_COORD) {
    return GRID_STEP * Math.floor(Math.random() * (max - min) + min) + 1;
}

export const move = (coord) => {
    let newCoord = coord;
    return (shift = 0) => {
        newCoord += shift;
        return GRID_STEP * newCoord + 1;
    };
};

export const counter = (value, container) => {
    let saved = value;
    container.textContent = 0;
    return () => container.textContent = ++saved;
}

export function log(str) {
    console.log(str);
}
