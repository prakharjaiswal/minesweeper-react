import {revealGridCellAndGetNewGrid, getGridWithupdatedCell, countCells, getEmptyGrid, populateBombs} from '../utils/grid.util';
import * as cu from '../utils/cell.util';
import ACTIONS from '../actions/grid.action';

export default function(props) {

    return (st, action) => {
        let grid;
        switch(action.type) {
            case ACTIONS.REVEAL:
                grid = revealGridCellAndGetNewGrid(st.grid, action.coord);
                return {
                    ...st,
                    grid,
                    revealedCount: countCells(grid, cu.isRevealed)
                };

            case ACTIONS.TOGGLE_FLAG:
                grid = getGridWithupdatedCell(
                    st.grid,
                    action.coord[0],
                    action.coord[1],
                    cu.toggleFlag);
                return  {
                    ...st,
                    grid,
                    flaggedCount: countCells(grid, cu.isFlagged)
                };

            case ACTIONS.REVEAL_ALL:
                grid = st.grid.map((row) => row.map(cu.reveal));
                return {
                    ...st,
                    grid,
                    revealedCount: countCells(grid, cu.isRevealed)
                };
            case ACTIONS.START_GRID:
                let bombePlantedGrid = populateBombs(st.grid, props.bombs, action.around);
                grid = revealGridCellAndGetNewGrid(bombePlantedGrid, action.around, true);
                return {
                    ...st,
                    grid,
                    revealedCount: countCells(grid, cu.isRevealed),
                    dirty: true,
                }
            case ACTIONS.RESET_GRID:
                return {
                    ...st,
                    grid: getEmptyGrid(props.rows, props.columns),
                    dirty: false,
                    flaggedCount: 0
                };
            default:
                return st;
        }
    };
}