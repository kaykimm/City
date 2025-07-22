const input = document.getElementById('cityInput');
const output = document.getElementById('output');

input.addEventListener('input', () => {
  const text = input.value.toLowerCase().replace(/[^a-z]/g, '');
  output.innerHTML = '';

  const maxWidth = output.clientWidth;
  const letterCount = text.length;
  const maxHeight = 100; // max image height

  const letterWidth = Math.min(maxWidth / letterCount - 5, maxHeight); // 자동 사이즈 조정

  for (let char of text) {
    const img = document.createElement('img');
    img.src = `alphabet/${char}.png`; // a-z 이미지가 여기 들어있어야 해
    img.style.height = `${letterWidth}px`;
    img.style.width = 'auto';
    output.appendChild(img);
  }
});
