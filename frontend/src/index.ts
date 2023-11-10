import Phaser from 'phaser';
import logoImg from './assets/logo.png';



class MyGame extends Phaser.Scene
{

  button: Phaser.GameObjects.Text | undefined;
  constructor ()
  {
    super({ key: 'GameScene' });
  }

  preload ()
  {
    this.load.image('button','assets/thad.jpg');
    //  This is an example of a bundled image:
    this.load.image('logo', logoImg);
    //  This is an example of loading a static image from the public folder:
    this.load.image('background', 'assets/bg.jpg');
    //this.load.image('background', 'assets/background.jpg');

    this.load.image('background1','assets/background.jpg');
  }
      
  create ()
  {

    this.add.image(400, 300, 'background');

    const logo = this.add.image(400, 150, 'logo');

    this.button= this.add.text(200,200,'Click me!')
        .setInteractive().on('pointerdown',()=>this.onButtonClick());



    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });
  }

  private onButtonClick() {
    console.log('Button clicked');

    this.add.image(400, 300,'background1');
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: MyGame
};

const game = new Phaser.Game(config);
