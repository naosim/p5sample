import { WorkoutTimer } from "../domain/WorkoutTimer.mjs";

const colors = {
  line: "#429",
  back: "wihte"
}

const layouts = {};
layouts.diameter = 320;
layouts.center = { x: layouts.diameter / 2, y: layouts.diameter / 2 };
layouts.strokeWeight = 1;
layouts.textSize = layouts.diameter / 3;
layouts.setCountTextSize = layouts.textSize / 2;

/**
 *
 * @param {WorkoutTimer} workoutTimer
 */
export function drawTimer(workoutTimer) {
  const timer = workoutTimer.timer;
  if(!timer.isCountChanged) {// 数値が変わったときだけ描画
    return;
  }
  
  clear(0, 0, 0, 0);
  // background(colors.back);

  fill(colors.line);
  noStroke();
  circle(layouts.center.x, layouts.center.y, layouts.diameter);

  fill(colors.back);
  noStroke();
  arc(layouts.center.x, layouts.center.y, layouts.diameter - layouts.strokeWeight * 2, layouts.diameter - layouts.strokeWeight * 2, -PI / 2, -PI / 2 + 2 * PI * timer.progress, PIE);

  fill(colors.back);
  stroke(colors.line);
  strokeWeight(layouts.strokeWeight);
  circle(layouts.center.x, layouts.center.y, layouts.diameter / 1.5);

  fill(colors.line);
  noStroke();
  textSize(layouts.textSize);
  text(timer.value, layouts.center.x, layouts.center.y);

  textSize(layouts.setCountTextSize);
  text(workoutTimer.setCount, layouts.center.x, layouts.center.y - layouts.diameter / 4 );

  fill(colors.back);
  text(workoutTimer.pastTimeLabel, layouts.center.x, layouts.diameter * 1.1 + 4 );
  text(workoutTimer.pastTimeLabel, layouts.center.x + 4, layouts.diameter * 1.1 );
  text(workoutTimer.pastTimeLabel, layouts.center.x, layouts.diameter * 1.1 + 4 );
  text(workoutTimer.pastTimeLabel, layouts.center.x + 3, layouts.diameter * 1.1 + 3 );

  fill(colors.line);
  text(workoutTimer.pastTimeLabel, layouts.center.x, layouts.diameter * 1.1 );
}


