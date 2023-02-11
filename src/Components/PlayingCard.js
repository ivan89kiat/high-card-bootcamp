import React from "react";

function importAll(r) {
  const suits = r.keys();
  let images = {};
  suits.forEach((suit) => {
    const suitName = suit.replace("./", "").replace(".png", "");
    //r(suit) is the path to the img
    images[suitName] = r(suit);
  });
  return images;
}

const suitImages = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

export default class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, suit, player } = this.props;
    const nameSuit = `${name}${suit}`;

    const playerName = `Player ${player}`;
    const currentSuitName = `${name} of ${suit}`;

    return (
      <div style={{ margin: "0 10px" }}>
        <p>{playerName}</p>
        <img
          src={suitImages[nameSuit]}
          alt="cardImg"
          height={300}
          width={200}
        />
        <p>{currentSuitName}</p>
      </div>
    );
  }
}
