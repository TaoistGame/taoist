import Phaser from 'phaser';

import { StarterVillageScene } from './scenes/StarterVillageScene';

// import { BACKEND_HTTP_URL } from './backend';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  fps: {
    target: 60,
    forceSetTimeOut: true,
    smoothStep: false,
  },
  width: 1920,
  height: 1020,
  backgroundColor: '#b6d53c',
  parent: 'phaser-example',
  physics: {
    default: 'arcade'
  },
  pixelArt: true,
  scene: [StarterVillageScene],
};

const game = new Phaser.Game(config);
