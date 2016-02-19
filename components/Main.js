import React from 'react';
import Player from './Player';

const compare = (a, b) => {
  if (a.points < b.points)
    return 1;
  if (a.points > b.points)
    return -1;
  return 0;
};

export default ({
  players,
  onPlayerClick
}) => (
  <ul>
    {players.sort(compare).map((player, index) =>
      <Player
        key={player.id}
        index={index}
        player={player}
        onPlayerClick={onPlayerClick}
      />
    )}
  </ul>
);
