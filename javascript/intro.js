window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};
const wKey = document.querySelector('.wkey');
const sKey = document.querySelector('.skey');
const aKey = document.querySelector('.akey');
const dKey = document.querySelector('.dkey');

function startGame() {
  const myCanvas = document.querySelector('#canvas');
  myCanvas.style.border = '1px solid black';
  const ctx = myCanvas.getContext('2d');

  let frame = 0;
  const spaceImage = new Image();
  spaceImage.src = './img/space.jpg';

  const spaceImageTwo = new Image();
  spaceImageTwo.src = './img/earth.jpg';

  const spaceImageThree = new Image();
  spaceImageThree.src = './img/mars.jpg';

  const astronautFalling = new Image();
  astronautFalling.src = './img/astronautfalling.png';

  const fireball = new Image();
  fireball.src = './img/fireball.png';

  const sideFireBall = new Image();
  sideFireBall.src = './img/sideball.png';

  spaceImage.onload = () => {
    // ctx.drawImage(spaceImageThree, 0, 0, 800, 400);

    updateSpace();
  };

  const spaceImageObject = {
    img: spaceImage,
    img2: spaceImageTwo,
    img3: spaceImageThree,
    x: 0,
    y: 0,
    speed: 0.1,

    move() {
      this.y -= this.speed;
      this.y %= myCanvas.height;
    },

    draw() {
      ctx.drawImage(this.img, 0, this.y, 800, 400);
      ctx.drawImage(this.img2, 0, this.y, 800, 400);

      if (this.speed < 0) {
        ctx.drawImage(this.img, 0, this.y + this.img.height, 800, 400);
      } else {
        ctx.drawImage(this.img, 0, this.y + myCanvas.height, 800, 400);
      }
    },
  };

  // let gravity = 0.001;

  //  changed this into a class so we could run a for loop to make a bunch of them
  class Fireballs {
    constructor(ctx) {
      this.img = fireball;
      this.ctx = ctx;
      this.width = 40;
      this.height = 40;
      this.x = Math.floor(Math.random() * 800);
      this.y = 0;
      this.vx = 0.3;
      this.vy = 0.5;
    }

    move() {
      this.y += 1;
    }
    draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    leftSide() {
      return this.x;
    }
    rightSide() {
      return this.x + this.width;
    }
    topOf() {
      return this.y;
    }
    bottomOf() {
      return this.y + this.height;
    }
  }
  const myFireballs = [];

  const astro = {
    img: astronautFalling,
    x: 400,
    y: 40,
    vx: 0.2,
    vy: 1.2,
    width: 50,
    height: 100,

    // newPos
    moveDown() {
      // so 40-0? but as we press dwon it adds 1 to speedy and subtracts it from y?
      // this.y -= this.speedY;
      this.y += 15;
    },
    moveRight() {
      // this.x += speedX;
      this.x += 15;
    },
    //adds to the X axis so up
    moveUp() {
      // this.x += speedX;

      this.y -= 25;
    },

    //subtracts from the X so if x is 350 it will go back down to 345
    moveLeft() {
      this.x -= 15;
    },
    draw() {
      // the first grabs the image, second one and third grab where it is posiiton in the canvas// and the last two are the width and height of the image.
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    leftBorder() {
      return this.x;
    },
    rightBorder() {
      return this.x + this.width;
    },
    topBorder() {
      return this.y;
    },
    bottomBorder() {
      return this.y + this.height;
    },
    onFire(aFireball) {
      return !(astro.leftBorder() > aFireball.rightSide());
    },
    velocity: function () {
      astro.x += astro.vx;
      astro.y += astro.vy;
      //40 +0.2 > top of border?
      if (astro.y + astro.vy > 400) {
        alert("If you're falling down, We are both falling down.");
      }
      if (astro.x + astro.vx > 760 || astro.x + astro.vx < 0) {
        astro.vx *= -1;
      }
    },
    // gravity: function () {
    //   this.vy += gravity;
    //   this.vx += gravity;
    // },
  };

  class sideBalls {
    constructor(ctx) {
      this.img = sideFireBall;
      this.ctx = ctx;
      this.width = 40;
      this.height = 40;
      this.x = 800;
      this.y = Math.floor(Math.random() * 400);
      this.vx = 0.3;
      this.vy = 0.5;
    }

    move() {
      this.x -= 1;
    }
    draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // velocity(){
    //   if(sideBalls.)
    // }
  }
  const mysideBalls = [];
  // const meteorShower = {
  //   img: fireball,
  //   x: 30,
  //   y: 30,
  //   vx: 0.3,
  //   vy: 0.5,
  //   draw: function () {
  //     // the first grabs the image, second one and third grab where it is posiiton in the canvas// and the last two are the width and height of the image.

  //     ctx.drawImage(this.img, this.x, this.y, 40, 40);
  //   },
  //   velocity: function () {
  //     meteorShower.x += meteorShower.vx;
  //     meteorShower.y += meteorShower.vy;
  //     //40 +0.2 > top of border?
  //     if (meteorShower.x > astro.x || meteorShower.y > astro.y) {
  //       alert('On fire');
  //     }
  //   },
  // };

  // const secondFireball = {
  //   img: sideFireBall,
  //   x: 700,
  //   y: 10,
  //   vx: -0.3,
  //   vy: 0.5,
  //   draw: function () {
  //     // the first grabs the image, second one and third grab where it is posiiton in the canvas// and the last two are the width and height of the image.

  //     ctx.drawImage(this.img, this.x, this.y, 40, 40);
  //   },
  //   velocity: function () {
  //     secondFireball.x += secondFireball.vx;
  //     secondFireball.y += secondFireball.vy;
  //     //40 +0.2 > top of border?
  //     // if (secondFireball.x > astro.x || secondFireball.y > astro.y) {
  //     //   // alert('On fire');
  //     // }
  //   },
  // };

  //hoisted to the top

  function updateSpace() {
    frame += 1;

    if (frame % 150 === 0) {
      myFireballs.push(new Fireballs(ctx));
    }
    if (frame % 250 === 0) {
      mysideBalls.push(new sideBalls(ctx));
    }
    spaceImageObject.move();

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    spaceImageObject.draw();

    // ctx.drawImage(astronautFalling, 400, 40, 50, 100);
    // meteorShower.draw();
    // meteorShower.velocity();
    // secondFireball.draw();
    // secondFireball.velocity();
    astro.draw();
    astro.velocity();

    for (let i = 0; i < myFireballs.length; i++) {
      myFireballs[i].move();
      myFireballs[i].draw();
    }
    for (let i = 0; i < mysideBalls.length; i++) {
      mysideBalls[i].move();
      mysideBalls[i].draw();
    }

    for (let i = 0; i < myFireballs.length; i++) {
      if (astro.onFire(myFireballs[i])) {
        console.log('yo');
      }
    }

    // astro.gravity();

    requestAnimationFrame(updateSpace); // ? ask
  }

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 's':
        console.log('yo');
        astro.moveDown();
        sKey.classList.toggle('toggle');

        break;
      case 'd':
        astro.moveRight();
        dKey.classList.toggle('toggle');
        break;
      case 'w':
        astro.moveUp();
        wKey.classList.toggle('toggle');

        break;
      case 'a':
        astro.moveLeft();
        aKey.classList.toggle('toggle');
        break;
      case 'Control':
        console.log('hey');
        astro.gravity();
        break;
    }
  });
}

// const spaceShuttleObject = {
//   img:
// }
