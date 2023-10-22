import { CountDownTimer } from "../domain/CountDownTimer.mjs";


export class Sound {
  /** @type {import("p5").SoundFile} */
  #pi;
  /** @type {import("p5").SoundFile} */
  #pu;
  constructor() {
    this.#pi = loadSound("./sound/maou_se_system39.mp3");
    this.#pu = loadSound("./sound/maou_se_system41.mp3");
  }

  /**
   *
   * @param {CountDownTimer} c
   */
  onEvent(c) {
    if (!this.#pi.isLoaded() || !this.#pu.isLoaded()) {
      return;
    }
    if (c.value > 0) {
      this.#pi.play();
    }
    if (c.value == 0) {
      this.#pi.play();
    }

  }
}
