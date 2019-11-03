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
      P2 : null
    }
  }

  // There needs to be some method that triggers the game state to 1
  // which is a 'opponent joined, game ready" state.

  render () {
    if (this.state.gameState === 0 ) {
      // Render a waiting for game
      return (
        <div>
          <h1>Awaiting for opponent to join...</h1>
        </div>
      )
    } else if (this.state.gameState === 1 ) {
      // Player is joined
    }
  }
}

export default Game;