const canvas = document.getElementById('canvas');
//description: Image Processing with JavaScript - Grayscale, Histogram Equalization, Morphological Operations, Image Merging
//ctx gets the context of the canvas
//canvas is the area where we draw
const ctx = canvas.getContext('2d');
const histCanvas = document.getElementById('histogram');
const histCtx = histCanvas.getContext('2d');

let image1 = new Image();
let image2 = new Image();
let img1Loaded = false;
let img2Loaded = false;

const uploadImage = document.getElementById('uploadImage');
const uploadImage2 = document.getElementById('uploadImage2');
const grayscale = document.getElementById('grayscale');
const histEq = document.getElementById('histEq');
const morphology = document.getElementById('morphology');
const merge = document.getElementById('merge');

// Load first image
//here the function used here is addEventListener
//explanation of syntax: element.addEventListener(event, function, useCapture);
//here e is the event object comes from the event listener
uploadImage.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  image1.src = URL.createObjectURL(file);
});

image1.onload = () => {
  img1Loaded = true;
  canvas.width = image1.width;
  canvas.height = image1.height;
  updateCanvas();
}

// Load second image
uploadImage2.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  image2.src = URL.createObjectURL(file);
});

image2.onload = () => {
  img2Loaded = true;
  updateCanvas();
}

// Apply transformations and draw
function updateCanvas() {
  if (!img1Loaded) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);

  // Merge second image if loaded
  if (img2Loaded) {
    ctx.globalAlpha = parseFloat(merge.value);
    ctx.drawImage(image2, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;
  }

  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  // Grayscale
  if (grayscale.checked || histEq.checked || morphology.value !== "none") {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i]+data[i+1]+data[i+2])/3;
      data[i] = data[i+1] = data[i+2] = avg;
    }
  }

  // Histogram Equalization
  if (histEq.checked) {
    let hist = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) hist[data[i]]++;
    let cdf = [];
    hist.reduce((a,b,i) => cdf[i]=a+b,0);
    let cdfMin = cdf.find(v=>v>0);
    let total = canvas.width*canvas.height;
    for (let i=0;i<data.length;i+=4){
      let val = Math.round((cdf[data[i]] - cdfMin)/(total-cdfMin)*255);
      data[i] = data[i+1] = data[i+2] = val;
    }
  }

  // Morphological Operations (simple 3x3)
  if (morphology.value !== "none") {
    let w = canvas.width;
    let h = canvas.height;
    let copy = new Uint8ClampedArray(data);
    //algorithm for dilation and erosion
    //first we loop through each pixel except the border pixels
    //then we check the 3x3 neighborhood of each pixel
    //for dilation we take the maximum value in the neighborhood
    //for erosion we take the minimum value in the neighborhood
    //then we set the pixel value to the max or min value
    //after that we put the image data back to the canvas
    for (let y=1; y<h-1; y++){
      for (let x=1; x<w-1; x++){
        let max=0, min=255;
        for (let dy=-1;dy<=1;dy++){
          for (let dx=-1;dx<=1;dx++){
            let idx = ((y+dy)*w + (x+dx))*4;
            if (copy[idx]>max) max=copy[idx];
            if (copy[idx]<min) min=copy[idx];
          }
        }
        let idx = (y*w + x)*4;
        if (morphology.value==="dilate") data[idx]=data[idx+1]=data[idx+2]=max;
        else if (morphology.value==="erode") data[idx]=data[idx+1]=data[idx+2]=min;
      }
    }
  }

  ctx.putImageData(imgData,0,0);
  drawHistogram(imgData);
}

// Draw histogram
function drawHistogram(imgData){
  const hist = new Array(256).fill(0);
  const data = imgData.data;
  for(let i=0;i<data.length;i+=4) hist[data[i]]++;
  const max = Math.max(...hist);
  const scale = histCanvas.height*20/max;
  const barWidth = histCanvas.width/256;

  histCtx.clearRect(0,0,histCanvas.width,histCanvas.height);
  for(let i=0;i<256;i++){
    const h = hist[i]*scale;
    histCtx.fillStyle = 'white';
    histCtx.fillRect(i*barWidth,histCanvas.height-h,barWidth,h);
  }
}

// Event listeners
[grayscale, histEq, morphology, merge].forEach(el=>{
  el.addEventListener('input',updateCanvas);
});


//full workflow of the code
//1. Select an image using the file input element. This triggers the 'change' event listener which loads the image.
//2. Once the image is loaded, the 'onload' event is triggered, setting img1Loaded to true and updating the canvas size.
//3. The updateCanvas function is called to draw the image on the canvas.
//4. If a second image is selected, it is loaded similarly and drawn on top of the first image with adjustable opacity.
//5. If any transformations (grayscale, histogram equalization, morphological operations) are selected, they are applied to the image data.
//6. The modified image data is put back onto the canvas.
//7. The histogram of the current image is calculated and drawn on a separate histogram canvas.
//8. Any changes to the transformation options trigger the updateCanvas function again to reflect the changes in real-time.