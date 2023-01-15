import Colors from "../common/Colors";
import { Dot, dotFactory } from "./dot";

const STUD_DIAMETER = 20;
const STUD_TO_EDGE = 5;
const STUD_DISTANCE = STUD_DIAMETER + (STUD_TO_EDGE * 2);
const PLATE_WIDTH = (studs: number) => STUD_DISTANCE * studs;
const STUD_X = (studX: number, offset: number) => (STUD_DISTANCE * (studX + 0.5)) + offset;


const STUD_COLOR = Colors.AQUA;
const STUD_HOVER_COLOR = Colors.BRIGHT_LIGHT_BLUE;

class Stud extends Phaser.GameObjects.Ellipse {

  dot: Dot | null;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, offsetX: number, offsetY: number) {
    super(scene, STUD_X(x, offsetX), STUD_X(y, offsetY), STUD_DIAMETER, STUD_DIAMETER, STUD_COLOR);
    this.scene = scene;
    scene.children.add(this);
    this.setInteractive();
    this.on('pointerup', this.clickHandler, this);
    this.on('pointerover', () => this.setGlow(true), this);
    this.on('pointerout', () => this.setGlow(false), this);
    this.dot = null;
  }


  clickHandler() {
    if (!this.dot) {
      this.dot = dotFactory(this.scene, this.x, this.y);
    } else {
      this.dot.destroy();
      this.dot = null;
    }
  }

  setGlow(glow: boolean) {
    if (glow) {
      this.setFillStyle(STUD_HOVER_COLOR)
    } else {
      this.setFillStyle(STUD_COLOR);
    }

  }

}

function studFactory(scene: Phaser.Scene, w: number, h: number, offsetX: number, offsetY: number): Stud[][] {
  const studs = new Array<Array<Stud>>(w);
  for (let x = 0; x < w; x++) {
    studs[x] = new Array<Stud>(h);
    for (let y = 0; y < h; y++) {
      studs[x][y] = new Stud(scene, x, y, offsetX, offsetY);
    }
  }

  console.log("hello", studs);
  return studs;
}

class Plate {

  width: number;
  height: number;
  x: number;
  y: number;
  originX: number;
  originY: number;

  studsY: number;
  studsX: number;

  studs: Stud[][];


  constructor(scene: Phaser.Scene) {
    this.studsX = 7;
    this.studsY = 7;
    this.width = PLATE_WIDTH(this.studsX);
    this.height = PLATE_WIDTH(this.studsY);
    this.originX = 100;
    this.originY = 100;
    this.x = this.originX + (this.width / 2)
    this.y = this.originY + (this.height / 2)
    scene.add.rectangle(this.x, this.y, this.width, this.height, Colors.WHITE)
    this.studs = studFactory(scene, this.studsX, this.studsY, this.originX, this.originY);
  }


}

export default Plate