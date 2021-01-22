import React from 'react';
import './cell.css';


function getSymbol(bombsCount) {
    return bombsCount === -1 ? '💣' : bombsCount || '';
}

function RevealedCell(props) {
    return (<span className={`cell revealed ${props.flagged ? "flagged" : ""}`} data-coord={props.coord}>{ getSymbol(props.bombsCount) }</span>);
}

function UnRevealedCell(props) {
    return (<span className='cell un-revealed' data-coord={props.coord}>&nbsp;</span>);
}

function FlaggedCell(props) {
    return (<span className={`cell flagged ${props.revealed ? "revealed" : ""}`} data-coord={props.coord}>{ props.revealed ? getSymbol(props.bombsCount) : '🚩'}</span>);
}


function Cell(props) {
    let {data} = props;
    let coord = [props.row, props.col];
    return(data.flagged ?
            <FlaggedCell coord={coord} revealed={data.revealed} bombsCount={data.bombsCount}></FlaggedCell> :
            (data.revealed  ?
                <RevealedCell bombsCount={data.bombsCount} flagged={data.flagged} coord={coord}></RevealedCell> :
                <UnRevealedCell coord={coord} flagged={data.flagged}></UnRevealedCell>
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