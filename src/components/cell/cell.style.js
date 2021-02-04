import styled from 'styled-components';

const Cell = styled.span`
    text-align: center;
    font-weight: bold;
    border: 1px solid #B8B8B8;
    cursor: pointer;
    border-top: 1px solid #eaeaea;
    border-left: 1px solid #eaeaea;
    border-right: 1px solid #bababa;
    border-bottom: 1px solid #bababa;
    position: relative;
`;

const RevealedCell = styled(Cell)`
    cursor: default;
    background-color:#e8e8e8;
`;

const UnRevealedCell = styled(Cell)`
    background-color: #C0C0C0;
`;

const FlaggedCell = styled(Cell)`
    border: 1px solid red;
    background-color: #fefefe;
`;

const RevealedFlaggedCell = styled(FlaggedCell)`
    background-color:#e8e8e8;
    &:after {
        content: '🚩';
        font-size: 0.5em;
        position: absolute;
        right: 1px;
    }
`;

export {RevealedCell, UnRevealedCell, FlaggedCell, RevealedFlaggedCell};