function blankMatrix(rows, cols, fill = null) {
    return new Array(rows)
                .fill(null)
                .map((_row, rowIndex) => {
                    let rowArr = new Array(cols).fill(fill);
                    return typeof fill === 'function' ? rowArr.map((_cell, colIndex) => fill(rowIndex, colIndex)) : rowArr;
                });
}

function findAdjacent(r, c, maxRows, maxColumns) {
    /*
    0 0 0 
    0 X 0
    0 0 0
    */
    let X = [-1, -1, -1,  0, 0,  1, 1, 1];
    let Y = [-1,  0,  1, -1, 1, -1, 0, 1];

    return X.map((val, index) => {
        return [r + val, c + Y[index]];
    }).filter(([row, col]) => {
        return row >= 0 && row < maxRows && col >=0 && col < maxColumns;
    });
}

function updateAdjacent(matrix, row, col, updateFn) {
    let rows = matrix.length;
    let columns = matrix[0].length;
    findAdjacent(row, col, rows, columns).forEach(([r, c]) => {
        updateFn(matrix[r][c]);
    });
}

export {findAdjacent, blankMatrix, updateAdjacent};