export class Ship {
  constructor(W, H) {
    this.x = W / 2;
    this.y = H / 2;
    this.r = 20;
    this.v = 0;
    this.a = 0.5 * Math.PI; // original: (90 / 180) * Math.PI
    this.rot = 0;
    this.collided = false;
    this.thrusting = false;
    this.thrust = { x: 0, y: 0 };
  }

  rotateLeft() {
    this.rot = (3 * Math.PI) / 100; // original: ((360 / 180) * Math.PI) / 10
  }

  rotateRight() {
    this.rot = (-3 * Math.PI) / 100; // original: ((-360 / 180) * Math.PI) / 10
  }

  increaseVelocity() {
    this.v = this.v > 7.5 ? this.v : Number((this.v + 0.4).toFixed(1));
  }

  decreaseVelocity() {
    this.v =
      this.v == 0
        ? (this.thrusting = false)
        : Number((this.v - 0.2).toFixed(1));
  }

  moveForward() {
    this.thrust.x = Math.cos(this.a) * this.v;
    this.thrust.y = Math.sin(this.a) * this.v;
  }

  stopRotation() {
    this.rot = 0;
  }

  updateAngle() {
    this.a += this.rot;
  }

  stop() {
    this.thrusting = false;
  }

  handleEdges(W, H) {
    //up - down
    if (this.y < 0 - this.r) this.y = H;
    // down - up
    if (this.y > H) this.y = 0;
    // left - right
    if (this.x < 0 - this.r) this.x = W;
    // right - left
    if (this.x > W) this.x = 0;
  }
}

export class Asteroid {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = this.getVelocity();
    this.dX =
      Math.cos(Math.random()) * (Math.random() > 0.5 ? this.v : this.v * -1);
    this.dY =
      Math.sin(Math.random()) * (Math.random() > 0.5 ? this.v : this.v * -1);
  }

  move() {
    this.x += this.dX;
    this.y += this.dY;
  }

  handleEdges(W, H) {
    //up - down
    if (this.y < 0 - this.r) this.y = H + this.r;
    // down - up
    if (this.y > H + this.r) this.y = 0 - this.r;
    // left - right
    if (this.x < 0 - this.r) this.x = W + this.r;
    // right - left
    if (this.x > W + this.r) this.x = 0 - this.r;
  }

  getVelocity() {
    switch (this.r) {
      case 20:
        return 4.5;
      case 40:
        return 4;
      case 60:
        return 3;
      case 80:
        return 2;
    }
  }
}

export class Game {
  constructor() {
    this.level = 1;
    this.numAsteroids = 3;
    this.score = 0;
    this.lifes = 3;
    this.decreasePermission = true;
    this.radius = [80, 60, 40, 20];
  }

  pickRadius() {
    return this.radius[Math.floor(Math.random() * this.radius.length)];
  }

  getPointsByAsteroidRad(radius) {
    switch (radius) {
      case 20:
        return 100;
      case 40:
        return 70;
      case 60:
        return 40;
      case 80:
        return 20;
    }
  }
}

export class Shoot {
  constructor(shipData) {
    this.x = shipData.x + shipData.r * Math.cos(shipData.a);
    this.y = shipData.y - shipData.r * Math.sin(shipData.a);
    this.r = 5;
    this.a = shipData.a;
    this.thrust = { x: 0, y: 0 };
  }

  move() {
    this.thrust.x = Math.cos(this.a) * 10;
    this.thrust.y = Math.sin(this.a) * 10;
    this.x += this.thrust.x;
    this.y -= this.thrust.y;
  }

  isGone(canvasWidth, canvasHeight) {
    return (
      this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight
    );
  }
}
