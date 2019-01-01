import React, {Component} from "react";
import styled from "styled-components";
import SuggestionList from "./SuggestionList/SuggestionList";

interface ISuggestion {
    id: number,
    value: string,
    weight: number,
}

interface IProps {
    handleResultUpdate: (suggestion: ISuggestion) => void
}

interface IState {
    query: string,
    suggestionList: ISuggestion[],
    cursor: number
}

const Input = styled.input`
    padding: 12px 20px 12px 12px;
    border: 1px solid #3898EC;
    width: 100%;
`;

const API_URL = "http://michaelkozicki.com/auto.php";

export class Search extends Component<IProps, IState> {

    constructor (props: IProps) {

        super(props);

        this.state = {
            query: "",
            suggestionList: [],
            cursor: 0
        };

        this.resetSuggestions = this.resetSuggestions.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSuggestionSelect = (suggestion: ISuggestion) => {

        const {handleResultUpdate} = this.props;

        this.setState({
            query: suggestion.value,
            suggestionList: [],
            cursor: 0
        });

        handleResultUpdate(suggestion);

    }

    resetSuggestions= () => {

        this.setState({
            suggestionList: [],
            cursor: 0
        });

    }

    getSuggestions = () => {

        const {query} = this.state;

        fetch(`https://cors-anywhere.herokuapp.com/${API_URL}?q=${query}`, {method: "GET"}).
            then((response) => response.json()).
            then((jsonResponse) => this.setState({suggestionList: jsonResponse.data}));

    }

    handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {

        const {query} = this.state;

        this.setState({
            query: evt.target.value
        }, () => {

            if (query && query.length > 1) {

                if (query.length % 2 === 0) {

                    this.getSuggestions();

                }

            }

        });

    }

    handleKeyDown (evt: React.KeyboardEvent<HTMLInputElement>) {

        const {cursor, suggestionList} = this.state;

        // Up Key
        if (evt.keyCode === 38 && cursor > 0) {

            this.setState((prevState) => ({
                cursor: prevState.cursor - 1
            }));

        // Down Key
        } else if (evt.keyCode === 40 && cursor < suggestionList.length - 1) {

            this.setState((prevState) => ({
                cursor: prevState.cursor + 1
            }));

        // Enter Key
        } else if (evt.keyCode === 13) {

            this.handleSuggestionSelect(suggestionList[cursor]);

        }

    }

    handleSubmit (evt: React.FormEvent<HTMLFormElement>) {

        evt.preventDefault();

    }

    render () {

        const {query, suggestionList, cursor} = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Search for..."
                        value={query}
                    />
                    <SuggestionList
                        cursor={cursor}
                        onSuggestionSelect={this.handleSuggestionSelect}
                        suggestionList={suggestionList}
                    />
                </form>
            </div>
        );

    }

}

export default Search;
