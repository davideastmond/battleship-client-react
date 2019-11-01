import React, {Component } from 'react'
import axios from 'axios';


class PageOne extends React.Component {

  createGameButton_click = (e) => {

   
    // axios.post('http://eastmonds.dlinkddns.com:3535/new', { email: "test@email.com" })
    // .then(res => {
    //   // Get a response from the request
    //   console.log(res);
    // });
  }

  joinGameButton_click = (e) => {

  }
  render () {
    return(
      <div>
        <div>
          <h1 className="center-header"> BattleShip </h1>
        </div>
        <div className="center-div">
          <p className="h1 titleCenter">Enter your details</p>
          <label className="lead" for="login-email-input"> Email: </label>
          <input id="login-email-input" type="email"/>
          <div>
            <button type="button" id="create-game-button" className ="btn btn-success option-button" onClick={this.createGameButton_click}> Create Game </button>
            <button type="button" id="join-game-button" className="btn btn-primary option-button" onClick={this.joinGameButton_click}> Join Game </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PageOne;