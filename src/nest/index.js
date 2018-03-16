import Circle from './Circle';
import CurrentCircle from './CurrentCirle';

export default class Draw {
    constructor(element = 'canvas', number) {
        //更新页面用requestAnimationFrame替代setTimeout
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        this.canvas = document.getElementById(element);
        this.ctx = canvas.getContext('2d');
        this.w = canvas.width = canvas.offsetWidth;
        this.h = canvas.height = canvas.offsetHeight;
        this.circles = []
        this.currentCircle = new CurrentCircle(0, 0);
        this.number = number;

        this.ready();
    }

    ready() {
        window.addEventListener('load', this.init.bind(this));
        window.onmousemove = (e) => {
            e = e || window.event;
            this.currentCircle.x = e.clientX;
            this.currentCircle.y = e.clientY;
        };
        window.onmouseout = () => {
            this.currentCircle.x = null;
            this.currentCircle.y = null;
        };
    }

    init() {
        for (let i = 0; i < this.number; i++) {
            this
                .circles
                .push(new Circle(Math.random() * this.w, Math.random() * this.h));
        }
        this.draw();
    }

    draw() {
        const {ctx, w, h, circles, currentCircle} = this;

        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < circles.length; i++) {
            circles[i].move(w, h);
            circles[i].drawCircle(ctx);

            for (let j = i + 1; j < circles.length; j++) {
                circles[i].drawLine(ctx, circles[j]);
            }
        }

        if (currentCircle.x) {
            currentCircle.drawCircle(ctx);

            for (let k = 1; k < circles.length; k++) {
                currentCircle.drawLine(ctx, circles[k]);
            }
        }

        window.requestAnimationFrame(this.draw.bind(this));
    }
}