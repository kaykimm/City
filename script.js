const input = document.getElementById('cityInput');
const output = document.getElementById('output');

// 글자 입력 → 이미지 출력 (최대 10자 제한)
input.addEventListener('input', () => {
  let text = input.value.toLowerCase().replace(/[^a-z]/g, '');

  // 👉 11자 이상이면 잘라내고 input value도 갱신
  if (text.length > 10) {
    text = text.slice(0, 10);
    input.value = text;

    const warning = document.getElementById('warningMessage');
    if (warning) {
      warning.style.opacity = 1;
      setTimeout(() => {
        warning.style.opacity = 0;
      }, 1500);
    }
  }

  output.innerHTML = '';

  const maxWidth = output.clientWidth;
  const letterCount = text.length;

  if (letterCount === 0) return;

  if (letterCount <= 3) {
    // 1~3글자: 크지만 균형잡힌 사이즈
    let baseHeight = 350;
    if (letterCount === 1) baseHeight = 400;
    if (letterCount === 3) baseHeight = 320;

    for (let char of text) {
      const img = document.createElement('img');
      img.src = `alphabet/${char}.png`;
      img.alt = char;
      img.style.height = `${baseHeight}px`;
      img.style.width = 'auto';
      img.style.margin = '0 4px';
      img.style.display = 'block';
      output.appendChild(img);
    }
  } else {
    // 4글자 이상: 자동으로 선 안에 꽉 채우기
    const letterWidth = maxWidth / letterCount;

    for (let char of text) {
      const img = document.createElement('img');
      img.src = `alphabet/${char}.png`;
      img.alt = char;
      img.style.width = `${letterWidth}px`;
      img.style.height = 'auto';
      img.style.margin = '0';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
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
saveBtn.addEventListener('click', async () => {
  const isDark = document.body.classList.contains('dark-mode');
  const images = Array.from(document.querySelectorAll('.image-output img'));
  const text = input.value.toUpperCase();

  if (images.length === 0) return;

  // ⭐ 이미지 로딩 완료 확인
  await Promise.all(images.map(img => {
    return new Promise(resolve => {
      if (img.complete && img.naturalWidth > 0) resolve();
      else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  }));

  const padding = 60;
  const spacing = 16;
  const scale = 3;

  let totalWidth = -spacing;
  let maxHeight = 0;

  images.forEach(img => {
    const height = parseInt(img.style.height) || 300;
    const ratio = img.naturalWidth / img.naturalHeight || 1;
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

  ctx.fillStyle = isDark ? '#000000' : '#ffffff';
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

  let x = (canvas.width / scale - totalWidth) / 2;
  const yCenter = canvas.height / scale / 2 - fontSize;

  images.forEach(img => {
    const y = yCenter - img._drawHeight / 2;
    ctx.filter = isDark ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.1)' : 'none';
    ctx.drawImage(img, x, y, img._drawWidth, img._drawHeight);
    x += img._drawWidth + spacing;
  });

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
