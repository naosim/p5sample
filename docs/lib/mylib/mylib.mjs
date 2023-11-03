export class SpriteWrapper {
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