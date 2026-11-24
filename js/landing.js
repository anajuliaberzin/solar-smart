const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = document.querySelector('.scene');
const panelStack = document.getElementById('panel-stack');

if (panelStack) {
  const top = panelStack.querySelector('.panel-top');

  for (let layerIndex = 1; layerIndex <= 7; layerIndex += 1) {
    const layer = document.createElement('div');
    layer.className = 'panel-layer';
    layer.style.transform = `translateZ(-${layerIndex * 2}px)`;
    layer.style.filter = `brightness(${1 - layerIndex * 0.075})`;
    panelStack.insertBefore(layer, top);
  }
}

if (scene && !reducedMotion) {
  scene.addEventListener('pointermove', (event) => {
    const bounds = scene.getBoundingClientRect();
    const relativeX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const rotation = (relativeX * 34) - 17;
    scene.style.setProperty('--rz', `${rotation}deg`);
  });

  scene.addEventListener('pointerleave', () => {
    scene.style.setProperty('--rz', '0deg');
  });
}

const billRange = document.getElementById('bill-range');
const billValue = document.getElementById('bill-value');
const annualSavings = document.getElementById('annual-savings');
const savingsProgress = document.getElementById('savings-progress');
const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

if (billRange && billValue && annualSavings && savingsProgress) {
  let animationFrame = 0;
  let displayedSavings = 0;

  const updateEstimate = () => {
    const monthlyBill = Number(billRange.value);
    const targetSavings = monthlyBill * 12 * 0.85;
    const minimum = Number(billRange.min);
    const maximum = Number(billRange.max);
    const progress = ((monthlyBill - minimum) / (maximum - minimum)) * 100;

    billValue.textContent = currency.format(monthlyBill);
    savingsProgress.style.width = `${progress}%`;
    window.cancelAnimationFrame(animationFrame);

    if (reducedMotion) {
      displayedSavings = targetSavings;
      annualSavings.textContent = currency.format(targetSavings);
      return;
    }

    const startValue = displayedSavings;
    const startTime = performance.now();
    const duration = 500;

    const animateCount = (time) => {
      const progressRatio = Math.min(1, (time - startTime) / duration);
      const easedProgress = 1 - ((1 - progressRatio) ** 3);
      displayedSavings = Math.round(startValue + ((targetSavings - startValue) * easedProgress));
      annualSavings.textContent = currency.format(displayedSavings);

      if (progressRatio < 1) {
        animationFrame = window.requestAnimationFrame(animateCount);
      }
    };

    animationFrame = window.requestAnimationFrame(animateCount);
  };

  billRange.addEventListener('input', updateEstimate);
  updateEstimate();
}
