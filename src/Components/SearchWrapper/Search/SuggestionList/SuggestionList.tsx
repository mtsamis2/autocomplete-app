import React, {Component} from "react";
import styled from "styled-components";
import {Suggestion} from "./Suggestion/Suggestion";

interface ISuggestion {
    id: number,
    value: string,
    weight: number
}

interface IProps {
    suggestionList: ISuggestion[],
    cursor: number,
    onSuggestionSelect: (suggestion: ISuggestion) => void
}

const Ul = styled.ul`
    padding: 0;
    margin: 0;
    z-index: 1;
    position: relative;
`;

export class SuggestionList extends Component<IProps, {}> {

    render () {

        const {cursor, suggestionList, onSuggestionSelect} = this.props;

        return (
            <Ul>
                {suggestionList.map((suggestion, i) => (
                    <Suggestion
                        key={suggestion.id}
                        cursor={cursor}
                        row={i}
                        onSuggestionSelect={onSuggestionSelect}
                        suggestion={suggestion}
                    />))}
            </Ul>
        );

    }

}

export default SuggestionList;
