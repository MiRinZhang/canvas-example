export default class Sprite {
    constructor (canvasId, posId) {
        this.canvas = document.getElementById(canvasId);
        this.position = document.getElementById(posId);
        this.ctx = this.canvas.getContext('2d');
        this.ready();
    }
    
    ready () {
        const { canvas } = this;
        canvas.onmousemove = (e) => {
            const loc = this.windowToCanvas(canvas, e.clientX, e.clientY);
            
            this.drawBackground();
            this.drawGuidelines(loc.x, loc.y);
            this.updatePos(loc.x, loc.y);
        };
        this.drawBackground();
    }
    
    windowToCanvas (canvas, x, y) {
        const ele = canvas.getBoundingClientRect();
        return {
            x: x - ele.left * (canvas.width / ele.width),
            y: y - ele.top * (canvas.height / ele.height),
        };
    }
    
    drawGuidelines (x, y) {
        const { ctx } = this;
        ctx.strokeStyle = 'rgba(0, 0, 230, 0.8)';
        ctx.lineWidth = 0.5;
        this.drawVerticalLine(x);
        this.drawHorizontalLine(y);
    }
    
    drawVerticalLine (x) {
        const { ctx } = this;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, ctx.canvas.height);
        ctx.stroke();
    }
    
    drawHorizontalLine (y) {
        const { ctx } = this;
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(ctx.canvas.width, y + 0.5);
        ctx.stroke();
    }
    
    drawBackground () {
        const { ctx, canvas } = this;
        const VERTICAL_LINE_SPACING = 12;
        let h = ctx.canvas.height;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 0.5;
        
        while (h > VERTICAL_LINE_SPACING) {
            ctx.beginPath();
            ctx.moveTo(0, h);
            ctx.lineTo(ctx.canvas.width, h);
            ctx.stroke();
            h -= VERTICAL_LINE_SPACING;
        }
    }
    
    updatePos (x, y) {
        this.position.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
    }
}