import React, { Component } from 'react';

// This class is essentially a lobby of available games
class GameLobby extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      availableGames: this.props.gamesList
    }
  }

  // This handles when the join button has been clicked
  joinButtonClicked = (e) => {
    
    console.log(e.target.getAttribute("data-index-key"));
  }

  // Displays all the games
  render () {
    return (
      <div>
      <ul className="list-group center-div">
        {this.props.gamesList.map((el, index) => {
          return <li key={index} className="list-group-item">{el.title}
            <button onClick={this.joinButtonClicked} data-index-key={index} type="button" className="btn btn-success join-button-align">Join</button>
          </li>
        })};
      </ul>
      </div>
    )
  }
}

export default GameLobby;