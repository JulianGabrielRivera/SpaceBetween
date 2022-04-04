// when you click this button it loads the game.

// once html is loaded start game/timer
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

const wKey = document.querySelector('.wkey');
const sKey = document.querySelector('.skey');
const aKey = document.querySelector('.akey');
const dKey = document.querySelector('.dkey');

const liftedUp = document.querySelector('.score span');
const levelUp = document.querySelector('.level span');

// function to start the game, creates the canvas
function startGame() {
  const myCanvas = document.querySelector('#canvas');

  const ctx = myCanvas.getContext('2d');

  let frame = 0; // ? ask

  // these create the images then we can store them in an object later.
  const spaceImage = new Image();
  spaceImage.src = './img/space.jpg';

  const spaceImageTwo = new Image();
  spaceImageTwo.src = './img/earth.jpg';

  const astronautFalling = new Image();
  astronautFalling.src = './img/astronautfalling.png';

  const fireball = new Image();
  fireball.src = './img/fireball.png';

  const sideFireBall = new Image();
  sideFireBall.src = './img/sideball.png';

  // ???

  spaceImage.onload = () => {
    updateSpace(); // ???
  };

  //object with properties
  const spaceImageObject = {
    img: spaceImage,
    img2: spaceImageTwo,
    //y axis  this will etermine if it goes up and down
    y: 0,
    speed: 0.1,

    move() {
      this.y -= this.speed;

      // 0 %= 400
      this.y %= myCanvas.height; // ?
    },

    draw() {
      ctx.drawImage(this.img, 0, this.y, 800, 400);
      ctx.drawImage(this.img2, 0, this.y, 800, 400);

      if (this.speed < 0) {
        ctx.drawImage(this.img, 0, this.y + this.img.height, 800, 400);
      } else {
        // this.y = 0 + - 0.1 + 400
        ctx.drawImage(this.img, 0, this.y + myCanvas.height, 800, 400); // ?
      }
    },
  };

  // let gravity = 0.001;

  //  changed this into a class so we could run a for loop to make a bunch of them

  const myFireballs = [];

  class Fireballs {
    constructor(ctx) {
      this.img = fireball;
      this.ctx = ctx; // ?
      this.width = 40;
      this.height = 40;
      this.x = Math.floor(Math.random() * 800); // number between 0 and 800
      this.y = 0;
      this.vx = 1;
      this.vy = 0.8;
    }

    move() {
      this.y += 1;
    }
    draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    velocity() {
      this.x += this.vx;
      this.y += this.vy;
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

  let count = 0;

  function increment() {
    count = count + 1;
    liftedUp.textContent = count;
    if (count > 30) {
      levelUp.textContent = 2;
    }
    if (count > 50) {
      levelUp.textContent = 3;
    }
  }

  // end of each level clear it and start fresh on next level

  // we set an interval here  cause we want it to keep going and we dont need an ID because we arent stopping it.

  function minus() {
    count--;
    liftedUp.textContent = count;
  }
  setInterval(minus, 2000);

  const astro = {
    img: astronautFalling,
    x: 400,
    y: 40,
    vx: 0.2,
    vy: 1.2,
    width: 50,
    height: 100,
    health: 100,

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

    //     alert('yo');
    //   }

    // gravity: function () {
    //   this.vy += gravity;
    //   this.vx aFireball
    // },
  };
  function onFire(aFireball) {
    if (
      astro.x < aFireball.x + aFireball.width &&
      astro.x + astro.width > aFireball.x &&
      astro.y < aFireball.y + aFireball.width &&
      astro.y + astro.height > aFireball.y
    ) {
      console.log('dying');
    }
  }

  //   class Increment {
  // constructor(){
  //   this.currentTime = 0;
  //   this.invervalId = null;
  // }

  //   }

  // function onFire(aFireball) {
  //   if (astro.leftBorder() + this.width > Fireballs.leftSide()) {
  //     alert('yo');
  //   }
  // }
  const mysideBalls = [];

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

  let start = 0;
  function updateSpace(timestamp) {
    //every second

    // 1 / 1000 mi = 1 fps 10/1000  = 1/100
    if (timestamp - start > 8) {
      // console.log(`current time in game loop  ${timestamp}`);
      spaceImageObject.move();
      frame += 1;

      if (frame % 150 === 0) {
        myFireballs.push(new Fireballs(ctx));
      }
      if (frame % 100 === 0 && count >= 10) {
        mysideBalls.push(new sideBalls(ctx));
      }

      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

      spaceImageObject.draw();

      // ctx.drawImage(astronautFalling, 400, 40, 50, 100);
      // meteorShower.draw();
      // meteorShower.velocity();
      // secondFireball.draw();
      // secondFireball.velocity();
      astro.draw();
      astro.velocity();
      // astro.stayAlive();

      for (let i = 0; i < myFireballs.length; i++) {
        myFireballs[i].move();
        myFireballs[i].draw();
        myFireballs[i].velocity();
        onFire(myFireballs[i]);
        // onFire(myFireballs[i]);
      }
      for (let i = 0; i < mysideBalls.length; i++) {
        mysideBalls[i].move();
        mysideBalls[i].draw();
      }

      start = timestamp;
    }
    // console.log(`current time is  ${timestamp}`);
    // spaceImageObject.move();
    // frame += 1;

    // if (frame % 150 === 0) {
    //   myFireballs.push(new Fireballs(ctx));
    // }
    // if (frame % 250 === 0) {
    //   mysideBalls.push(new sideBalls(ctx));
    // }

    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // spaceImageObject.draw();

    // // ctx.drawImage(astronautFalling, 400, 40, 50, 100);
    // // meteorShower.draw();
    // // meteorShower.velocity();
    // // secondFireball.draw();
    // // secondFireball.velocity();
    // astro.draw();
    // astro.velocity();
    // // astro.stayAlive();

    // for (let i = 0; i < myFireballs.length; i++) {
    //   myFireballs[i].move();
    //   myFireballs[i].draw();
    //   myFireballs[i].velocity();
    // }
    // for (let i = 0; i < mysideBalls.length; i++) {
    //   mysideBalls[i].move();
    //   mysideBalls[i].draw();
    // }

    // for (let i = 0; i < myFireballs.length; i++) {
    //   if (astro.onFire(myFireballs[i])) {
    //     console.log('yo');
    //   }
    // }

    // run updatespace in 33 milliseconds
    // console.log('about to call next loop but will wait 8 milsecs before exec');
    // setTimeout(updateSpace, 8);

    // console.log(`current time in request animation frame is  ${timestamp}`);
    requestAnimationFrame(updateSpace); // ? ask //
  }

  window.addEventListener('mousemove', function (e) {
    let x = e.pageX;
    let y = e.pageY;
  });

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 's':
        astro.moveDown();
        sKey.classList.toggle('toggle');
        minus();

        break;
      case 'd':
        astro.moveRight();
        dKey.classList.toggle('toggle');
        break;
      case 'w':
        astro.moveUp();
        wKey.classList.toggle('toggle');
        increment();

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
