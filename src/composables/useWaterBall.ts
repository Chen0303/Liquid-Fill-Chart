export type WaveColors = {
  waveColor1: string;
  waveColor2: string;
};

/**
 * Get wave colors based on water level percentage
 *
 * Rules:
 * - 0 ~ 50%   : Green (normal)
 * - 50 ~ 75%  : Blue (warning)
 * - > 75%     : Red (critical)
 */
export function getWaveColors(value: number): WaveColors {
  if (value <= 50) {
    return {
      waveColor1: "rgba(0, 200, 100, 0.5)",
      waveColor2: "rgb(0, 200, 100)",
    };
  }

  if (value <= 75) {
    return {
      waveColor1: "rgba(28, 134, 209, 0.5)",
      waveColor2: "#1c86d1",
    };
  }

  return {
    waveColor1: "rgba(220, 50, 50, 0.5)",
    waveColor2: "rgb(220, 50, 50)",
  };
}

/**
 * Create WaterBall animation
 */
export function createWaterBall(
  canvas: HTMLCanvasElement,
  value: number
) {
  const ctx = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let r = 0; // radius
  let cR = 0;  // inner circle radius
  let xOffset = 0; // Wave animation offset

  const waveWidth = 0.1; // Wave amplitude
  const waveHeight = 8; // Wave amplitude
  const speed = 0.04; // Wave movement speed

  /**
   * Resize canvas based on parent element
   */
  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.width;
    r = height / 2;
    cR = r - 5;
  }

  /**
   * Draw circular container and clip drawing area
   */
  function drawCircle() {
    ctx.beginPath();
    ctx.arc(r, r, cR, 0, Math.PI * 2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(r, r, cR, 0, Math.PI * 2);
    ctx.fillStyle = "#161e37";
    ctx.fill();

    ctx.clip();
  }

  /**
   * Draw a sine wave
   *
   * @param offset - Horizontal animation offset
   * @param color  - Wave fill color
   */
  function drawSin(xOffset: number, color: string) {
    ctx.save();
    ctx.beginPath();

    // Sine wave formula
    for (let x = 0; x <= width; x++) {
      const y = Math.sin(-x * waveWidth + xOffset) * 0.8 + 0.1;
      const dY = height * (1 - value / 100);
      ctx.lineTo(x, dY + y * waveHeight);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawText() {
    ctx.save();
    const size = cR * 0.3;
    ctx.font = `bold ${size}px Arial`;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`${value}%`, r, r + size / 2);
    ctx.restore();
  }

  /**
   * Main render loop
   */
  function render() {
    ctx.clearRect(0, 0, width, height);

    const { waveColor1, waveColor2 } = getWaveColors(value);

    drawCircle();
    drawSin(xOffset + Math.PI * 0.5, waveColor1);
    drawSin(xOffset, waveColor2);
    drawText();

    xOffset += speed;
    requestAnimationFrame(render);
  }

  resize();
  render();

  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement!);

  /**
   * Cleanup function
   */
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
