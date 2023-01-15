const BrickColors = {
  AQUA: 0xBCE5DC,
  BLACK: 0x212121,
  BLUE: 0x0057A6,
  BRIGHT_GREEN: 0x10CB31,
  BRIGHT_LIGHT_BLUE: 0xBCD1ED,
  BRIGHT_LIGHT_ORGANGE: 0xFFC700,
  BRIGHT_LIGHT_YELLOW: 0xFFF08C,
  WHITE: 0xFFFFFF,
} as const;

export type BrickColor = typeof BrickColors[keyof typeof BrickColors];

export default BrickColors;