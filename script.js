const input = document.getElementById('cityInput');
const output = document.getElementById('output');

input.addEventListener('input', () => {
  const text = input.value.toLowerCase().replace(/[^a-z]/g, '');
  output.innerHTML = '';

  const maxWidth = output.clientWidth;
  const letterCount = text.length;

  if (letterCount === 0) return;

  // 1~3글자는 원래대로 크게 출력
  if (letterCount <= 3) {
    for (let char of text) {
      const img = document.createElement('img');
      img.src = `alphabet/${char}.png`;
      img.alt = char;
      img.style.height = '400px';
      img.style.width = 'auto';
      img.style.margin = '0 6px';
      output.appendChild(img);
    }
  } else {
    // 4글자 이상은 가로폭 맞춰서 자동 크기 조절
    const letterWidth = maxWidth / letterCount;

    for (let char of text) {
      const img = document.createElement('img');
      img.src = `alphabet/${char}.png`;
      img.alt = char;
      img.style.width = `${letterWidth}px`;
      img.style.height = 'auto';
      img.style.margin = '0';
      img.style.objectFit = 'contain';
      output.appendChild(img);
    }
  }
});


// 모드 토글
const lightBtn = document.getElementById('lightModeBtn');
const darkBtn = document.getElementById('darkModeBtn');

lightBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
});

darkBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
});

// 저장 버튼
const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  const images = Array.from(document.querySelectorAll('.image-output img'));
  const text = input.value.toUpperCase();

  if (images.length === 0) return;

  const padding = 60;
  const spacing = 16;
  const scale = 3;

  let totalWidth = -spacing;
  let maxHeight = 0;

  images.forEach(img => {
    const height = parseInt(img.style.height);
    const ratio = img.naturalWidth / img.naturalHeight;
    const width = height * ratio;

    img._drawWidth = width;
    img._drawHeight = height;

    totalWidth += width + spacing;
    maxHeight = Math.max(maxHeight, height);
  });

  const fontSize = 12;
  const canvas = document.createElement('canvas');
  canvas.width = (totalWidth + padding * 2) * scale;
  canvas.height = (maxHeight + padding * 2 + fontSize * 4) * scale;

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // 배경 설정
  ctx.fillStyle = isDark ? '#000000' : '#ffffff';
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

  // 글자 이미지 렌더링
  let x = (canvas.width / scale - totalWidth) / 2;
  const yCenter = canvas.height / scale / 2 - fontSize;

  images.forEach(img => {
    const y = yCenter - img._drawHeight / 2;

    ctx.filter = isDark ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.1)' : 'none';
    ctx.drawImage(img, x, y, img._drawWidth, img._drawHeight);
    x += img._drawWidth + spacing;
  });

  // 아래 텍스트 출력
  ctx.filter = 'none';
  ctx.fillStyle = isDark ? '#ffffff' : '#000000';
  ctx.font = `11px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / scale / 2, canvas.height / scale - padding / 2);

  const link = document.createElement('a');
  link.download = 'Make_Your_City.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

let isRaining = false;

document.getElementById('rainToggleBtn').addEventListener('click', () => {
  const container = document.getElementById('rainContainer');

  if (isRaining) {
    container.innerHTML = ''; // 비 멈추기
    isRaining = false;
    document.getElementById('rainToggleBtn').textContent = '비 내리기';
  } else {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (0.8 + Math.random()) + 's';
      drop.style.animationDelay = Math.random() + 's';
      container.appendChild(drop);
    }
    isRaining = true;
    document.getElementById('rainToggleBtn').textContent = '비 멈추기';
  }
});
