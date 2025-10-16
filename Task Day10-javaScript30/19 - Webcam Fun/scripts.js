// DOM Elements
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const brightness = document.querySelector('#brightness');
const contrast = document.querySelector('#contrast');
const smooth = document.querySelector('#smooth');
const filterButtons = document.querySelectorAll('.filters button');
const stickerSelect = document.querySelector('#stickerSelect');

let currentFilter = 'normal';
let currentSticker = '';
let isDrawing = false;

// Get webcam video
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error('Webcam access denied:', err);
      alert('Please allow webcam access to use YouCam Perfect.');
    });
}

// Paint video to canvas with real-time GPU filters
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  const draw = () => {
    // Build filter string dynamically
    let filterStr = '';
    
    switch (currentFilter) {
      case 'grayscale':
        filterStr = 'grayscale(100%) ';
        break;
      case 'sepia':
        filterStr = 'sepia(100%) ';
        break;
      case 'vivid':
        filterStr = 'saturate(1.5) ';
        break;
      case 'cool':
        filterStr = 'hue-rotate(180deg) ';
        break;
      case 'warm':
        filterStr = 'hue-rotate(-30deg) ';
        break;
      default:
        filterStr = '';
        break;
    }
    
    // Add slider values (sliders typically output 0-200 or 0-2, need to check)
    const brightnessVal = brightness ? brightness.value : '1';
    const contrastVal = contrast ? contrast.value : '1';
    const smoothVal = smooth ? smooth.value : '0';
    
    filterStr += `brightness(${brightnessVal}) contrast(${contrastVal}) blur(${smoothVal}px)`;

    // Apply filter and draw
    ctx.filter = filterStr;
    console.log('Applying filter:', filterStr); // Debug log
    ctx.drawImage(video, 0, 0, width, height);

    // Draw sticker
    if (currentSticker) {
      ctx.filter = 'none';
      ctx.font = `${Math.floor(width / 6)}px Arial`;
      ctx.fillText(currentSticker, width / 2.5, height / 2.5);
    }

    // Keep looping
    requestAnimationFrame(draw);
  };

  // Start the loop
  if (!isDrawing) {
    isDrawing = true;
    draw();
    console.log('Animation loop started!');
  }
}

// Take snapshot
function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'youcam-perfect');
  link.innerHTML = `<img src="${data}" alt="YouCam Capture" />`;
  strip.insertBefore(link, strip.firstChild);
}

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter || btn.textContent.toLowerCase();
    console.log('Filter changed to:', currentFilter);
  });
});

// Sticker selection
if (stickerSelect) {
  stickerSelect.addEventListener('change', e => {
    currentSticker = e.target.value;
  });
}

// Initialize
getVideo();

// Start painting when video is ready
video.addEventListener('canplay', () => {
  console.log('Video ready, starting canvas painting...');
  paintToCanvas();
});

// Backup: also try on playing event
video.addEventListener('playing', () => {
  console.log('Video playing event fired');
  paintToCanvas();
});