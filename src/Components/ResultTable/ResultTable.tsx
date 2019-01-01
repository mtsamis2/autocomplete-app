import React, {Component} from "react";
import styled, {css} from "styled-components";

interface ISuggestion {
    id: number,
    value: string,
    weight: number
}

interface IProps {
    result: ISuggestion | null
}

const ColLarge = styled.col`
    width:70%;
`,

    ColSmall = styled.col`
        width:15%;
`,

    Div = styled.div`
        width: 800px;
`,

    Table = styled.table`
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
`,

    TableBodyStyle = css`
        border: 1px solid black;
        padding: 8px;
        margin: 0 auto;
`,

    Td = styled.td`
        ${TableBodyStyle}
        height:35px;
`,

    Th = styled.th`
        ${TableBodyStyle}
        text-align: left;
        background-color: #3898EC;
        color: white;
`;

export class ResultTable extends Component<IProps, {}> {

    constructor (props: IProps) {

        super(props);

    }

    renderResultRow (result: ISuggestion | null) {

        if (result) {

            return (
                <tr>
                    <Td>
                        {result.id}
                    </Td>
                    <Td>
                        {result.weight}
                    </Td>
                    <Td>
                        {result.value}
                    </Td>
                </tr>
            );

        }

        return (
            <tr>
                <Td />
                <Td />
                <Td />
            </tr>
        );

    }

    render () {

        const {result} = this.props;

        return (
            <Div>
                <Table>
                    <colgroup>
                        <ColSmall />
                        <ColSmall />
                        <ColLarge />
                    </colgroup>
                    <thead>
                        <tr>
                            <Th>
                                ID
                            </Th>
                            <Th>
                                Weight
                            </Th>
                            <Th>
                                Value
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderResultRow(result)}
                    </tbody>
                </Table>
            </Div>
        );

    }

}

export default ResultTable;
