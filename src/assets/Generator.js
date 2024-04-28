import { EVENTS } from '../constants.js'

export default class Generator {
  constructor(scene) {
    this.scene = scene;

    this.scene.time.delayedCall(2000, this.init, null, this)
  }

  init() {
    console.log('Generator initialized')

    this.generateCloud()
  }

  generateCloud() {
    this.scene.events.emit(EVENTS.GENERATE_CLOUD)

    this.scene.time.delayedCall(Phaser.Math.Between(2000, 3000), this.generateCloud, null, this)
  }

  generateObstacle() {
    this.scene.events.emit(EVENTS.GENERATE_OBSTACLE)

    this.scene.time.delayedCall(Phaser.Math.Between(1500, 2500), this.generateObstacle, null, this)
  }

  generateCoin() {
    this.scene.events.emit(EVENTS.GENERATE_COIN)

    this.scene.time.delayedCall(Phaser.Math.Between(500, 1500), this.generateCoin, null, this)
  }
}
