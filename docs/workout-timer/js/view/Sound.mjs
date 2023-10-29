import { CountDownTimer } from "../domain/CountDownTimer.mjs";


export class Sound {
  /**
   * 3,2,1で鳴らす音
   * @type {import("p5").SoundFile}
   */
  #pi;
  /** 
   * ゼロで鳴らす音
   * @type {import("p5").SoundFile} 
   */
  #pu;
  constructor() {
    this.#pi = loadSound("./sound/maou_se_system39.mp3");
    this.#pu = loadSound("./sound/maou_se_system41.mp3");
  }

  /**
   * 3,2,1,0で呼ばれる
   * @param {CountDownTimer} c
   */
  onEvent(c) {
    if (!this.#pi.isLoaded() || !this.#pu.isLoaded()) { // 音が未ロードのときはスキップ
      return;
    }
    if (c.value > 0) { // 3,2,1
      this.#pi.play();
    }
    if (c.value == 0) { // ゼロ
      this.#pu.play();
    }

  }
}
