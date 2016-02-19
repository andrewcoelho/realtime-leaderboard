import React from 'react';

export default ({
  selected,
  onAddPoints
}) => {
  let el;

  if (selected) {
    el = (
      <footer>
        <span>{selected.name}</span>
        <button onClick={() => onAddPoints(selected.id)}>
          Add 5 Points
        </button>
      </footer>
    );
  } else {
    el = (
      <footer>
        <span>Please select a player</span>
      </footer>
    );
  }

  return el;
}
