// A simple waiting screen that
import React, { Component } from 'react';

// Game will have state (such as if the game is awaiting to be started, or is in progress)
class Game extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      gameState : 0,
      gameOwner : null,
      P1 : null,
      P2 : null,
      connectedToServer: false
    }
  }

  componentDidMount = () => {
    // Establish a connection to the server via web socket then update the state
    // When an opponent joins
    this.socket = new WebSocket(process.env.REACT_APP_SOCKET_SERVER_IP);

    this.socket.onopen = () => {
      console.log('Connected to game server.');
      this.setState(() => ({
        connectedToServer: true
      }))

      // Get the gameID from sessionStorage
      const gameID = sessionStorage.getItem('gameID');
      if (!gameID) {
        throw "GameID is null or undefined";
      }
      // Send some message to initialize
      this.sendMessageToServer('game_start_waiting', gameID);
    }

    this.socket.onmessage = (e) => {
      // Handles messages from the game server
      this.processMessageFromServer(e.data);
      console.log("Got some message from the server.");
    }
  }

  processMessageFromServer = (data) => {
    const pData = JSON.parse(data);
  }

  sendMessageToServer = (type, msg) => {
    const outgoingMsg = JSON.stringify({type: type, message: msg});
    this.socket.send(outgoingMsg);
  }
  // There needs to be some method that triggers the game state to 1
  // which is a 'opponent joined, game ready" state.

  render () {
    let connectedToServerMessage;
    if (this.state.connectedToServer) {
      connectedToServerMessage =
      <div>
        <h2> Connected to server. </h2>
      </div>
    } else {
      connectedToServerMessage = <div></div>
    }
    if (this.state.gameState === 0 ) {
      // Render a waiting for game
      return (
        <div className="opponent-waiting-div">
          {connectedToServerMessage}
          <h1>Awaiting for opponent to join...</h1>
        <div className="loader"> </div>
        </div>
      )
    } else if (this.state.gameState === 1 ) {
      // Player is joined
    }
  }
}

export default Game;

