import Circle from './Circle';

export default class CurrentCirle extends Circle {
    constructor(x, y) {
        super(x, y);
    }

    drawCircle(ctx) {
        ctx.beginPath();
        this.r = 6;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fillStyle = 'rgba(181, 178, 178, 0.8)';
        ctx.fill();
    }
}