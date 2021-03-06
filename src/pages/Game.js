// A simple waiting screen that
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Game will have state (such as if the game is awaiting to be started, or is in progress)
class Game extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      gameState : 0,
      gameOwner : null,
      P1 : null,
      P2 : null,
      connectedToServer: false,
      gameGuestMode: false
    }
  }

  componentDidMount = () => {
    // Establish a connection to the server via web socket then update the state
    // When an opponent joins
    
    if (!this.props.location.state) {
      this.setState( ()=> ({
        gameGuestMode: false
      }))
    } else {
      if (this.props.location.state.guestMode) {
        
        this.setState(()=> ({
          gameGuestMode: true,
          gameState: 1
        }))
      } else {
        
        this.setState( ()=> ({
          gameGuestMode: false
        }))
      }
    }
    
    this.socket = new WebSocket(process.env.REACT_APP_SOCKET_SERVER_IP);

    this.socket.onopen = () => {
      console.log('Connected to game server.');
      this.setState(() => ({
        connectedToServer: true
      }))

      // We have to distinguish if we're in guest mode
      // Get the gameID from sessionStorage
      let gameID = sessionStorage.getItem('gameID');
      if (!gameID) {
        gameID = this.props.location.state.gameID;
      }
      // Send some message to initialize
      console.log("Guest mode currently", this.state.gameGuestMode)
      if(!this.state.gameGuestMode) {
        
        this.sendMessageToServer('game_start_waiting', gameID);
      } else {
        // We're in guest mode, send a different socket message
        
        this.sendMessageToServer('user_join_existing_game', { gameID: gameID, 
          email: this.props.location.state.userID })
      }
    }
    this.socket.onmessage = (e) => {
      // Handles messages from the game server
      this.processMessageFromServer(e.data);
      console.log("Got some message from the server.");
    }

    this.socket.onclose = (e) => {
      this.setState(()=> ({
        connectedToServer: false
      }))
    }
    
  }

  processMessageFromServer = (data) => {
    const pData = JSON.parse(data);

    switch (pData.type) {
      // DO something based on type
      case "ok-response":
        console.log("Got SERVER RESPONSE OK", pData)
        break;
      case "ok-existing-game-joined" :
        console.log("GAME JOINED SERVERDATA", pData)
        break;
      case "server-error":
        alert(pData.message);
        break;
      case "server-message":
        console.log("got a server message!", pData.message);
        console.log("Data", pData);

        if (pData.message === 'game-start') { 
          if (this.state.gameState === 0) {
            this.setState(()=> ({
              gameState: 1
            }))
          }
        }
        break;
      default:
        console.log('Some other undefined result', pData);
    }
  }

  sendMessageToServer = (type, msg) => {
    const outgoingMsg = JSON.stringify({type: type, message: msg});
    this.socket.send(outgoingMsg);
  }
  // There needs to be some method that triggers the game state to 1
  // which is a 'opponent joined, game ready" state.

  render () {
    let connectedToServerMessage;
    let gameBoardMessage;
    if (this.state.connectedToServer) {
      connectedToServerMessage =
      <div>
        <h2> Connected to server. </h2>
      </div>
    } else {
      connectedToServerMessage = <div></div>
    }
    if (this.state.gameState === 0 ) {
      // Show a spinning waiting icon animation.
      return (
        <div className="opponent-waiting-div">
          {connectedToServerMessage}
          <h1>Awaiting for opponent to join...</h1>
        <div className="loader"> </div>
        </div>
      )
    } else if (this.state.gameState === 1 ) {
      // Player is joined refresh and show an empty game board where players
      // Can place their ships on the board
      gameBoardMessage = <div>
        <p>Game Board will appear here because game mode is 1</p>
      </div>
      return (
        <div>
          {gameBoardMessage}
        </div>
      )
    }
  }
}

export default withRouter(Game);

