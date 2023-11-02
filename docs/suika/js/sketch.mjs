window.setup = () => {
  var step = 0;
  new Canvas(400, 400);
  window.world.gravity.y = 10;
  new Wall();
  var balls = [];

  
  window.draw = () => {
    clear(0, 0, 0, 1);
    if(step%100 == 0) {
      balls.push(Ball.createRandom())
    }


    forAllCombination(balls, (/** @type {Ball} */a, /** @type {Ball} */b) => {
      if(a.isSameSize(b) && a.colliding(b)) {
        a.sizeUp();
        b.remove();
      }
    })
    balls = balls.filter(v => !v.removed)

    step++;

  }
}


class SpriteWrapper {
  /** @type {Sprite} */
  #sprite;
  get sprite() {
    return this.#sprite;
  }

  /**
   * 
   * @param {Sprite} sprite 
   */
  constructor(sprite) {
    this.#sprite = sprite;
  }

  /**
   * 
   * @param {SpriteWrapper} spriteWrapper 
   */
  colliding(spriteWrapper) {
    return this.#sprite.colliding(spriteWrapper.#sprite);
  }

  remove() {
    this.sprite.remove();
  }
}

class Ball extends SpriteWrapper {
  static speed = 3;
  /** @type {number} */
  #type;
  constructor(type) {
    const sprite = new Sprite();
    // sprite.bounciness = 0.1;
    sprite.collider = 'dynamic';;
    sprite.x = 200 + Math.random();
	  sprite.y = 0;
    sprite.vel.y = Ball.speed;
    super(sprite);
    this.type = type;
    // this.#type = type;
    // this.sprite.diameter = Ball.calcDiameter(this.#type);
  }

  get type() {
    return this.#type;
  }
  set type(type) {
    this.#type = type;
    this.sprite.diameter = Ball.calcDiameter(this.#type);
    // sprite.textSize = 40;
    this.sprite.text = this.#type + 1;
  }

  static createRandom() {
    return new Ball(Math.floor(Math.random() * 5));
  }

  static calcDiameter(num) {
    return 16 * Math.pow(Math.sqrt(2), num);

  }

  bounceBack(th) {
    this.sprite.vel.x = Ball.speed * Math.sin(th);
    this.sprite.vel.y = -Ball.speed * Math.cos(th);
  }


  /**
   * 
   * @param {Ball} other 
   */
  isSameSize(other) {
    return this.#type == other.#type;
  }

  sizeUp() {
    this.type++;
    // this.#type++;
    // this.sprite.diameter = Ball.calcDiameter(this.#type);
  }

  /**
   * 
   * @param {SpriteWrapper} spriteWrapper 
   */
  colliding(spriteWrapper) {
    return this.sprite.colliding(spriteWrapper.sprite);
  }

  remove() {
    this.sprite.remove()
  }

  get removed() {
    return this.sprite.removed
  }
}


class Wall {
  constructor() {
    const width = 300;
    const height = 400;

    const bottom = createSprite();
    bottom.x = 400/2
	  bottom.y = height;
	  bottom.w = width;
	  bottom.h = 4;

    const left = createSprite();
    left.x = (400 - width)/2;
	  left.y = height / 2 + 4;
	  left.w = 4;
	  left.h = height;

    const right = createSprite();
    right.x = 400 - (400 - width)/2;
	  right.y = height / 2 + 4;
	  right.w = 4;
	  right.h = height;
  }
}


function createSprite(cllider = 'static') {
  const sprite = new Sprite();
  // sprite.bounciness = 1;
  sprite.collider = cllider;
  // sprite.friction = 0;
  // sprite.rotationLock = true;
  return sprite;
}

/**
 * 
 * @param {any[]} ary 
 * @param {Function} cb 
 */
function forAllCombination(ary, cb) {
  for(let i = 0; i < ary.length; i++) {
    for(let j = i + 1; j < ary.length; j++) {
      cb(ary[i], ary[j]);
    }
  }
}