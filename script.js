const texts = [
  "Yêu bạn Phương❤️",
  "Bạn Phương đẹp gái🌹",
  "Bạn Phương dễ thương💖",
  "Bạn Phương là nhất✨",
  "Bạn Phương xinh xắn💫",
  "Bạn Phương xinh đẹp💗",
];

const icons = ["❤️", "💖", "💝", "💗", "🌹", "✨", "💫", "⭐"];
const colors = ["#ffffff", "#ff69b4"]; // Chỉ màu trắng và hồng

const container = document.getElementById("container");
const scene = document.getElementById("scene");
let maxElements = 50;
let rotateX = 0,
  rotateY = 0;
let scale = 1;
let isDragging = false;
let startX, startY, lastX, lastY;
const textElements = [];

// Detect mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Adjust settings for mobile
if (isMobile) {
  maxElements = 30; // Reduce elements on mobile for better performance
}

function createTextContainer() {
  const textContainer = document.createElement("div");
  textContainer.className = "text-container";
  scene.appendChild(textContainer);
  return textContainer;
}

function createFloatingText(container) {
  const element = document.createElement("div");
  element.className = "floating-text";

  // 30% là icon, 70% là chữ
  const isIcon = Math.random() < 0.3;
  if (isIcon) {
    element.innerText = icons[Math.floor(Math.random() * icons.length)];
  } else {
    element.innerText = texts[Math.floor(Math.random() * texts.length)];
  }

  // Chỉ sử dụng màu trắng và hồng
  element.style.color = Math.random() < 0.5 ? "#ffffff" : "#ff69b4";

  // Thiết lập layers và vị trí
  const depthLayers = [
    "depth-layer-1",
    "depth-layer-2",
    "depth-layer-3",
    "depth-layer-4",
    "depth-layer-5",
  ];
  const layerIndex = Math.floor(Math.random() * depthLayers.length); // Randomize layer
  const selectedLayer = depthLayers[layerIndex];
  element.classList.add(selectedLayer);

  // Tính toán vị trí ngẫu nhiên trên toàn màn hình
  const viewportWidth = window.innerWidth;
  const spreadWidth = viewportWidth * 0.8; // Sử dụng 80% chiều rộng màn hình
  const x = Math.random() * spreadWidth - spreadWidth / 2; // Vị trí từ -40% đến +40% chiều rộng

  // Độ sâu của các lớp với khoảng cách ngẫu nhiên
  const baseZ = selectedLayer.includes("1")
    ? -250
    : selectedLayer.includes("2")
    ? -125
    : selectedLayer.includes("3")
    ? 0
    : selectedLayer.includes("4")
    ? 125
    : 250;
  const randomZ = baseZ + (Math.random() * 50 - 25); // Thêm độ ngẫu nhiên cho độ sâu

  // Hiệu ứng màu sắc và độ trong suốt - chỉ trắng và hồng
  const depthFactor = Math.abs(randomZ) / 500;
  const isWhite = Math.random() < 0.5;
  const baseColor = isWhite ? "#ffffff" : "#ff69b4";
  
  // Set opacity ban đầu là 0 để fade in
  element.style.opacity = "0";
  element.style.color = baseColor;

  // Tăng cường hiệu ứng phát sáng (giảm trên mobile)
  const glowIntensity = isMobile ? (1 - depthFactor * 0.2) : (1 - depthFactor * 0.4);
  element.style.textShadow = `
        0 0 ${20 * glowIntensity}px currentColor,
        0 0 ${30 * glowIntensity}px currentColor,
        0 0 ${40 * glowIntensity}px currentColor
    `;

  // Thêm rotation ngẫu nhiên ban đầu
  const initialRotation = Math.random() * 20 - 10;

  // Thiết lập transform ban đầu với rotation
  element.style.transform = `
        translate3d(${x}px, -50vh, ${randomZ}px)
        rotateY(${initialRotation}deg)
        rotateX(${Math.random() * 10 - 5}deg)
    `;

  // Thêm element vào container
  container.appendChild(element);

  // Tính toán các thông số chuyển động
  const baseSpeed = isMobile ? 0.03 : 0.05; // Slower on mobile
  const randomFactor = Math.random() * 0.08;
  const layerSpeedFactor = selectedLayer.includes("1")
    ? 0.7
    : selectedLayer.includes("2")
    ? 0.85
    : selectedLayer.includes("3")
    ? 1
    : selectedLayer.includes("4")
    ? 1.15
    : 1.3;

  // Fade in sau độ trễ ngẫu nhiên
  const startDelay = Math.random() * 3000; // Tăng độ trễ tối đa
  setTimeout(() => {
    element.style.opacity = "1";
    element.style.transition = "opacity 0.5s ease-in";
  }, startDelay);

  // Thêm vào mảng textElements với các thuộc tính chuyển động đa dạng hơn
  textElements.push({
    element,
    x,
    z: randomZ,
    speed: (baseSpeed + randomFactor) * layerSpeedFactor,
    y: -50 - Math.random() * 20,
    layer: selectedLayer,
    wobbleSpeed: Math.random() * 0.002 + 0.001,
    wobbleAmount: Math.random() * 0.8 + 0.3,
    startDelay: startDelay,
    rotationSpeed: Math.random() * 0.002 - 0.001,
    verticalWobbleSpeed: Math.random() * 0.003 + 0.001,
    initialScale: 0.8 + Math.random() * 0.4,
    horizontalDrift: Math.random() * 2 - 1,
    rotationOffset: initialRotation,
  });
}

function updateElements() {
  const textContainer = scene.querySelector(".text-container");
  if (!textContainer) return;

  for (let i = textElements.length - 1; i >= 0; i--) {
    const text = textElements[i];
    // Thêm độ trễ ban đầu
    if (Date.now() < text.startDelay) continue;

    // Tính toán chuyển động rơi theo đường cong
    const fallProgress = Math.min((text.y + 50) / 200, 1);
    const easedSpeed = text.speed * (1 - Math.pow(fallProgress, 2) * 0.3);
    text.y += easedSpeed;

    // Tạo chuyển động lắc tự nhiên (giảm trên mobile)
    const time = Date.now() * text.wobbleSpeed;
    const wobbleMultiplier = isMobile ? 0.5 : 1;
    const horizontalWobble =
      Math.sin(time) * text.wobbleAmount * (1 - fallProgress) * wobbleMultiplier;
    const verticalWobble = Math.cos(time * 1.5) * 0.3 * (1 - fallProgress) * wobbleMultiplier;

    // Hiệu ứng xoay nhẹ theo độ sâu
    const rotateAmount =
      text.z > 0
        ? Math.sin(time * 0.5) * 2 * (1 - fallProgress)
        : Math.sin(time * 0.5) * -2 * (1 - fallProgress);

    // Áp dụng transform với các hiệu ứng
    text.element.style.transform = `
            translate3d(
                ${text.x + horizontalWobble * 5}px, 
                ${text.y + verticalWobble}vh, 
                ${text.z}px
            )
            rotateY(${rotateAmount}deg)
            rotateX(${verticalWobble * 2}deg)
            rotateZ(${horizontalWobble * 1.5}deg)
        `;

    // Điều chỉnh opacity dựa trên vị trí
    const fadeStart = 140;
    const fadeEnd = 150;
    if (text.y > fadeStart) {
      const fadeProgress = (text.y - fadeStart) / (fadeEnd - fadeStart);
      text.element.style.opacity = 1 - fadeProgress;
    }

    // Tạo mới khi phần tử đạt đến cuối
    if (text.y > fadeEnd) {
      text.element.remove();
      textElements.splice(i, 1);
      createFloatingText(textContainer); // Tạo mới và push vào textElements trong createFloatingText
    }
  }
  requestAnimationFrame(updateElements);
}

function createParticles() {
  const particleCount = isMobile ? 100 : 200; // Fewer particles on mobile
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    scene.appendChild(particle);
  }
}

function init() {
  createParticles();
  const textContainer = createTextContainer();

  // Tạo text với khoảng cách thời gian ngẫu nhiên
  for (let i = 0; i < maxElements; i++) {
    setTimeout(() => {
      createFloatingText(textContainer);
    }, i * (Math.random() * 300 + 100)); // Khoảng cách thời gian ngẫu nhiên
  }
  updateElements();
}

// Mouse events for desktop
container.addEventListener("mousedown", (e) => {
  if (isMobile) return; // Skip on mobile
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  lastX = rotateY;
  lastY = rotateX;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging || isMobile) return;
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;
  rotateY = lastX + deltaX * 0.5;
  rotateX = lastY + deltaY * 0.5;
  updateSceneTransform();
});

container.addEventListener("mouseup", () => (isDragging = false));
container.addEventListener("mouseleave", () => (isDragging = false));

container.addEventListener("wheel", (e) => {
  if (isMobile) return; // Skip on mobile
  e.preventDefault();
  const delta = e.deltaY * -0.001;
  scale = Math.min(Math.max(0.5, scale + delta), 2);
  updateSceneTransform();
});

// Touch events for mobile
let lastTouchX, lastTouchY;
container.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
    lastX = rotateY;
    lastY = rotateX;
  }
});

container.addEventListener("touchmove", (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  e.preventDefault();
  const touch = e.touches[0];
  const deltaX = touch.clientX - lastTouchX;
  const deltaY = touch.clientY - lastTouchY;
  rotateY = lastX + deltaX * 0.5;
  rotateX = lastY + deltaY * 0.5;
  updateSceneTransform();
});

container.addEventListener("touchend", () => {
  isDragging = false;
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate viewport dimensions
  const viewportWidth = window.innerWidth;
  const isMobileNow = viewportWidth <= 768;
  
  // Update mobile detection if needed
  if (isMobile !== isMobileNow) {
    location.reload(); // Simple solution: reload on orientation change
  }
});

function updateSceneTransform() {
  const textContainer = scene.querySelector(".text-container");
  if (textContainer) {
    textContainer.style.transform = `
      scale(${scale})
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
