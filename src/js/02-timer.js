import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
    start: document.querySelector("button[data-start]"),
    selector: document.getElementById("datetime-picker"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes"),
    seconds: document.querySelector("span[data-seconds]"),
}

ref.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > selectedDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    ref.start.removeAttribute('disabled');
    Notiflix.Notify.success('Selected date is correct')
  },
};

const datePickr = flatpickr(ref.selector, options);

ref.start.addEventListener('click', start);
 
function start() {
  ref.start.disabled = true;
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = datePickr.selectedDates[0].getTime() - currentTime;
    if (deltaTime <= 0) { return; };
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
      ref.days.textContent = `${days}`;
      ref.hours.textContent = `${hours}`;
      ref.minutes.textContent = `${minutes}`;
    ref.seconds.textContent = `${seconds}`;
  },1000)
  }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}