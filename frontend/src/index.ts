import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import background from './assets/TX Tileset Grass.png';
import character from './assets/characters/player.png';

const gameWidth:number = 800;
const gameHeight:number = 600;
class MyGame extends Phaser.Scene
{
  constructor ()
  {
    super();
  }

  preload ()
  {
    //  This is an example of a bundled image:
    this.load.image('logo', logoImg);
    //  This is an example of loading a static image from the public folder:
    this.load.image('background', background);
    this.load.image('character', character);
  }
      
  create ()
  {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('character',{ start:3,end:3 }),
      frameRate: 10,
      repeat: -1
    });
    this.add.image(400, 300, 'background');
    const logo = this.add.image(400, 150, 'logo');
    const player = this.physics.add.sprite(100, 450, 'character');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: gameWidth,
  height: gameHeight,
  scene: MyGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 10 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);
