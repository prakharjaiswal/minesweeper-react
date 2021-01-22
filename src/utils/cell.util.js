let isFlagged = cell => cell.flagged;
let setFlag = (cell, flagged) => Object.assign({}, cell, {flagged});
let toggleFlag = (cell) => setFlag(cell, !cell.flagged);
let isRevealed = cell => cell.revealed;
let reveal = cell => Object.assign(cell, {}, {revealed: true});
let revealMutate = cell => (cell.revealed = true);
let markOneMoreBombNeighbour = cell => Object.assign(cell, {}, {bombsCount: cell.bombsCount + 1});
let markOneMoreBombNeighbourMutate = cell => (cell.bombsCount++);
let isBomb = cell => cell.bombsCount === -1;
let hasNeighbourBomb = cell => !isBomb(cell) && cell.bombsCount > 0;

export {
    isFlagged,
    setFlag,
    toggleFlag,
    isRevealed,
    reveal,
    revealMutate,
    markOneMoreBombNeighbour,
    isBomb,
    hasNeighbourBomb,
    markOneMoreBombNeighbourMutate
};