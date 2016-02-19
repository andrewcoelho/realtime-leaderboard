import io from 'socket.io-client';
import * as actions from '../actions';

// Default function with our app's store as a parameter
export default (store) => {

  // Connect our client to our socket server
  const socket = io.connect();

  // Hydrates our state from the server
  socket.on('hydrate', data => {
    store.dispatch(actions.hydrateState(data));
  });

  // Allows us to get the players from the state
  const select = (state) => {
    return state.players;
  }

  // Initial array of players as they currently exist in the state
  let currentPlayers = select(store.getState());

  // Called every time the store is updated
  const handlePointsAdded = () => {

    // New array of players after the store is updated
    let updatedPlayers = select(store.getState());

    // Map through the array of players and if a players points in the updated
    // players array are not equal to the players points in the current players
    // array, we know that this player at this index had points added and we can
    // emit the socket event to the server with the appropriate player attached
    updatedPlayers.map((player, index) => {
      if (currentPlayers.length && player.points !== currentPlayers[index].points) {
        socket.emit('add-points', player);
      }
    });

    // Update the current players array with the updated players
    return currentPlayers = updatedPlayers;
  };

  // Subscribe to the store and run handlePointsAdded anytime there is a change
  store.subscribe(handlePointsAdded);

  // Listen for an event sent from our socket server and trigger the appropriate
  // Redux action to confirm the update in our local state
  socket.on('points-added', data => {
    store.dispatch(actions.updatePlayerInPlayers(data));
  });
};
