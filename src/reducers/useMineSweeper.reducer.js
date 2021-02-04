import GAME_ACTIONS from '../actions/minesweeper.action';
import GAME_STATUS from '../constants/gamestatus.constant';

export default function useMineSweeper() {
    return (st, action) => {
        switch(action.type) {
            case GAME_ACTIONS.START:
                return {...st,
                        gameStatus: GAME_STATUS.IN_PROGRESS
                };
                
            case GAME_ACTIONS.RESET:
                return {
                    ...st,
                    gameStatus: GAME_STATUS.RESET,
                    remainingFlags: action.remainingFlags || st.remainingFlags,
                    rows: action.rows || st.rows,
                    bombs: action.bombs || st.bombs,
                    columns: action.columns || st.columns
                };
            case GAME_ACTIONS.READY:
                return {
                    ...st,
                    gameStatus: GAME_STATUS.READY
                };
            case GAME_ACTIONS.LOST:
                return {
                    ...st,
                    gameStatus: GAME_STATUS.LOST
                };
            case GAME_ACTIONS.WON:
                return {
                    ...st,
                    gameStatus: GAME_STATUS.WON
                };
            case GAME_ACTIONS.UPDATE_FLAGS_COUNT: 
                return {
                    ...st,
                    remainingFlags: action.data.remainingFlags
                }
            default:
                return st;
        }
    };
}
