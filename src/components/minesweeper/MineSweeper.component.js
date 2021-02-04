import React, {useEffect, useReducer} from 'react';
import GAME_STATUS from '../../constants/gamestatus.constant';
import {GAME_LEVELS} from '../../constants/gameLevel.constant';
import Grid from '../grid/Grid.component';
import {Grid as StyledGrid} from '../styles/grid.style';
import {Button} from '../styles/input.style';
import Timer from '../timer/Timer.component';
import GameLevelSelector from '../gamelevelselector/GameLevelSelector.component';
import {recordWin} from '../../utils/record.util';
import GAME_ACTIONS from '../../actions/minesweeper.action';
import useMineSweeper from '../../reducers/useMineSweeper.reducer';
import usePrevious from '../../reducers/usePrevious.reducer';

export default function MineSweeper(props) {
    const defaultGameLevel = GAME_LEVELS.find(game => game.label === props.defaultLevel);
    const [state, dispatch] = useReducer(useMineSweeper(),
        {
            gameStatus: GAME_STATUS.RESET,
            remainingFlags: defaultGameLevel.bombs,
            bombs: defaultGameLevel.bombs,
            rows: defaultGameLevel.rows,
            columns: defaultGameLevel.columns
        });
    
    let {rows, columns, remainingFlags, gameStatus, bombs} = state;    
    let onStartGame = () => {
        dispatch({type: GAME_ACTIONS.START});
    };
    let handleResetButton = () => {
        dispatch({type: GAME_ACTIONS.RESET, remainingFlags: bombs});
    };
    let handleFlagUpdate = (flagsUsed) => {
        dispatch({type: GAME_ACTIONS.UPDATE_FLAGS_COUNT, data: {remainingFlags: remainingFlags - flagsUsed } });
    };
    let handleGameLevelChange = newGameLevel => {
        dispatch({type: GAME_ACTIONS.RESET, ...newGameLevel});
    };

    let onTimerStopped = (timer) => {
        if(gameStatus === GAME_STATUS.WON) {
            recordWin(rows, columns, bombs, timer);
        }
    };
    let previousState = usePrevious(state);

    useEffect(() => {
        if(previousState && (previousState.rows !== rows || previousState.columns !== columns)) {
            dispatch({type: GAME_ACTIONS.RESET, remainingFlags: bombs});
        }
    });

    let handleGridCompletion = (status) => {
        switch(status) {
            case GAME_STATUS.WON:
                dispatch({type : GAME_ACTIONS.WON});
            break;
            case GAME_STATUS.READY:
                dispatch({type: GAME_ACTIONS.READY});
            break;
            case GAME_STATUS.LOST:
                dispatch({type : GAME_ACTIONS.LOST});
            break;
            default:
        }
    };
    
    return (<div className='gameContainer'>
                <StyledGrid templateColumns="2fr 1fr 2fr">
                    <Timer
                        begin={gameStatus === GAME_STATUS.IN_PROGRESS}
                        reset={gameStatus === GAME_STATUS.RESET}
                        onStop={onTimerStopped}></Timer>
                    <span>{remainingFlags}&nbsp;🚩</span>
                    <span>
                        <GameLevelSelector
                            defaultGameLevel={defaultGameLevel.label}
                            onGameLevelChange={handleGameLevelChange}>
                        </GameLevelSelector>
                        <Button title="Reset Game" onClick={handleResetButton}>↺</Button>
                    </span>
                </StyledGrid>
                <Grid
                    rows={rows}
                    columns={columns}
                    bombs={bombs}
                    onstart={onStartGame}
                    gameStatus={gameStatus}
                    onFlagUpdate={handleFlagUpdate}
                    onComplete={handleGridCompletion}>
                </Grid>
            </div>);
}