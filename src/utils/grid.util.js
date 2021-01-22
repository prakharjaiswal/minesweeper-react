import * as cu from './cell.util';
import {blankMatrix, findAdjacent, updateAdjacent} from './matrix.util';

const revealGridCellAndGetNewGrid = (grid, [r, c], includeBoundaryNumbers = false) => {
    if(cu.isRevealed(grid[r][c]) || cu.isRevealed(grid[r][c])) {
        return grid;
    }
    let newGrid = grid.map(row => row.map(cell => Object.assign({}, cell)));
    
    if(!cu.hasNeighbourBomb(newGrid[r][c])) {    
        let stack = [[r,c]];
        while(stack.length){
            let [row, col] = stack.pop();
            newGrid[row][col].revealed = true;
            findAdjacent(row, col, newGrid.length, newGrid[0].length)
            .forEach(([adjR, adjC]) => {
                if(!cu.isRevealed(newGrid[adjR][adjC])) {
                    if(!cu.hasNeighbourBomb(newGrid[adjR][adjC])) {
                        stack.push([adjR, adjC]);
                    } else if(includeBoundaryNumbers && !cu.isBomb(newGrid[adjR][adjC])) {
                        newGrid[adjR][adjC].revealed = true;
                    }   
                } 
            });
        }
    }else {
        newGrid[r][c] = cu.reveal(newGrid[r][c]);
    }
    return newGrid;
};

const getGridWithupdatedCell = (grid, targetRowIndex, targetColIndex, fn) => {
    return grid.map((row, rowIndex) => rowIndex !== targetRowIndex ? row : row.map((cell, colIndex) => colIndex !== targetColIndex ? cell : fn(cell)));
};

const countCells = (grid, predicate) => {
    return grid.reduce((count, row) => (count + row.reduce((rowCount, cell) => (predicate(cell) ? rowCount + 1 : rowCount), 0)), 0)
};

const getEmptyGrid = (rows, columns) => {
    return blankMatrix(rows, columns, (row, col) => {
        return {
            revealed: false,
            bombsCount: 0,
            flagged: false,
            index: row * rows + col
        };
    });
};

const cloneGrid = (grid, fn) => grid.map(
                            (row, rowIndex) => row.map(
                                (cell, colIndex) => Object.assign({}, cell, fn ? fn(cell, rowIndex, colIndex) : null)
                                )
                            );

const populateBombs = (grid, totalBombs, coord) => {
    let newGrid = cloneGrid(grid, null);
    let rows = grid.length;
    let columns = grid[0].length;
    let neighboursOfCoordVals = findAdjacent(coord[0], coord[1], rows, columns)
                                    .concat([coord])
                                    .map(([row, col]) => row * rows + col);

    let arr = new Array(rows * columns)
                    .fill(null)
                    .map((_val, index) => index)
                    .filter((val) => !neighboursOfCoordVals.includes(val));

    for(let i = 0; i < totalBombs; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        let row = Math.floor(arr[randomIndex]/rows);
        let col = arr[randomIndex] % columns;
        arr.splice(randomIndex, 1);
        newGrid[row][col].bombsCount = -1;
        updateAdjacent(newGrid, row, col, (cell) => {
            if(!cu.isBomb(cell)) {
                cu.markOneMoreBombNeighbourMutate(cell);
            }
        });
    }
    return newGrid;
}

export {revealGridCellAndGetNewGrid, getGridWithupdatedCell, countCells, getEmptyGrid, populateBombs};