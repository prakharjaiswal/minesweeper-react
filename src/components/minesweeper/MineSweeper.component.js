import React, {useReducer} from 'react';
import GAME_STATUS from '../../constants/gamestatus.constant';
import Grid from '../grid/Grid.component';
import Timer from '../timer/Timer.component';
import {recordWin} from '../../utils/record.util';
import GAME_ACTIONS from '../../actions/minesweeper.action';
import './minesweeper.css';
import useMineSweeper from '../../reducers/useMineSweeper.reducer';

export default function MineSweeper(props) {

    const [state, dispatch] = useReducer(useMineSweeper(props),
        {
            gameStatus: GAME_STATUS.RESET,
            flags: props.bombs
        });
    
    let onStartGame = () => {
        dispatch({type: GAME_ACTIONS.START});
    };
    let handleResetButton = () => {
        dispatch({type: GAME_ACTIONS.RESET});
    };
    let handleFlagUpdate = (flagsUsed) => {
        dispatch({type: GAME_ACTIONS.UPDATE_FLAGS_COUNT, data: {flagsRemaining: props.bombs - flagsUsed } });
    };

    let onTimerStopped = (timer) => {
        if(state.gameStatus === GAME_STATUS.WON) {
            recordWin(props.rows, props.columns, props.bombs, timer);
        }
    };

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
                <section className='grid game-controls'>
                    <Timer
                        begin={state.gameStatus === GAME_STATUS.IN_PROGRESS}
                        reset={state.gameStatus === GAME_STATUS.RESET}
                        onStop={onTimerStopped}></Timer>
                    <span>{state.flags} 🚩</span>
                    <span><button onClick={handleResetButton}>Reset</button></span>
                </section>
                <Grid
                    rows={props.rows}
                    columns={props.columns}
                    bombs={props.bombs}
                    onstart={onStartGame}
                    gameStatus={state.gameStatus}
                    onFlagUpdate={handleFlagUpdate}
                    onComplete={handleGridCompletion}>
                </Grid>
            </div>);
}