import React, {useState} from 'react';
import useInput from '../../reducers/useInput.reducer';
import MineSweeper from '../minesweeper/MineSweeper.component';
import {Select} from '../styles/input.style';
import {GameSelectorContainer} from './GameLevelSelector.style';
import {GAME_LEVELS} from '../../constants/gameLevel.constant';
import {InputLabel} from '../styles/label.style';
export default function GameSelector(props) {
    

    const defaultGameLevel = GAME_LEVELS.find((level => level.label === props.defaultGameLevel));

    const inputSelect = useInput(defaultGameLevel.id, (event) => {
        props.onGameLevelChange(GAME_LEVELS.find(game => game.id == event.target.value));
    });

    return (
    <GameSelectorContainer>
        <Select {...inputSelect} id='gameSelector'>
            {GAME_LEVELS.map(type => {
                return (<option key={type.id} value={type.id}>{type.label}</option>)
            })}
        </Select>
    </GameSelectorContainer>
    );
}