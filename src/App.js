import React from "react";
import "./App.css";
import PlayingCard from "./Components/PlayingCard";
import { makeShuffledDeck } from "./utils.js";
import logo from "./logo.png";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      hasGameStarted: false,
      whoWinsTheRound: null,
      playerOneWinning: 0,
      playerTwoWinning: 0,
      drawRounds: 0,
    };
  }

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      hasGameStarted: false,
      whoWinsTheRound: null,
      playerOneWinning: 0,
      playerTwoWinning: 0,
      drawRounds: 0,
    });
  };

  dealCards = () => {
    const playerDeck = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;

    if (playerDeck[0].rank > playerDeck[1].rank) {
      newRoundWinner = 1;
    } else if (playerDeck[0].rank < playerDeck[1].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: playerDeck,
      whoWinsTheRound: newRoundWinner,
      hasGameStarted: true,
      playerOneWinning:
        newRoundWinner === 1
          ? state.playerOneWinning + 1
          : state.playerOneWinning,
      playerTwoWinning:
        newRoundWinner === 2
          ? state.playerTwoWinning + 1
          : state.playerTwoWinning,
      drawRounds:
        newRoundWinner !== 1 && newRoundWinner !== 2
          ? state.drawRounds + 1
          : state.drawRounds,
    }));
  };

  render() {
    // We cannot run set state here
    const currCardElems = this.state.currCards.map(({ name, suit }, index) =>
      // Give each list element a unique key
      {
        const nameSuit = `${name}${suit}`;
        return (
          <PlayingCard
            name={name}
            suit={suit}
            player={index + 1}
            key={nameSuit}
          />
        );
      }
    );

    const winnerMessage = this.state.whoWinsTheRound
      ? `Player ${this.state.whoWinsTheRound} has won the game`
      : `This rounds is a tie`;

    const playerOneWinngMessage = `Player 1: won ${this.state.playerOneWinning} rounds`;

    const playerTwoWinngMessage = `Player 2: won ${this.state.playerTwoWinning} rounds`;

    const drawRoundsMessage = `Tie: ${this.state.drawRounds} rounds`;

    let gameWinner = null;

    if (this.state.playerOneWinning > this.state.playerTwoWinning) {
      gameWinner = 1;
    } else if (this.state.playerOneWinning < this.state.playerTwoWinning) {
      gameWinner = 2;
    }

    const displayGameWinnerMessage = gameWinner
      ? `Player ${gameWinner} won this game!`
      : "It is a draw!";

    let numOfRoundsLeft = this.state.cardDeck.length / 2;

    const displayRoundsLeftMessage = `No. of rounds left: ${numOfRoundsLeft}`;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo" />
          <h3>High Card 🚀</h3>
          <div style={{ display: "flex" }}>{currCardElems}</div>
          <br />

          <button
            className="button"
            onClick={
              numOfRoundsLeft === 0
                ? () => this.resetGame()
                : () => this.dealCards()
            }
          >
            Deal
          </button>
          {this.state.hasGameStarted && (
            <>
              <p>{winnerMessage}</p>
              <p>{playerOneWinngMessage}</p>
              <p>{playerTwoWinngMessage}</p>
              <p>{drawRoundsMessage}</p>
              <p>{displayRoundsLeftMessage}</p>
            </>
          )}
          <p>{numOfRoundsLeft === 0 && displayGameWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
