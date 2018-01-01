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
            <TableRowColumn key={`${this.props.data[i].id}name`}>{this.props.data[i].name}</TableRowColumn>
            <TableRowColumn key={`${this.props.data[i].id}position`}>{this.props.data[i].position}</TableRowColumn>
            <TableRowColumn key={`${this.props.data[i].id}team`}>{this.props.data[i].team}</TableRowColumn>
            <TableRowColumn key={`${this.props.data[i].id}seasonPts`}>{this.props.data[i].seasonPts}</TableRowColumn>
            <TableRowColumn key={`${this.props.data[i].id}weekPts`}>{this.props.data[i].weekPts}</TableRowColumn>
            <TableRowColumn key={`${this.props.data[i].id}week`}>{this.props.data[i].week}</TableRowColumn>
          </TableRow>
        )
      }
    }
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow key='columnNames'>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Positon</TableHeaderColumn>
              <TableHeaderColumn>Team</TableHeaderColumn>
              <TableHeaderColumn>Season Points</TableHeaderColumn>
              <TableHeaderColumn>Week Points</TableHeaderColumn>
              <TableHeaderColumn>Week</TableHeaderColumn>
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