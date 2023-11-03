import { SpriteWrapper } from "../../lib/mylib/mylib.mjs";


window.setup = () => {
  var step = 0;
  new Canvas(500, 500);
  window.world.gravity.y = 10;
  for(let i = 0; i < 5; i++) {
    new Bar(i % 2 == 0 ? 250 : 150, canvas.h * (i + 1) / 6, i);
  }
  new Ball();
  new Basket();

  

  window.draw = () => {
    clear(0, 0, 0, 1);
    
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


    sprite.update = () => {
      if(keyIsDown(RIGHT_ARROW) && sprite.rotation < maxRotation) {
        sprite.rotation++;
        console.log(sprite.rotation);
      }
      if(keyIsDown(LEFT_ARROW) && sprite.rotation > -maxRotation) {
        sprite.rotation--;
      }
    }
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
        if(this.x >= 160) {
          direction = -1;
        }
      } else {
        this.addX(-1);
        if(this.x < 30) {
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