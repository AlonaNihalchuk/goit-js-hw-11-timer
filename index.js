const daysRef = document.querySelector('.value[data-value="days"]');
const hoursRef = document.querySelector('.value[data-value="hours"]');
const minsRef = document.querySelector('.value[data-value="mins"]');
const secsRef = document.querySelector('.value[data-value="secs"]');

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.init();
  }
  init() {
    const timeComponents = this.getTimeComponents(0);
    this.onTick(timeComponents);
  }
  start() {
    const targetDate = this.targetDate;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = targetDate - currentTime;
      const timeComponents = this.getTimeComponents(time);
      this.onTick(timeComponents);
    }, 1000);
  }
  stop() {
    if (this.currentTime === this.targetDate) {
      clearInterval(this.intervalId);
      const timeComponents = this.getTimeComponents(0);
      this.onTick(timeComponents);
    }
    return;
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
}

const countTimer = new CountdownTimer({
  targetDate: new Date("Oct 19, 2021"),
  onTick: updateClockface,
});

function updateClockface({ days, hours, mins, secs }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minsRef.textContent = `${mins}`;
  secsRef.textContent = `${secs}`;
}

countTimer.start();
countTimer.stop();
