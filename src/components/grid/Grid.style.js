import styled from 'styled-components';
import {RepeatInlineGrid} from '../styles/grid.style';
export const GameGrid = styled(RepeatInlineGrid)`
    grid-template-rows: minmax(min-content, max-content);
    > * {
        width: ${props => props.cellDimension}px;
        height: ${props => props.cellDimension}px;
        line-height: ${props => props.cellDimension}px;
    }
`;