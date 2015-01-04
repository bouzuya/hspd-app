import calculator = require('./util/calculator');

export class Main {
  private calculator: calculator.Calculator;
  private value: number;

  constructor() {
    this.calculator = new calculator.Calculator();
    this.value = 0;
  }

  add(n: number): void {
    this.value = this.calculator.add(this.value, n);
  }

  getValue(): number {
    return this.value;
  }
}
