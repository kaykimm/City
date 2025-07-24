// // ===== JavaScript =====
// const input = document.getElementById('cityInput');
// const output = document.getElementById('output');

// input.addEventListener('input', () => {
//   const text = input.value.toLowerCase().replace(/[^a-z]/g, '');
//   output.innerHTML = '';

//   const maxOutputWidth = output.clientWidth;
//   const maxOutputHeight = output.clientHeight;
//   const letterCount = text.length;

//   if (letterCount === 0) return;

//   const spacing = 12;
//   const maxImageHeight = maxOutputHeight * 0.95; // buffer for safety
//   const imageAspectRatio = 0.75; // estimated aspect ratio (width/height)

//   const estimatedImageWidth = maxOutputWidth / letterCount - spacing;
//   let imageHeight = estimatedImageWidth / imageAspectRatio;
//   imageHeight = Math.min(imageHeight, maxImageHeight);

//   for (let char of text) {
//     const img = document.createElement('img');
//     img.src = `alphabet/${char}.png`;
//     img.alt = char;
//     img.style.height = `${imageHeight}px`;
//     img.style.width = 'auto';
//     img.style.margin = '0 6px';
//     output.appendChild(img);
//   }
// });

// // ===== Mode Toggle =====
// const lightBtn = document.getElementById('lightModeBtn');
// const darkBtn = document.getElementById('darkModeBtn');

// lightBtn.addEventListener('click', () => {
//   document.body.classList.remove('dark-mode');
// });

// darkBtn.addEventListener('click', () => {
//   document.body.classList.add('dark-mode');
// });

// // ===== Save Button =====
// const saveBtn = document.getElementById('saveBtn');

// saveBtn.addEventListener('click', () => {
//   const isDark = document.body.classList.contains('dark-mode');
//   const images = Array.from(document.querySelectorAll('.image-output img'));

//   if (images.length === 0) return;

//   const padding = 50;
//   const spacing = 12;
//   const scale = 2;

//   let totalWidth = -spacing;
//   let maxHeight = 0;

//   images.forEach(img => {
//     const height = parseInt(img.style.height);
//     const ratio = img.naturalWidth / img.naturalHeight;
//     const width = height * ratio;

//     img._drawWidth = width;
//     img._drawHeight = height;

//     totalWidth += width + spacing;
//     maxHeight = Math.max(maxHeight, height);
//   });

//   const canvas = document.createElement('canvas');
//   canvas.width = (totalWidth + padding * 2) * scale;
//   canvas.height = Math.max(canvas.width * 0.65, (maxHeight + padding * 2) * scale);
//   const ctx = canvas.getContext('2d');
//   ctx.scale(scale, scale);

//   ctx.fillStyle = isDark ? '#000000' : '#ffffff';
//   ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

//   let x = (canvas.width / scale - totalWidth) / 2;
//   const yCenter = canvas.height / scale / 2;

//   images.forEach(img => {
//     const y = yCenter - img._drawHeight / 2;
//     ctx.filter = isDark ? 'invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.1)' : 'none';
//     ctx.drawImage(img, x, y, img._drawWidth, img._drawHeight);
//     x += img._drawWidth + spacing;
//   });

//   const link = document.createElement('a');
//   link.download = 'my_city.png';
//   link.href = canvas.toDataURL('image/png');
//   link.click();
// });
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
    imageHeight = Math.max(180, Math.min(estimatedWidthPerLetter - 5, 400));
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
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / scale / 2, canvas.height / scale - padding / 2);

  const link = document.createElement('a');
  link.download = 'my_city.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
