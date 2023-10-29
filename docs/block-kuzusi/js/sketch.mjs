window.setup = () => {
  new Canvas(400, 400);
  var player, ball, blocks;
  const gameOverBar = new GameOverBar();
  new Wall();

  function resetGame() {
    // 前回のゲームが残っているなら消す
    ball?.remove();
    player?.remove();
    blocks?.removeAll();

    // 再開
    player = new Player();
    ball = new Ball();
    blocks = new Blocks();
  }

  resetGame();
  
  window.draw = () => {
    clear(0, 0, 0, 1);

    if(keyIsDown(RIGHT_ARROW)) {
      player.moveRight();
    }
    if(keyIsDown(LEFT_ARROW)) {
      player.moveLeft();
    }
    
    // ボールとブロックの衝突
    blocks.colliding(ball);

    // ボールとプレイヤーの衝突
    if(ball.colliding(player)) {
      player.hit(ball);
    }

    // ボールとゲームオーバーラインとの衝突
    if(ball.colliding(gameOverBar)) {
      alert("GameOver");

      resetGame();
    }
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
  constructor() {
    const sprite = createSprite('dynamic');
	  // sprite.diameter = 12;
    sprite.w = 8;
    sprite.h = 8;
	  sprite.y = 300;
    sprite.vel.y = Ball.speed;
    super(sprite);
  }

  bounceBack(th) {
    this.sprite.vel.x = Ball.speed * Math.sin(th);
    this.sprite.vel.y = -Ball.speed * Math.cos(th);
  }

  /**
   * 
   * @param {SpriteWrapper} spriteWrapper 
   */
  colliding(spriteWrapper) {
    return this.sprite.colliding(spriteWrapper.sprite);
  }
}

class Player extends SpriteWrapper {
  static speed = 4;
  static width = 64;
  static halfWidth = Player.width / 2;
  constructor() {
    const sprite = createSprite();
	  sprite.y = 360;
	  sprite.w = Player.width;
	  sprite.h = 5;
    super(sprite);
  }
  moveRight() {
    if(this.sprite.x < 400) {
      this.sprite.x += Player.speed;
    }
    
  }
  moveLeft() {
    if(this.sprite.x > 0) {
      this.sprite.x -= Player.speed;
    }
  }

  /**
   * 
   * @param {Ball} ball 
   */
  hit(ball) {
    const diffX = ball.sprite.x - this.sprite.x;
    const v = diffX / Player.halfWidth;
    console.log(v);
    ball.bounceBack(v * Math.PI / 4);
  }
}

class Wall {
  constructor() {
    const top = createSprite();
	  top.y = 4;
	  top.w = 400;
	  top.h = 4;

    const left = createSprite();
    left.x = 4;
	  left.y = 200 + 4;
	  left.w = 4;
	  left.h = 400;

    const right = createSprite();
    right.x = 400 - 2;
	  right.y = 200 + 4;
	  right.w = 4;
	  right.h = 400;
  }
}

class GameOverBar extends SpriteWrapper {
  constructor() {
    const sprite = createSprite('kinematic');
	  sprite.y = 370;
	  sprite.w = 400;
	  sprite.h = 4;
    sprite.color = color(0, 0);
    sprite.strokeColor = color(0, 0);
    super(sprite);

  }

  /**
   * 
   * @param {SpriteWrapper} spriteWrapper 
   */
  colliding(spriteWrapper) {
    return this.sprite.colliding(spriteWrapper.sprite);
  }
}

class Block extends SpriteWrapper {
  static width = 32;
  static height = 16;

  constructor(x, y) {
    const sprite = createSprite();
    sprite.x = x;
	  sprite.y = y;
	  sprite.w = 32;
	  sprite.h =16;
    super(sprite);
  }
}

class Blocks {
  static xLength = 9;
  static yLength = 8;
  static offset = {x: (400 - Block.width * (Blocks.xLength - 0.5)) / 2, y: 64}
  #values = [];
  constructor() {
    for(let j = 0; j < Blocks.yLength; j++) {
      for(let i = 0; i < Blocks.xLength; i++) {
        const sprite = new Block(i * Block.width + Blocks.offset.x, j * Block.height + Blocks.offset.y)
        this.#values.push(sprite);
      }
    }
    
  }

  colliding(ball) {
    this.#values.filter(b => {
      if(b.sprite.colliding(ball.sprite)) {
        b.sprite.remove()
      }
      return !b.sprite.removed;
    })
  }
  removeAll() {
    this.#values.forEach(v => v.remove());
    this.#values = [];
  }
}

function createSprite(cllider = 'static') {
  const sprite = new Sprite();
  sprite.bounciness = 1;
  sprite.collider = cllider;
  sprite.friction = 0;
  sprite.rotationLock = true;
  return sprite;
}

class Stage {
  ball;
  blocks;
  constructor() {
    this.ball = new Ball();
    this.blocks = new Blocks();
  }
  removeAll() {
    this.ball.remove();
    this.blocks.removeAll();
  }
}
