import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class PlayerStats extends React.Component {

    render() {
        const playerStats = this.props.data
        const playerList = []
        if (this.props.data.length !== 0) {
            for (let i = this.props.start; i <= this.props.end; i++) {
                playerList.push(
                    <TableRow key={this.props.data[i].id}>
                        <TableRowColumn>{this.props.data[i].name}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].position}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].team}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].seasonPts}</TableRowColumn>
                        <TableRowColumn>{this.props.data[i].weekPts}%</TableRowColumn>
                    </TableRow>
                )
            }
        }
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Positon</TableHeaderColumn>
                            <TableHeaderColumn>Team</TableHeaderColumn>
                            <TableHeaderColumn>Season Points</TableHeaderColumn>
                            <TableHeaderColumn>Week Points</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {playerList}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default PlayerStats;