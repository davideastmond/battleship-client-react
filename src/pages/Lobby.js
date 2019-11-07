import React, { Component } from 'react';
import axios from 'axios';

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

    // Grab gameID from associated button click. This will be used as a post request to the server
    // to connect a game and start it
    const gameID = e.target.getAttribute("data-game-id");
    const serverID = process.env.REACT_APP_HTTP_SERVER_IP;
    console.log(gameID);

    if (gameID) {
      axios.post(serverID + `/game/${gameID}/join`, { email: sessionStorage.getItem('email')})
        .then(res => {
          // After post request response is received, navigate to a game screen
        })
    } else {
      throw "Invalid gameID for post request";
    }
  }

  // Performs a get request to server and refreshes the state with updated games
  refreshGamesList = () => {
    const serverIP = process.env.REACT_APP_HTTP_SERVER_IP;
    axios.get(serverIP + "/games", { email: sessionStorage.getItem('email')})
    .then((res) => {
      const dataResponse = JSON.parse(res.data.games);
      this.setState(() => ({
        availableGames: dataResponse
      }))
    });
    
  }

  // Displays all the games
  render () {
    return (
      <div>
        <ul className="list-group center-div">
          {this.props.gamesList.map((el, index) => {
            return <li key={index} className="list-group-item">{el.title}
              <button onClick={this.joinButtonClicked} data-index-key={index} data-game-id={el.gameID} type="button" className="btn btn-success join-button-align">Join</button>
            </li>
          })}

          <div>
            <button type="button" onClick={this.refreshGamesList} className="btn btn-primary refresh-button-lobby"> Refresh </button>
          </div>
        </ul>
      </div>
    )
  }
}

export default GameLobby;