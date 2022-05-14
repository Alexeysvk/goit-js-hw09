const ref = {
    start: document.querySelector("button[data-start]"),
    stop: document.querySelector("button[data-stop]"),
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

ref.start.addEventListener('click', () => {
  ref.start.disabled = true;
  ref.stop.disabled = false;
  timeId = setInterval(changeBgColor, 1000);
});
ref.stop.addEventListener('click', () => {
  ref.stop.disabled = true;
  ref.start.disabled = false;
  clearInterval(timeId);
});
