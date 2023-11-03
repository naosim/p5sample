import { SpriteWrapper } from "../../lib/mylib/mylib.mjs";


window.setup = () => {
  var step = 0;
  new Canvas(500, 500);
  window.world.gravity.y = 10;
  for(let i = 0; i < 5; i++) {
    new Bar(i % 2 == 0 ? 300 : 200, canvas.h * (i + 1) / 6, i);
  }
  const ball = new Ball();
  new Basket();
  new DeadLine(ball);
  window.draw = () => {
    clear();
  }
}

class Bar extends SpriteWrapper {
  constructor(x, y, num) {
    const maxRotation = 15;
    const w = 280;
    const h = 20;

    /** @type {Sprite} */
    var sprite;
    if(num == 1) {
      const p = [
        [w/2, h * 3 / 4], [w/2, 0],
        [0, h / 4],
        [-w, 0],
        [0, -h]
      ]
      // @ts-ignore
      sprite = new Sprite(x, y, p);
    } else if(num == 2) {
      const p = [
        ...Bar.createKuneArray(3, w),
        [0, h],
        [-w, 0],
        [0, -h]
      ]
      // @ts-ignore
      sprite = new Sprite(x, y, p);
    } else if(num == 3) {
      const p = [
        ...Bar.createKuneArray(2.5, w),
        [0, h / 2],
        [-w, 0],
        [0, -h]
      ]
      // @ts-ignore
      sprite = new Sprite(x, y, p);
    } else {
      sprite = new Sprite(x, y);
      sprite.w = w;
      sprite.h = h;
    }
    
    sprite.rotation = -1;
    sprite.collider = "static";
    super(sprite)

    const rotationSpeed = 0.5;
    sprite.update = () => {
      if(Bar.isRightPressing() && sprite.rotation < maxRotation) {
        sprite.rotation += rotationSpeed;
      }
      if(Bar.isLeftPressing() && sprite.rotation > -maxRotation) {
        sprite.rotation -= rotationSpeed;
      }
    }

    
  }

  static isRightPressing() {
    return keyIsDown(RIGHT_ARROW) || (mouse.pressing() && mouse.x > 250)
  }

  static isLeftPressing() {
    return keyIsDown(LEFT_ARROW) || (mouse.pressing() && mouse.x < 250)
  }

  static createKuneArray(n, w) {
    const kunekune = [];
    for(let i = 0; i < n * 2; i++) {
      kunekune.push([w / n / 2, i % 2 == 0 ? 10 : -10])
    }
    return kunekune;
  }
}

class Ball extends SpriteWrapper {
  /** @type {number} */
  #type;
  constructor() {
    const sprite = new Sprite();
    sprite.x = canvas.w * 3 / 4
    sprite.y = 0;
    sprite.collider = 'dynamic';
    sprite.diameter = 30;
    super(sprite);
    // this.#type = type;
    // this.sprite.diameter = Ball.calcDiameter(this.#type);
  }
  resetPosition() {
    this.sprite.x = canvas.w * 3 / 4
    this.sprite.y = 0;
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
  }
}

class Basket extends SpriteWrapper {
  bottom;
  right;
  left;
  constructor() {
    const y = 490;
    const w = 10;
    const halfW = w / 2;
    const bottom = new Sprite(100, y, 60, w, 'static');

    const right = new Sprite(100+30-halfW, y-20, w, 40, 'static');
    const left = new Sprite(100-30+halfW, y-20, w, 40, 'static');

    var direction = 1;
    bottom.update = () => {
      if(direction > 0) {
        this.addX(1);
        if(this.x >= 250) {
          direction = -1;
        }
      } else {
        this.addX(-1);
        if(this.x < 50) {
          direction = 1;
        }

      }
    }
    super(bottom);

    this.bottom = bottom;
    this.right = right;
    this.left = left;
  }

  get x() {
    return this.sprite.x;
  }

  addX(x) {
    this.bottom.x += x;
    this.right.x += x;
    this.left.x += x;
  }  
}

class DeadLine extends SpriteWrapper {
  constructor(/** @type {Ball} */ball) {
    const sprite = new Sprite(canvas.width / 2, canvas.height + 20, canvas.width * 2, 10, 'static');
    sprite.update = () => {
      if(this.colliding(ball)) {
        ball.resetPosition();
      }
    }
    super(sprite);
  }
}