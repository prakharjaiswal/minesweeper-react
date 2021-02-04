import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.templateColumns};
`;

export const RepeatGrid = styled(Grid)`
    grid-template-columns: repeat(${props => props.repeat}, ${props => props.size || '1fr'});
`;

export const InlineGrid = styled.div`
    display: inline-grid;
`;

export const RepeatInlineGrid = styled(InlineGrid)`
    grid-template-columns: repeat(${props => props.repeat}, ${props => props.size || '1fr'});
`;
