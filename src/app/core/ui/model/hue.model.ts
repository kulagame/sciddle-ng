import {HueType} from './hue-type.enum';

/**
 * Specific hue of a palette containing a color and a corresponding contrast value
 */
export class Hue {

  /** Hue type */
  public type: HueType;
  /** Color value */
  public color: string;
  /** Contrast value */
  public contrast: string;

  /**
   * Constructor
   * @param type hue type
   * @param color personColor
   * @param contrast contrast
   */
  constructor(type: HueType, color: string, contrast: string) {
    this.type = type;
    this.color = color;
    this.contrast = contrast;
  }
}
