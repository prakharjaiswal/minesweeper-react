import React, {useEffect, useReducer} from 'react';

const MIN_DIGITS = 2;

const ACTIONS = {
    'START': 'START',
    'RESET': 'RESET',
    'TICK': 'TICK'
};

export default function Timer(props) {
    

    const [state, dispatch] = useReducer((st, action) => {
        let moment = Date.now();
        switch(action.type) {
            case ACTIONS.START:
                return {
                    ...st,
                    timestamp: action.moment,
                    time: 1
                }
            case ACTIONS.RESET: 
            return {
                ...st,
                timestamp: moment,
                time: 0
            };
            case ACTIONS.TICK:
                return {
                    ...st,
                    time : Math.round((moment  - st.timestamp)/1000)
                }
            default:
                return st;
        }
    }, {
        timestamp: Date.now(),
        time: 0
    });

    useEffect(() => {
        let intervalId;
        if(props.reset && state.time > 0) {
            dispatch({type: ACTIONS.RESET});
            return;
        }
        if(props.begin) {
            if(state.time === 0) {
                dispatch({type: ACTIONS.START, moment: Date.now()});
            }else {
                intervalId = setTimeout(() => {
                    dispatch({type: ACTIONS.TICK});
                }, 1000);   
                return () => clearInterval(intervalId);
            }
            
        } else {
            if(state.time > 0) {
                props.onStop(state.time);
            }
        }
    });

    let min = Number(Math.floor(state.time/60).toString()).toString();
    min = min.length < MIN_DIGITS ? '0'.repeat(MIN_DIGITS - min.length).concat(min) : min;
    let secs = Number(state.time % 60).toString();
    secs = secs.length < MIN_DIGITS ? '0'.repeat(MIN_DIGITS - secs.length).concat(secs) : secs;

    
    return (
        state.time > 0 ?
        (<span className='timer'>
            <span className='digital'>{min}</span>
            <em>:</em>
            <span className='digital'>{secs}</span>
        </span>) : <span>Begin Game</span>
    );
}