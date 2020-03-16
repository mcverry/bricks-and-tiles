import { BrickColor } from "./Colors";

const degMap = {
  bottomRight: {start:0, end: 90, dx: -1, dy: -1},
  bottomLeft: {start:90, end: 180, dx: 1, dy: -1},
  topLeft:  {start:180, end: 270, dx: 1, dy: 1},
  topRight: {start:270, end: 0, dx: -1, dy: 1},
}

function drawQuarterCircle(scene: Phaser.Scene, color: BrickColor, angle: keyof typeof degMap, x: number, y: number, sz: number): Phaser.GameObjects.Graphics {
  const graphics = scene.add.graphics();

  const m = degMap[angle];
  const h = sz / 2;

  graphics.fillStyle(color, 1.0);
  graphics.beginPath();
  graphics.moveTo(x + (m.dx * h), y + (m.dy * h));
  graphics.arc(x + (m.dx * h), y + (m.dy * h), sz, Phaser.Math.DegToRad(m.start), Phaser.Math.DegToRad(m.end));
  graphics.closePath();
  graphics.fill();

  return graphics;

}
export default drawQuarterCircle;