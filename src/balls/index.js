export default class Balls {
    constructor (id, config) {
        const {
            actionId = '',
            fontSize = '32pt',
            fontFamily = 'Ariel',
        } = config;
        
        this.ctx = document.getElementById(id).getContext('2d');
        this.actionBtn = null;
        this.config = {
            paused: !!actionId,
            girdColor: 'lightgray',
            girdLineWidth: 0.5,
            girdSetpX: 10,
            girdSetpY: 10,
            duration: 1000 / 60,
            origin: { x: 100, y: 100 },
            maxCircle: 100,
            ...config,
        };
        this.ctx.lineWidth = this.config.girdLineWidth;
        this.ctx.font = `${fontSize} ${fontFamily}`;
        this.circles = [];
        
        if (actionId) {
            this.actionBtn = document.getElementById(actionId);
        }
        
        this.start();
    }
    
    start () {
        const { ctx, config } = this,
            { girdColor, girdSetpX, girdSetpY, duration } = config;
        
        this.drawGird(ctx, girdColor, girdSetpX, girdSetpY);
        this.createCircle();
        this.addListener();
        setInterval(this.drawCircles.bind(this), duration);
    }
    
    createCircle () {
        const { origin, maxCircle } = this.config;
        for (let i = 0; i < maxCircle; i++) {
            this.circles[i] = {
                x: origin.x,
                y: origin.y,
                velocityX: 3 * Math.random(),
                velocityY: 3 * Math.random(),
                radius: 50 * Math.random(),
                color: `rgba(${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, 1.0)`,
            };
        }
    }
    
    addListener () {
        if (this.actionBtn) {
            this.actionBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.config.paused = !this.config.paused;
                this.actionBtn.innerText = this.config.paused ? 'Start' : 'Stop';
            };
        }
        
        this.ctx.canvas.onmousedown = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    
    drawCircles () {
        const { circles, ctx, config } = this,
            { paused, girdColor, girdSetpX, girdSetpY } = config;
        
        if (!paused) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.drawGird(ctx, girdColor, girdSetpX, girdSetpY);
            
            circles.forEach((circle) => {
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = circle.color;
                ctx.fill();
                this.adjustPosition(circle);
            });
        }
    }
    
    drawGird (context, color, setpX, setpY) {
        const { girdLineWidth } = this.config;
        context.strokeStyle = color;
        context.lineWidth = girdLineWidth;
        
        for (let i = setpX + girdLineWidth; i < context.canvas.width; i += setpX) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, context.canvas.height);
            context.stroke();
        }
        
        for (let i = setpY + girdLineWidth; i < context.canvas.width; i += setpY) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(context.canvas.width, i);
            context.stroke();
        }
    }
    
    adjustPosition (circle) {
        const { ctx } = this;
        if (circle.x + circle.velocityX + circle.radius > ctx.canvas.width ||
            circle.x + circle.velocityX - circle.radius < 0) {
            circle.velocityX = -circle.velocityX;
        }
        
        if (circle.y + circle.velocityY + circle.radius > ctx.canvas.height ||
            circle.y + circle.velocityY - circle.radius < 0) {
            circle.velocityY = -circle.velocityY;
        }
        
        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
    }
}