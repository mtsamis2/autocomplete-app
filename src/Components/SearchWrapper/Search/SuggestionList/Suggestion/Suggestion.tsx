import React, {Component} from "react";
import styled from "styled-components";

interface ISuggestion {
    id: number,
    value: string,
    weight: number
}

interface IProps {
    suggestion: ISuggestion,
    cursor: number,
    row: number,
    onSuggestionSelect: (suggestion: ISuggestion) => void
}

const Li = styled.li`
    border: 1px solid #ddd;
    margin-top: -1px;
    background-color: #f6f6f6;
    padding: 12px 20px 12px 12px;
    color: black;
    display: block;
    width: 100%;
    cursor: pointer;

    &:hover {
        background-color: #eee;
    }

    &.active {
        background-color: #eee;
    }

    &.active:hover {
        background-color: #ddd;
    }
`;

export class Suggestion extends Component<IProps, {}> {

    constructor (props: IProps) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick () {

        const {onSuggestionSelect, suggestion} = this.props;

        onSuggestionSelect(suggestion);

    }

    render () {

        const {suggestion, cursor, row} = this.props;

        return (
            <Li
                className={cursor === row ? "active" : ""}
                onClick={this.handleClick}
                value={suggestion.value}
            >
                {suggestion.value}
            </Li>
        );

    }

}

export default Suggestion;
