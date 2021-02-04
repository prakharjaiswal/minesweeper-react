import React from 'react';
import {RevealedFlaggedCell, UnRevealedCell, FlaggedCell, RevealedCell} from './cell.style';


function getSymbol(bombsCount) {
    return bombsCount === -1 ? '💣' : bombsCount || '';
}


function Cell(props) {
    let {data} = props;
    let coord = [props.row, props.col];
    return(data.flagged ?
            (
                data.revealed ? 
                <RevealedFlaggedCell data-coord={coord}>
                    {getSymbol(data.bombsCount)}
                </RevealedFlaggedCell> :
                <FlaggedCell data-coord={coord}>🚩</FlaggedCell>
                ) :
            (data.revealed  ?
                <RevealedCell data-coord={coord} bombsCount={data.bombsCount} flagged={data.flagged} coord={coord}>
                    {getSymbol(data.bombsCount)}
                </RevealedCell> :
                <UnRevealedCell data-coord={coord}></UnRevealedCell>
            ));
}

function areEqual({data: prevData}, {data:curData}) {
    
    return (
        prevData.revealed === curData.revealed &&
        prevData.flagged === curData.flagged &&
        prevData.bombsCount === curData.bombsCount
    );
}

export default React.memo(Cell, areEqual);