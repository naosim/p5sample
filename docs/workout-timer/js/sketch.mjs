import { WorkoutTimer } from "./domain/WorkoutTimer.mjs";
import { drawTimer } from "./view/view.mjs";
import { Sound } from "./view/Sound.mjs";

window.setup = () => {
  const workoutTimer = new WorkoutTimer();

  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  const sounds = new Sound();
  workoutTimer.setEventListener((c) => sounds.onEvent(c));
  workoutTimer.start();

  window.draw = () => {
    workoutTimer.update();
    drawTimer(workoutTimer);
  }
}


