import React, {useEffect, useReducer} from 'react';
import Cell from '../cell/Cell.component';
import GAME_STATUS from '../../constants/gamestatus.constant';
import gridReducer from '../../reducers/useGrid.reducer';
import usePrevious from '../../reducers/usePrevious.reducer';
import * as cu from '../../utils/cell.util';
import ACTIONS from '../../actions/grid.action';
import {getEmptyGrid} from '../../utils/grid.util';
import {GameGrid} from './Grid.style';

let isGameOver = (gameStatus) => [GAME_STATUS.LOST, GAME_STATUS.WON].includes(gameStatus);
let isGameInProgress = (gameStatus) => gameStatus === GAME_STATUS.IN_PROGRESS;
let isBombRevealed = grid => grid.some(row => row.some(cell => cell.revealed && cu.isBomb(cell)));
let getClickedCellCoord = (element => element.dataset['coord'] ? element.dataset['coord'].split(',').map(str => parseInt(str, 10)) : [null, null]);

let isGameInResetPhase = (gameStatus) => gameStatus === GAME_STATUS.RESET;

function Grid(props) {

    const totalCells = props.rows * props.columns;
    const markGameComplete = (gameStatus) => props.onComplete(gameStatus);
    const allFlaggedOrRevealed = (revealedCount, flaggedCount) => (revealedCount  + flaggedCount >= totalCells);
    const hasGridSizeChanged = (prevProps) => prevProps && (prevProps.rows !== props.rows || prevProps.columns !== props.columns);

    const handleClick = (e) => {
        let coord = getClickedCellCoord(e.target);
        if(!coord || isGameOver(props.gameStatus) || cu.isFlagged(state.grid[coord[0]][coord[1]]) || cu.isRevealed(state.grid[coord[0]][coord[1]])) {
            return;
        }

        if(props.gameStatus === GAME_STATUS.RESET) {
            dispatch({type: ACTIONS.START_GRID, around: coord});
            props.onstart();
        }else {
            dispatch({type: ACTIONS.REVEAL, coord})
        }
        
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        let [row, col] = getClickedCellCoord(e.target);
        if(row === null || !isGameInProgress(props.gameStatus) || cu.isRevealed(state.grid[row][col])) {
            return;
        }
        dispatch({type: ACTIONS.TOGGLE_FLAG, coord: [row, col]});
    };

    const [state, dispatch] = useReducer(gridReducer(props), {
        grid: getEmptyGrid(props.rows, props.columns),
        revealedCount: 0,
        dirty: false,
        flaggedCount: 0
    });

    const previousFlaggedCount = usePrevious(state.flaggedCount);
    const previousProps = usePrevious(props);

    useEffect(() => {
        if(previousFlaggedCount !== state.flaggedCount) {
            props.onFlagUpdate(state.flaggedCount);
            return;
        }
        if(isGameInResetPhase(props.gameStatus) && (state.dirty || hasGridSizeChanged(previousProps))){
            dispatch({type: ACTIONS.RESET_GRID});
            return;
        }
        if(isGameInProgress(props.gameStatus) && allFlaggedOrRevealed(state.revealedCount, state.flaggedCount)){
            markGameComplete(GAME_STATUS.WON);
            return;
        }
        if(isBombRevealed(state.grid) && isGameInProgress(props.gameStatus)) {
            markGameComplete(GAME_STATUS.LOST);
            return;
        }
        if(isGameOver(props.gameStatus) && !allFlaggedOrRevealed(state.revealedCount, state.flaggedCount)) {
            dispatch({type: ACTIONS.REVEAL_ALL});
        }
    });

    const maxCellWidth = Math.floor(window.innerWidth/props.rows);
    const maxCellHeight = Math.floor(window.innerHeight/props.columns);
    const dimension = Math.floor(Math.min(maxCellHeight, maxCellWidth) * 0.8)

    return (
        <GameGrid
            repeat={props.columns}
            cellDimension={dimension}
            onClick={handleClick}
            onContextMenu={handleRightClick}>
            {state.grid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    return (<Cell
                                data={cell}
                                row={rowIndex}
                                col={colIndex}
                                key={'r' + rowIndex + 'c' + colIndex +  cell.revealed}
                            />);
                })
            })}
        </GameGrid>
    );
}

export default Grid;