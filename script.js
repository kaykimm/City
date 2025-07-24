const input = document.getElementById('cityInput');
const output = document.getElementById('output');

input.addEventListener('input', () => {
  const text = input.value.toLowerCase().replace(/[^a-z]/g, '');
  output.innerHTML = '';

  const maxWidth = output.clientWidth;
  const letterCount = text.length;
  let imageHeight = 450;

  if (letterCount > 0) {
    const estimatedWidthPerLetter = maxWidth / letterCount;
    imageHeight = Math.max(300, Math.min(estimatedWidthPerLetter - 5, 400));
  }

  for (let char of text) {
    const img = document.createElement('img');
    img.src = `alphabet/${char}.png`;
    img.alt = char;
    img.style.height = `${imageHeight}px`;
    img.style.width = 'auto';
    img.style.margin = '0 6px';
    output.appendChild(img);
  }
});

const lightBtn = document.getElementById('lightModeBtn');
const darkBtn = document.getElementById('darkModeBtn');

lightBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
});

darkBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
});

const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  const outputArea = document.getElementById('output');

  html2canvas(outputArea, {
    backgroundColor: isDark ? '#000000' : '#ffffff',
    scale: 2
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'my_city.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
