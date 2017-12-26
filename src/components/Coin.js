import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Coin extends React.Component {

    render() {
        const coinStats = this.props.data
        const cryptoList = []
        if (this.props.data.length !== 0) {
            for (let i = this.props.start; i <= this.props.end; i++) {
                cryptoList.push(
                    <TableRow key={this.props.data[i].rank}>
                        <TableRowColumn>{this.props.data[i].rank}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].name}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].symbol}</TableRowColumn>
                        <TableRowColumn>${this.props.data[i].price_usd}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].price_btc}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].percent_change_24h}%</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].percent_change_7d}%</TableRowColumn>
                    </TableRow>
                )
            }
        }
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Rank</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Symbol</TableHeaderColumn>
                            <TableHeaderColumn>Price/USD</TableHeaderColumn>
                            <TableHeaderColumn>Price/BTC</TableHeaderColumn>
                            <TableHeaderColumn>24hr Change</TableHeaderColumn>
                            <TableHeaderColumn>7D Change</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cryptoList}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Coin;