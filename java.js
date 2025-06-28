// Toggle navbar on scroll
const header = document.getElementById("header");
const body = document.body;

window.addEventListener("scroll", () => {
  const headerBottom = header.getBoundingClientRect().bottom;
  if (headerBottom <= 0) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});

// Animate zoom using ViewTimeline
function animateZoom() {
  const el = document.querySelector('#zoom > div');
  if (!el) return;
  el.animate(
    [
      { transform: 'scale(3) translateX(10%)' },
      { transform: 'scale(1)' }
    ],
    {
      fill: 'both',
      timeline: new ViewTimeline({ subject: document.querySelector('#zoom') }),
      rangeStart: { rangeName: 'contain', offset: CSS.percent(30) },
      rangeEnd: { rangeName: 'contain', offset: CSS.percent(80) },
    }
  );
}

// Zoom out context function on scroll
window.addEventListener('scroll', () => {
  const bg = document.querySelector('.background');
  const section = document.getElementById('zoom-section');
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;

  const inCenter =
    sectionTop + sectionHeight / 2 < windowHeight * 0.8 &&
    sectionTop + sectionHeight / 2 > windowHeight * 0.2;

  if (inCenter) {
    bg.style.transform = 'scale(1)';
  } else {
    bg.style.transform = 'scale(3)';
  }
});

// Show / hide toggle for paragraph
function toggleDetails(button) {
  const paragraph = button.previousElementSibling;
  paragraph.classList.toggle("show");
  button.innerText = paragraph.classList.contains("show")
    ? "Hide Details"
    : "Show Details";
}

// Form system
function addSkill() {
  const div = document.createElement('div');
  div.className = 'skill-group';
  div.innerHTML = `
    <input type="text" name="skill" placeholder="Enter a skill">
    <button type="button" onclick="removeSkill(this)">Remove</button>
  `;
  document.getElementById('skillsList').appendChild(div);
}

function removeSkill(button) {
  button.parentElement.remove();
}

document.getElementById('fullForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const skillInputs = document.querySelectorAll('input[name="skill"]');
  const skills = [...skillInputs]
    .map(input => input.value.trim())
    .filter(skill => skill !== '');

  const output = document.getElementById('output');
  output.innerHTML = '';
  skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    output.appendChild(li);
  });

  alert("Form submitted! Scroll down to see the skills.");
});

// Pricing calculator
function calculatePrice() {
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const type = document.getElementById("type").value;

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    alert("Please enter valid dimensions.");
    return;
  }

  // Convert cm² to m²
  const area = (width / 100) * (height / 100); // m²

  let pricePerSqM = 0;

  switch (type) {
    case "clear":
      pricePerSqM = 50;
      break;
    case "tempered":
      pricePerSqM = 80;
      break;
    case "laminated":
      pricePerSqM = 100;
      break;
    case "frosted":
      pricePerSqM = 90;
      break;
    case "tinted":
      pricePerSqM = 95;
      break;
    case "double":
      pricePerSqM = 120;
      break;
    case "lowe":
      pricePerSqM = 140;
      break;
  }

  const totalPrice = area * pricePerSqM;
  document.getElementById("result").innerText = `Total Price: ${totalPrice.toFixed(2)}EGP`;
}

    