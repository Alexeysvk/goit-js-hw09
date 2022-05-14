import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', submitPromise);

function submitPromise(e) {
  e.preventDefault();
  const init = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  let position = 0;

  setInterval(() => {
    if (position === amount) { return; }
    position += 1;
    const delay = init + step * (position-1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  },1);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => { 
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(({position, delay}));
  } else {
        reject(({position, delay}));
  }
  },delay)
  })
}
