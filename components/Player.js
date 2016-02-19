import React from 'react';

export default ({
  index,
  player,
  onPlayerClick
}) => (
  <li onClick={() => onPlayerClick(player)}>
    <span className="position">{index + 1}</span>
    <span className="name">{player.name}</span>
    <span className="points">{player.points}</span>
  </li>
);
