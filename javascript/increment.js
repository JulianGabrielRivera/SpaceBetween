class Timer {
  constructor() {
    this.score = 0;
    this.intervalId = null;
    // ... your code goes here
  }

  start(callback) {
    // we get an ID so we can clear it later on, this method is adding 1 to current time callback is what function we'll pass it later.
    this.intervalId = setInterval(() => {
      console.log((this.score = this.score + 1));
      callback();
    }, 1000);

    // ... your code goes here
  }
  // getSeconds() {
  //   //this.currenttime holds the seconds then we find the remainder of that by modulos 60 cause 60 is a minute so whatever is left over it returns it.
  //   return this.currentTime % 60;

  //   // ... your code goes here
  // }
  // computeTwoDigitNumber(value) {
  //   // ... your code goes here
  //   if (value < 10) {
  //     return `0${value}`;
  //   } else {
  //     return `${value}`;
  //   }
  // }
}
