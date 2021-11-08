class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intId = null;
    this.deltaTime = 0;
  }

  start() {
    this.intId = setInterval(() => {
      const currentDate = new Date();
      this.deltaTime = this.targetDate - currentDate;
      const { days, hours, mins, secs } = this.getTimeComponents(
        this.deltaTime
      );
      this.insertValues(days, hours, mins, secs);

      if (this.deltaTime <= 0) {
        clearInterval(this.intId);

        this.insertValues(0, 0, 0, 0);
      }
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    this.deltaTime = time;
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  insertValues(d, h, m, s) {
    const markup = document.querySelector(this.selector);

    markup.querySelector('[data-value="days"]').textContent = `${d}`;
    markup.querySelector('[data-value="hours"]').textContent = `${h}`;
    markup.querySelector('[data-value="mins"]').textContent = `${m}`;
    markup.querySelector('[data-value="secs"]').textContent = `${s}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022'),
});

const newTimer = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Apr 03, 2022'),
});

timer.start();

newTimer.start();
