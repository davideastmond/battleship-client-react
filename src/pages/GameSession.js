import React, { Component } from 'react';

class GameSession extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      owner: null,
      inProgress: false
    }
  }

  render () {
    return (
      <div> placeholder </div>
    )
  }
}

export default GameSession;