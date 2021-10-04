/**
 * Represents a key-value pair of a persisted setting
 */
export class Setting {

  /** Key */
  public id = '';
  /** Value */
  public value: any;

  /**
   * Constructor
   * @param name setting name
   * @param value value
   */
  constructor(name: string, value: any) {
    this.id = name;
    this.value = value;
  }
}
