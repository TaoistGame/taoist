import 'phaser';
import { LoadingScene, MainVillageScene } from './scenes';
import 'regenerator-runtime/runtime';


const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [LoadingScene, MainVillageScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});