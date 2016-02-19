import path from 'path';
import express from 'express';
import sockio from 'socket.io';
const thinky = require('thinky')();
const type = thinky.type;

const Player = thinky.createModel('Player', {
  id: type.number(),
  name: type.string(),
  points: type.number()
});

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  const file = path.resolve(__dirname, 'index.html');
  res.sendFile(file);
});

const server = app.listen(3057, () => console.log('App running on port 3057'));

const socketServer = sockio(server);

socketServer.on('connection', socket => {
  // Hydrate app state
  Player.run()
    .then(players => socket.emit('hydrate', players))
    .error(error => console.log(error));
  // Monitor changes to Player table
  Player.changes().then(feed => {
    feed.each((error, doc) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      socket.emit('points-added', doc);
    })
  });
  // Listen for event from client and update database accordingly
  socket.on('add-points', (data) => {
    Player.get(data.id).run()
      .then(player => {
        player.points = data.points;
        player.save()
          .then(updatedPlayer => updatedPlayer)
          .error(error => console.log('Error: ', error));
      });
  });
});
