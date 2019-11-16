import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// This class is essentially a lobby of available games
class GameLobby extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      availableGames: this.props.gamesList,
      toLaunchGame: false,
      destinationGameID: null,
      userID: null,
      guestMode_: false
    }
  }

  // This handles when the join button has been clicked
  joinButtonClicked = (e) => {

    // Grab gameID from associated button click. This will be used as a post request to the server
    // to connect a game and start it
    const gameID = e.target.getAttribute("data-game-id");
    const serverID = process.env.REACT_APP_HTTP_SERVER_IP;
    console.log("gameID is", gameID);

    if (gameID) {
      axios.post(serverID + `/game/${gameID}/join`, { email: sessionStorage.getItem('email')})
        .then(res => {
          /* After post request response is received, capture the destination gameID, userID
          and render the game page. When the game page component mounts, we'll do a websocket
          to the game server
          */
          console.log("Response!" , res.data.response);
          this.setState(() => ({
            destinationGameID : res.data.response,
            userID : res.data.email,
            toLaunchGame : true,
            guestMode_ : true
          }))
        })
        .catch((res) => {
          console.log(res.data.response);
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
      console.log("data response from games GET req", dataResponse);
      this.setState(() => ({
        availableGames: dataResponse
      }))
    });
    
  }

  // Displays all the games
  render () {
    let emptyGamesList;
    if (this.state.toLaunchGame) {
      return <Redirect to= {{
        pathname: '/game',
        state: { guestMode: true,
                  userID: this.state.userID,
                  gameID: this.state.destinationGameID
        }
      }}
        />
    }

    if (this.props.gamesList.length === 0) {
      emptyGamesList = 
                      <div className="div-span-error-message">
                        <p> No games available </p>
                      </div>
    }
    return (
      
      <div>
        <ul className="list-group center-div">
          { this.props.gamesList.map((el, index) => {
            return <li key={index} className="list-group-item">{el.title}
              <button onClick={this.joinButtonClicked} data-index-key={index} data-game-id={el.id} type="button" className="btn btn-success join-button-align">Join</button>
            </li>
          })}
           { emptyGamesList }
          <div>
            <button type="button" onClick={this.refreshGamesList} className="btn btn-primary refresh-button-lobby"> Refresh </button>
          </div>
        </ul>
      </div>
    )
  }
}

export default GameLobby;