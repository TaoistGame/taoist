import { Room, Client } from 'colyseus';
import { MyRoomState, Player } from '../rooms/schema/MyRoomState';

export class MainVillageRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    // set map dimensions
    this.state.mapWidth = 800;
    this.state.mapHeight = 600;

    // handle player input
    this.onMessage(0, (client, input) => {
      const player = this.state.players.get(client.sessionId);
      const velocity = 2;

      if (input.left) {
        player!.x -= velocity;

      } else if (input.right) {
        player!.x += velocity;
      }

      if (input.up) {
        player!.y -= velocity;

      } else if (input.down) {
        player!.y += velocity;
      }

    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, 'joined!');

    // create player at random position.
    const player = new Player();
    player.x = Math.random() * this.state.mapWidth;
    player.y = Math.random() * this.state.mapHeight;

    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!');
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...');
  }

}