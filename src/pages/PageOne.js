import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Lobby from './Lobby';

class PageOne extends React.Component {
  state = {
    toGamePage: false,
    toLobby: false,
    gamesList:[]
  }
  
  createGameButton_click = (e) => {
    const serverIP = process.env.REACT_APP_HTTP_SERVER_IP
    const userNameEmail = document.getElementById("login-email-input").value;

    if (!userNameEmail || userNameEmail === "") {
      // Show some error
      alert("Enter an e-mail address");
      return;
    }
    axios.post( serverIP + "/game/new", { email: userNameEmail })
    .then(res => {
      // Get a response from the request
      // call a function from the parent component to navigate?
      this.setState(() => ({
        toGamePage : true
      }));

      // Store the gameID in sessionStorage
      const gameID = res.data.gameID;
      sessionStorage.setItem('gameID', gameID);
    });
  }

  joinGameButton_click = (e) => {
    const serverIP = process.env.REACT_APP_HTTP_SERVER_IP
    const userNameEmail = document.getElementById("login-email-input").value;

    if (!userNameEmail || userNameEmail === "") {
      // Show some error
      alert("Enter an e-mail address");
      return;
    }

    // Store the user e-mail in session storage
    sessionStorage.setItem('email', userNameEmail);

    // Get a list of games from the server
    axios.get(serverIP + "/games", { email: userNameEmail })
    .then((res) => {
      //console.log(JSON.parse(res.data.games))
      if(res.data.games) {
        this.setState(()=> ({
          gamesList : JSON.parse(res.data.games),
          toLobby: true
        }))
      }
    })
  }
  render () {

    if (this.state.toGamePage) {
      return <Redirect to='/game' />
    }

    let gameLobby;
    let loginPage;
    if (this.state.toLobby) {
      gameLobby = <div><div className="lobby-games-title-center"><h1>Available Games</h1> </div>
        <div><Lobby gamesList={this.state.gamesList} /></div> </div>
      loginPage = <div></div>
      
    } else {
      gameLobby = <div></div>
      loginPage = <div className="center-div">
                    <p className="h1 titleCenter">Enter your details</p>
                    <label className="lead" for="login-email-input"> Email: </label>
                    <input id="login-email-input" type="email"/>
                    <div>
                      <button type="button" id="create-game-button" className ="btn btn-success option-button" onClick={this.createGameButton_click}> Create Game </button>
                      <button type="button" id="join-game-button" className="btn btn-primary option-button" onClick={this.joinGameButton_click}> Join Game </button>
                    </div>
                  </div>
    }
  
    return(
      <div>
        <div>
          <h1 className="center-header"> BattleShip </h1>
        </div>
          {loginPage}
          {gameLobby}
      </div>
    );
  }
}

export default PageOne;

/**
 * 
 * @param {object} data unstringified data 
 * @param {*} socket websocket to send data ove
 */
function sendData(data, socket) {
  try {
    const dataToSend = JSON.stringify(data);
    socket.send(dataToSend);
  } catch (error) {
    console.log(error);
  }
}