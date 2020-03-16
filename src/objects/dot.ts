import { BrickColor } from "../common/Colors";
import drawQuarterCircle from "../common/QuarterCircle";
import { UIContextManager } from "./uiContext";

interface BaseDot {
  destroy: () => void
}
export type Dot = BaseDot & (SquareDot | CircleDot | QuarterDotTopRight | QuarterDotBottomLeft | QuarterDotBottomRight | QuarterDotTopLeft);

export enum Dots {
  "Square" = "square",
  "Circle" = "circle",
  "QuarterUpRight" = "quarter-up-right",
  "QuarterBottomRight" = "quarter-bottom-right",
  "QuarterBottomLeft" = "quarter-bottom-left",
  "QuarterUpLeft" = "quarter-up-left",
}



export class SquareDot implements BaseDot {

  color: BrickColor;

  x: number;
  y: number;

  gameObject: Phaser.GameObjects.Shape;


  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.gameObject = scene.add.rectangle(x, y, 30, 30, color);
  }

  destroy(): void {
    this.gameObject.destroy();
  }
}

export class CircleDot {

  color: BrickColor;

  x: number;
  y: number;

  gameObject: Phaser.GameObjects.Shape;

  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.gameObject = scene.add.ellipse(x, y, 30, 30, color);

  }

  destroy(): void {
    this.gameObject.destroy();
  }
}

export class QuarterDotBottomRight {
  color: BrickColor;
  x: number;
  y: number;
  graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.graphics = drawQuarterCircle(scene, color, "bottomRight", x, y, 30);
  }

  destroy(): void {
    this.graphics.destroy();
  }
}

export class QuarterDotTopRight {
  color: BrickColor;
  x: number;
  y: number;
  graphics: Phaser.GameObjects.Graphics;


  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.graphics = drawQuarterCircle(scene, color, "topRight", x, y, 30);
  }
  destroy(): void {
    this.graphics.destroy();
  }
}

export class QuarterDotBottomLeft {
  color: BrickColor;
  x: number;
  y: number;
  graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.graphics = drawQuarterCircle(scene, color, "bottomLeft", x, y, 30);
  }
  destroy(): void {
    this.graphics.destroy();
  }
}

export class QuarterDotTopLeft {
  color: BrickColor;
  x: number;
  y: number;
  graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, color: BrickColor) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.graphics = drawQuarterCircle(scene, color, "topLeft", x, y, 30);
  }
  destroy(): void {
    this.graphics.destroy();
  }
}

export function dotFactory(scene: Phaser.Scene, x: number, y: number): Dot {

  const uiContextManager = scene.registry.get("UIContextManager") as UIContextManager;
  const uiContext = uiContextManager.current();

  switch (uiContext.dotShape) {
    case "circle":
      return new CircleDot(scene, x, y, uiContext.color);
    case "square":
      return new SquareDot(scene, x, y, uiContext.color);
    case "quarter-up-right":
      return new QuarterDotTopRight(scene, x, y, uiContext.color);
    case "quarter-bottom-right":
      return new QuarterDotBottomRight(scene, x, y, uiContext.color);
    case "quarter-up-left":
      return new QuarterDotTopLeft(scene, x, y, uiContext.color);
    case "quarter-bottom-left":
      return new QuarterDotBottomLeft(scene, x, y, uiContext.color);
  }

  throw Error("unreachable code");
}