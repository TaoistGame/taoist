import { Scene } from 'phaser';

export class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('character', 'img/Fumiko_single.png');
    this.load.atlas('a-character', 'spritesheets/fumiko-atlas.png', 'spritesheets/fumiko-atlas_atlas.json');
    console.log('loaded images');
  }

  create(): void {
    console.log('Loading scene was created');
    this.scene.start('main-village-scene');
  }
}