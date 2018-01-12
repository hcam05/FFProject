import React from 'react';

class PlayerStats extends React.Component {


  render() {
    const playerStats = this.props.data
    const playerList = []
    if (this.props.data.length !== 0) {
      for (let i = this.props.start; i <= this.props.end; i++) {
        playerList.push(
          <tr key={this.props.data[i].id}>
            <td key={`${this.props.data[i].id}name`}>{this.props.data[i].name}</td>
            <td key={`${this.props.data[i].id}position`}>{this.props.data[i].position}</td>
            <td key={`${this.props.data[i].id}team`}>{this.props.data[i].team}</td>
            <td key={`${this.props.data[i].id}seasonPts`}>{this.props.data[i].seasonPts}</td>
            <td key={`${this.props.data[i].id}weekPts`}>{this.props.data[i].weekPts}</td>
            <td key={`${this.props.data[i].id}week`}>{this.props.data[i].week}</td>
          </tr>
        )
      }
    }
    return (
      <table key='playertable'>
        <thead>
          <tr key='columnNames'>
            <th key='name'>Name</th>
            <th key='position'>Positon</th>
            <th key='team'>Team</th>
            <th key='season-points'>Season Points</th>
            <th key='week-points'>Week Points</th>
            <th key='week'>Week</th>
          </tr>
        </thead>
        <tbody>
          {playerList}
        </tbody>
      </table>
    )
  }
}

export default PlayerStats;