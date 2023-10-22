

export class CountDownTimer {
  /** @type {number} sec */
  #time;
  /** @type {number} */
  #startTime;
  /** @type {number} */
  #endTime;
  #value;
  #lastValue;

  /** @type { (c:CountDownTimer)=>void } */
  #cb;

  /** @type {() => number} */
  #dateFactory

  /**
   * 
   * @param {number} time 
   * @param {() => number} dateFactory 
   */
  constructor(time, dateFactory) {
    this.#time = time;
    this.#dateFactory = dateFactory;
  }
  
  start() {
    this.#startTime = this.#dateFactory();
    this.#endTime = this.#startTime + this.#time * 1000;
    this.update();
  }

  /**
   * @returns {number} sec
   */
  get time() {
    return this.#time;
  }

  update() {
    this.#lastValue = this.#value;
    this.#value = Math.floor((this.#endTime - this.#dateFactory()) / 1000) + 1;

    if(this.#cb && this.isCountChanged) {
      if(this.value <= 3) {
        this.#cb(this);
      }
    }
  }

  get isCountChanged() {
    return this.#value != this.#lastValue;
  }

  /**
   * @returns {number} sec
   */
  get value() {
    return this.#value;
  }

  get isEnd() {
    return this.value <= 0;
  }

  /**
   * @returns {number} 0.0 - 1.0
   */
  get progress() {
    return 1.0 - this.value / this.time;
  }

  /**
   * 3,2,1,0 のタイミングでイベント発火
   * @param { (c:CountDownTimer)=>void } cb 
   */
  setEventListener(cb) {
    this.#cb = cb;
  }

}
