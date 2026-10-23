const cards = Array.from(document.querySelectorAll('.card'));
const dotsContainer = document.getElementById('dots');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const carousel = document.getElementById('carousel');

let current = 0;
const total = cards.length;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(document.querySelectorAll('.dot'));

function update() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next', 'hidden');

    if (i === current) {
      card.classList.add('active');
    } else if (i === (current - 1 + total) % total) {
      card.classList.add('prev');
    } else if (i === (current + 1) % total) {
      card.classList.add('next');
    } else {
      card.classList.add('hidden');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

function goTo(index) {
  current = (index + total) % total;
  update();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// Drag / Swipe support
let startX = 0;
let isDragging = false;

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.clientX - startX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? prev() : next();
  }
});

window.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? prev() : next();
  }
});

// Optional autoplay (uncomment if wanted)
// setInterval(next, 4500);

// Initial render
update();