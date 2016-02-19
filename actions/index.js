import * as types from '../constants/ActionTypes';

export const hydrateState = (players) => {
  return {
    type: types.HYDRATE_STATE,
    players
  };
};

export const addPoints = (id) => {
  return {
    type: types.ADD_POINTS,
    id
  };
};

export const updatePlayerInPlayers = (player) => {
  return {
    type: types.CONFIRM_ADD_POINTS,
    player
  }
}
