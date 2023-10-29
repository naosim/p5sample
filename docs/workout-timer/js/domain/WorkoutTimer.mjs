import { CountDownTimer } from "./CountDownTimer.mjs";

/** @returns {number} unix date */
export const dateNow = () => Date.now();

export class WorkoutTimer {
  #workoutTimer;
  #resetTimer;
  #timer;
  #state = State.reset;
  #dateFactory;
  /** @type {number} */
  #startTime = -1;
  #secCount = 1;

  /**
   * 
   * @param {()=>number} dateFactory 
   */
  constructor(dateFactory = dateNow) {
    this.#dateFactory = dateFactory;
    this.#workoutTimer = new CountDownTimer(30, this.#dateFactory);
    this.#resetTimer = new CountDownTimer(10, this.#dateFactory);
    this.#timer = this.#resetTimer;
  }

  get timer() {
    return this.#timer;
  }

  /**
   * セットカウント。インターバルの回数。セッターじゃない。
   */
  get setCount() {
    return this.#secCount;
  }

  update() {
    this.#timer.update();
    if (this.#timer.isEnd) {
      this.#state = this.#state.next();
      if (this.#state.isReset) {
        this.#secCount++;
        this.#timer = this.#resetTimer;
      } else if (this.#state.isWorkout) {
        this.#timer = this.#workoutTimer;
      } else {
        throw new Error("内部エラー");
      }
      this.#timer.start();
    }
  }

  /**
   * 3,2,1,0 のタイミングでイベントを発火する
   * @param { (c:CountDownTimer)=>void } cb
   */
  setEventListener(cb) {
    this.#workoutTimer.setEventListener(cb);
    this.#resetTimer.setEventListener(cb);
  }

  start() {
    this.#timer.start();
    this.#startTime = this.#dateFactory();
  }

  /**
   * 経過時間のテキスト。hh:mm:ss
   * @returns {string}
   */
  get pastTimeLabel() {
    if(this.#startTime < 0) {
      return "00:00:00";
    }
    var time = Math.floor((this.#dateFactory() - this.#startTime)/1000);
    if(time < 0) {
      return "00:00:00";
    }
    const zerofil = (num) => `0${num}`.slice(-2);

    const hour = Math.floor(time / 3600);
    time -= hour * 3600;
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return `${zerofil(hour)}:${zerofil(min)}:${zerofil(sec)}`;
  }
}

/**
 * 状態。next()を呼ぶたびにresetとworkoutを行き来します。
 */
export class State {
  /** @type {"reset" | "workout"} */
  #value;

  /**
   * @param {"reset" | "workout"} value 
   */
  constructor(value) {
    this.#value = value;
  }

  get isReset() {
    return this.#value === "reset"
  }

  get isWorkout() {
    return this.#value === "workout"
  }

  next() {
    if(this.#value == "reset") {
      return State.workout;
    } else if(this.#value == "workout") {
      return State.reset;
    } else {
      throw new Error("内部エラー");
    }
  }

  static reset = new State("reset");
  static workout = new State("workout");
}