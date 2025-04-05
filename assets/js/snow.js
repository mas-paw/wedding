  const canvas = document.getElementById("snow-canvas");
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const flakes = [];

  for (let i = 0; i < 100; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      d: Math.random() + 1
    });
  }

  function drawFlakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  let angle = 0;

  function moveFlakes() {
    angle += 0.01;
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 0.5;

      if (f.y > height) {
        flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d };
      }
    }
  }

  setInterval(drawFlakes, 25);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });