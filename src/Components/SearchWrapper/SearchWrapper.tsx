import React, {Component, createRef} from "react";
import styled from "styled-components";
import Search from "./Search/Search";

interface ISuggestion {
    id: number,
    value: string,
    weight: number,
}

interface IProps {
    handleResultUpdate: (suggestion: ISuggestion) => void
}

const Div = styled.div`
    width: 200px;
    height: 100px;
`;

export class SearchWrapper extends Component<IProps, {}> {

    constructor (props: IProps) {

        super(props);

        this.searchRef = createRef<Search>();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    private searchRef: React.RefObject<Search>;

    private wrapperRef: HTMLDivElement;

    componentDidMount () {

        document.addEventListener("mousedown", this.handleClickOutside);

    }

    componentWillUnmount () {

        document.removeEventListener("mousedown", this.handleClickOutside);

    }

    handleClickOutside = (evt: Event) => {

        if (this.wrapperRef && !this.wrapperRef.contains(evt.target as Node)) {

            const current = this.searchRef.current;

            if (current) {

                current.resetSuggestions();

            }

        }

    }

    setWrapperRef (node: HTMLDivElement) {

        this.wrapperRef = node;

    }

    render () {

        const {handleResultUpdate} = this.props;

        return (
            <Div ref={this.setWrapperRef}>
                <Search
                    handleResultUpdate={handleResultUpdate}
                    ref={this.searchRef}
                />
            </Div>
        );

    }

}

export default SearchWrapper;
