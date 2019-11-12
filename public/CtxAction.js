class CtxAction {
  constructor(ctx, size = 20) {
    this.colorIndex = 0;
    this.colors = ['#000', '#fff', "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", '#607d8b'];
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.size = size;
  }
  draw(x, y, color) {
    const cI = Number.isInteger(parseInt(color)) ? parseInt(color) : this.colorIndex;
    this.ctx.fillStyle = this.colors[cI];

    this.ctx.fillRect(x * this.size, y * this.size, size, size);

    return [x, y, cI];
  }
}