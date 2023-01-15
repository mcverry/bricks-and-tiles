import Phaser from 'phaser';
import BrickColors from '../common/Colors';
import drawQuarterCircle from '../common/QuarterCircle';
import { Dots } from '../objects/dot';
import Plate from '../objects/plate';
import { UIContext, UIContextManager, UIToggleItem, uiToggleItemFactory, UIToggleSet } from '../objects/uiContext';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const uiContextManager = new UIContextManager();

    this.registry.set("UIContextManager", uiContextManager);

    new UIToggleSet(this, uiContextManager, 500, 20, [
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return scene.add.rectangle(x, y, 28, 28, BrickColors.BLACK);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.Square}},
        (context: UIContext) => { return context.dotShape === Dots.Square},
        UIToggleItem.SHAPE_TOGGLE),
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return scene.add.ellipse(x, y, 28, 28, BrickColors.BLACK);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.Circle}},
        (context: UIContext) => { return context.dotShape === Dots.Circle},
        UIToggleItem.SHAPE_TOGGLE),
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return drawQuarterCircle(scene, BrickColors.BLACK, "topRight", x, y, 28);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.QuarterUpRight}},
        (context: UIContext) => { return context.dotShape === Dots.QuarterUpRight},
        UIToggleItem.GRAPHICS_TOGGLE),
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return drawQuarterCircle(scene, BrickColors.BLACK, "bottomRight", x, y, 28);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.QuarterBottomRight}},
        (context: UIContext) => { return context.dotShape === Dots.QuarterBottomRight}
        , UIToggleItem.GRAPHICS_TOGGLE),
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return drawQuarterCircle(scene, BrickColors.BLACK, "bottomLeft", x, y, 28);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.QuarterBottomLeft}},
        (context: UIContext) => { return context.dotShape === Dots.QuarterBottomLeft},
        UIToggleItem.GRAPHICS_TOGGLE),
      uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return drawQuarterCircle(scene, BrickColors.BLACK, "topLeft", x, y, 28);
        },
        (context: UIContext) => { return {...context, dotShape: Dots.QuarterUpLeft}},
        (context: UIContext) => { return context.dotShape === Dots.QuarterUpLeft},
        UIToggleItem.GRAPHICS_TOGGLE),
    ]
    );

    const colors = Object.values(BrickColors);
    const colorFactories = colors.map((color) => {
      return uiToggleItemFactory(
        (scene: Phaser.Scene, x: number, y: number) => {
          return scene.add.rectangle(x, y, 28, 28, color);
        },
        (context: UIContext) => { return {...context, color: color}},
        (context: UIContext) => { return context.color === color},
        (game, active) => {}
      )
    })

    new UIToggleSet(this, uiContextManager, 500, 60, colorFactories);


    new Plate(this);
  }
}
