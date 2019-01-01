import React, {Component} from "react";
import ResultTable from "../Components/ResultTable/ResultTable";
import {SearchWrapper} from "../Components/SearchWrapper/SearchWrapper";

interface ISuggestion {
    id: number,
    value: string,
    weight: number
}

interface IState {
    result: ISuggestion | null,
}

export class AutoComplete extends Component<{}, IState> {

    constructor (props: {}) {

        super(props);

        this.state = {
            result: null
        };

        this.handleResultUpdate = this.handleResultUpdate.bind(this);

    }

    handleResultUpdate = (suggestion: ISuggestion) => {

        this.setState({
            result: suggestion
        });

    }

    render () {

        const {result} = this.state;

        return (
            <div>
                <SearchWrapper handleResultUpdate={this.handleResultUpdate} />
                <ResultTable result={result} />
            </div>
        );

    }

}

export default AutoComplete;
