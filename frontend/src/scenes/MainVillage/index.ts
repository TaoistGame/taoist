// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GameObjects, Scene } from 'phaser';
import FpsText from '../../objects/fpsText';
import { Room, Client } from 'colyseus.js';

export class MainVillageScene extends Scene {
  fpsText;
  room: Room;
  currentPlayer: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  remoteRef: Phaser.GameObjects.Rectangle;
  playerEntities: { [sessionId: string]: Phaser.Types.Physics.Arcade.ImageWithDynamicBody } = {};
  constructor() {
    super('main-village-scene');
  }

  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  inputPayload = {
    left: false,
    right: false,
    up: false,
    down: false
  };

  async create() {
    this.fpsText = new FpsText(this);
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0);
    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Made with <3 by Anjero`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, -30);
    if (this.input.keyboard?.createCursorKeys() === undefined) {
      console.log('this.cursorKeys is undefined');
    } else {
      this.cursorKeys = this.input.keyboard.createCursorKeys();
    }
    // connect with the room
    await this.connect();
    console.log(this.room.state.players);

    this.room.state.players.onAdd = (player, sessionId) => {
      const entity = this.physics.add.image(player.x, player.y, 'character');
      this.playerEntities[sessionId] = entity;
      // listening for server updates
      if (sessionId === this.room.sessionId) {
        // this is the current player!
        // (we are going to treat it differently during the update loop)
        this.currentPlayer = entity;

      } else {
        player.onChange = function (changes) {
          changes.forEach(() => {
            entity.setData('serverX', player.x);
            entity.setData('serverY', player.y);
          });
        };
      }
    };

    this.room.state.players.onRemove = (player, sessionId) => {
      const entity = this.playerEntities[sessionId];
      if (entity) {
        entity.destroy();
        delete this.playerEntities[sessionId];
      }
    };

    // this.cameras.main.startFollow(this.ship, true, 0.2, 0.2);
    // this.cameras.main.setZoom(1);
    this.cameras.main.setBounds(0, 0, 800, 600);
  }
  t;
  async connect() {
    // add connection status text
    const connectionStatusText = this.add
      .text(0, 0, 'Trying to connect with the server...')
      .setStyle({ color: '#ff0000' })
      .setPadding(4);
    console.log('connection to ws://localhost:2567');
    const client = new Client('ws://localhost:2567');

    try {
      this.room = await client.joinOrCreate('my_room', {});
      // connection successful!
      connectionStatusText.destroy();
    } catch (e) {
      // couldn't connect
      connectionStatusText.text = 'Could not connect with the server.' + e;
    }
  }
  update() {
    this.fpsText.update();
    // skip loop if not connected with room yet.
    if (!this.room) {
      return;
    }
    // skip loop if not connected yet.
    if (!this.currentPlayer) {
      return;
    }

    const velocity = 2;
    this.inputPayload.left = this.cursorKeys.left.isDown;
    this.inputPayload.right = this.cursorKeys.right.isDown;
    this.inputPayload.up = this.cursorKeys.up.isDown;
    this.inputPayload.down = this.cursorKeys.down.isDown;
    this.room.send(0, this.inputPayload);

    if (this.inputPayload.left) {
      this.currentPlayer.x -= velocity;
    } else if (this.inputPayload.right) {
      this.currentPlayer.x += velocity;
    }

    if (this.inputPayload.up) {
      this.currentPlayer.y -= velocity;
    } else if (this.inputPayload.down) {
      this.currentPlayer.y += velocity;
    }

    for (const sessionId in this.playerEntities) {
      // do not interpolate the current player
      if (sessionId === this.room.sessionId) {
        continue;
      }

      // interpolate all other player entities
      const entity = this.playerEntities[sessionId];
      const { serverX, serverY } = entity.data.values;

      entity.x = Phaser.Math.Linear(entity.x, serverX, 0.2);
      entity.y = Phaser.Math.Linear(entity.y, serverY, 0.2);
    }
  }
}