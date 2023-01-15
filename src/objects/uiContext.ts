import BrickColors, { BrickColor } from "../common/Colors";
import { Dots } from "./dot";

export interface UIContext {
  color: BrickColor;
  dotShape: Dots
}

export class UIContextManager {

  palletes: UIContext[];

  constructor() {
    this.palletes = [{color: BrickColors.BLACK, dotShape: Dots.Square}];
  }

  current() {
    return this.palletes[this.palletes.length - 1];
  }

  update(update: UIContext) {
    console.log(update);
    this.palletes.push(update);
  }

}

export class UIToggleSet {
  uiContextManager: UIContextManager
  items: UIToggleItem<Phaser.GameObjects.Shape | Phaser.GameObjects.Graphics>[]

  constructor(scene: Phaser.Scene, uiContextManager: UIContextManager, x: number, y: number, items: UIToggleItemFactory<Phaser.GameObjects.Shape | Phaser.GameObjects.Graphics>[]) {
    this.uiContextManager = uiContextManager;
    this.items = items.map((factory, index) => factory(scene, x + (32 * index), y, this, uiContextManager));
    this.update();
  }

  update() {
    this.items.forEach((item) => item.update())
  }

}



export class UIToggleItem<T extends SHAPE_OR_GRAPHICS> {
  uiContextManager: UIContextManager;

  scene: Phaser.Scene;
  x: number;
  y: number;
  uiToggleSet: UIToggleSet;
  gameObject: T;

  updateUIContext: UpdateUIContext;
  isActive: IsActive;
  private updateGameObject: UpdateGameObject<SHAPE_OR_GRAPHICS>

  static SHAPE_TOGGLE(shape: Phaser.GameObjects.Shape, active: boolean) {
    if (active) {
      shape.setFillStyle(BrickColors.WHITE)
    } else {
      shape.setFillStyle(BrickColors.BLACK)
    }
  }
  static GRAPHICS_TOGGLE(graphics: Phaser.GameObjects.Graphics, active: boolean) {
    if (active) {
      graphics.fillStyle(BrickColors.WHITE);
      graphics.fill();
    } else {
      graphics.fillStyle(BrickColors.BLACK);
      graphics.fill();
    }
  }

  constructor (
    scene: Phaser.Scene,
    x: number,
    y: number,
    uiToggleSet: UIToggleSet,
    drawFunc: DrawOnScene,
    isActive: IsActive,
    uiContextManager: UIContextManager,
    updateUIContext: UpdateUIContext,
    updateGameObject: UpdateGameObject<T>)
    {

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.gameObject = drawFunc(scene, x, y) as T;
    this.uiContextManager = uiContextManager;
    this.uiToggleSet = uiToggleSet;
    this.isActive = isActive;
    this.updateUIContext = updateUIContext;
    this.updateGameObject = (gameObject: SHAPE_OR_GRAPHICS, active) => { updateGameObject(gameObject as T, active) };

    const shapeShape = this.gameObject as Phaser.GameObjects.Shape;
    if (shapeShape.setFillStyle !== undefined) {
      this.gameObject.setInteractive();
    } else {
      this.gameObject.setInteractive(new Phaser.Geom.Rectangle(x - 16, y - 16, 32, 32), Phaser.Geom.Rectangle.Contains)
    }
    this.gameObject.on('pointerup', this.clickHandler, this);
  }

  clickHandler() {
    this.uiContextManager.update(
      this.updateUIContext(this.uiContextManager.current())
    );
    this.uiToggleSet.update();
  }

  update() {
    const isActive = this.isActive(this.uiContextManager.current());
    this.updateGameObject(this.gameObject as T, isActive)
  }
}

type SHAPE_OR_GRAPHICS = Phaser.GameObjects.Shape | Phaser.GameObjects.Graphics;

export type UIToggleItemFactory<T extends SHAPE_OR_GRAPHICS> = (scene: Phaser.Scene, x: number, y: number, uiToggleSet: UIToggleSet, uiContextManager: UIContextManager) => UIToggleItem<T>;

type DrawOnScene =  (scene: Phaser.Scene, x: number, y: number)  => Phaser.GameObjects.Shape | Phaser.GameObjects.Graphics;
type UpdateUIContext = (current: UIContext) => UIContext;
type IsActive = (current: UIContext) => boolean;
type UpdateGameObject<T extends SHAPE_OR_GRAPHICS> = (gameObject: T, active: boolean) => void;

export function uiToggleItemFactory<T extends SHAPE_OR_GRAPHICS> (
  drawFunc: DrawOnScene,
  updateUIContext: UpdateUIContext,
  isActive: IsActive,
  updateGameObject: UpdateGameObject<T>
  ): UIToggleItemFactory<T> {
  return (scene: Phaser.Scene, x: number, y: number, uiToggleSet: UIToggleSet, uiContextManager: UIContextManager) => {
    return new UIToggleItem<T>(scene, x, y, uiToggleSet, drawFunc, isActive, uiContextManager, updateUIContext, updateGameObject);
  }
}

// export function uiToggleItemFactory<T extends SHAPE_OR_GRAPHICS> (
//   drawFunc: DrawOnScene,
//   updateUIContext: UpdateUIContext,
//   isActive: IsActive,

//   ) {

//   return {
//     setUpdateGraphics(f: (graphics: Phaser.GameObjects.Graphics, active: boolean) => void) {
//       return (scene: Phaser.Scene, x: number, y: number, uiToggleSet: UIToggleSet, uiContextManager: UIContextManager) => {
//         return new UIToggleItem<T>(scene, x, y, uiToggleSet, drawFunc, isActive, uiContextManager, updateUIContext, f);
//       }
//     },
//     setUpdateShape(f: (shape: Phaser.GameObjects.Shape, active: boolean) => void) {
//       return (scene: Phaser.Scene, x: number, y: number, uiToggleSet: UIToggleSet, uiContextManager: UIContextManager) => {
//         return new UIToggleItem<T>(scene, x, y, uiToggleSet, drawFunc, isActive, uiContextManager, updateUIContext, f);
//       }
//     }
//   }
// }

export class UIPallete {



}