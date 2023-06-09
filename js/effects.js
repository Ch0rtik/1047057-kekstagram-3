const image = document.querySelector('.img-upload__preview');
const defaultButton = document.getElementById('effect-none');
const chromeButton = document.getElementById('effect-chrome');
const sepiaButton = document.getElementById('effect-sepia');
const marvinButton = document.getElementById('effect-marvin');
const phobosButton = document.getElementById('effect-phobos');
const heatButton = document.getElementById('effect-heat');
const buttonArray = new Array (defaultButton, chromeButton, sepiaButton, marvinButton, phobosButton, heatButton);

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

let filterEffect = 'none';
let postfix = '';

const eventListeners = new Array(6);

function generateEventListener(button) {
  const eventListener = function() {
    updateEffect(button.value);
  };
  return eventListener;
}

function disassembleEffects() {
  for(let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].removeEventListener('click', eventListeners[i]);
  }
  updateEffect('none');
  sliderElement.noUiSlider.destroy();
}

function setupEffects() {
  createSliderElement();
  for(let i = 0; i < buttonArray.length; i++) {
    eventListeners[i] = generateEventListener(buttonArray[i]);
    buttonArray[i].addEventListener('click', eventListeners[i]);
  }
  return disassembleEffects;
}

function updateEffect(type) {
  let min = 0;
  let max = 0;
  let step = 0;
  switch(type) {
    case 'none':
      filterEffect = 'none';
      min = 1;
      max = 100;
      step = 1;
      postfix = '';
      break;
    case 'chrome':
      filterEffect = 'grayscale';
      min = 0;
      max = 1;
      step = 0.1;
      postfix = '';
      break;
    case 'sepia':
      filterEffect = 'sepia';
      min = 0;
      max = 1;
      step = 0.1;
      postfix = '';
      break;
    case 'marvin':
      filterEffect = 'invert';
      min = 0;
      max = 100;
      step = 1;
      postfix = '%';
      break;
    case 'phobos':
      filterEffect = 'blur';
      min = 0;
      max = 3;
      step = 0.1;
      postfix = 'px';
      break;
    case 'heat':
      filterEffect = 'brightness';
      min = 1;
      max = 3;
      step = 0.1;
      postfix = '';
      break;
    default:
      filterEffect = 'none';
      min = 1;
      max = 100;
      step = 1;
      postfix = '';
  }

  if (filterEffect === 'none') {
    sliderElement.style.visibility = 'hidden';
  } else {
    sliderElement.style.visibility = 'visible';
  }
  updateSlider(min, max, step);
}

function updateSlider(min, max, step) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
}

function createSliderElement() {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    applyEffect(valueElement.value);
  });
  sliderElement.style.visibility = 'hidden';
}

function applyEffect(value) {
  const filterString = filterEffect === 'none'? 'none': `${filterEffect}(${value}${postfix})`;
  image.style.filter = filterString;
}

export {setupEffects};
