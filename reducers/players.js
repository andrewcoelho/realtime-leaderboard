import * as types from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.HYDRATE_STATE:
      return action.players;
    case types.ADD_POINTS:
      return state.map(player =>
        player.id === action.id ?
          Object.assign({}, player, { points: player.points + 5 }) :
          player
      );
    case types.CONFIRM_ADD_POINTS:
      return state.map(player =>
        player.id === action.player.id ?
          Object.assign({}, player, { points: action.player.points }) :
          player
      );
    default:
      return state;
  }
}
