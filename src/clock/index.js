export default class Clock {
    constructor (id, config = {
        fontHeight: 15, // 时间刻度字体大小
        margin: 35, // canvas离容器的距离
        numeralSpacing: 20, // 时间刻度之间的间隔
        fontFamily: 'Arial', // 文字字体
    }) {
        const { margin, numeralSpacing, fontHeight, fontFamily } = config,
            canvas = document.getElementById(id);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fontHeight = fontHeight;
        this.ctx.font = `${fontHeight}px ${fontFamily}`;
        this.handTruncation = canvas.width / 25;
        this.hourHandTruncation = canvas.width / 10;
        this.radius = canvas.width / 2 - margin;
        this.handRadius = this.radius + numeralSpacing;
        
        setInterval(this.drawClock.bind(this), 1000);
    }
    
    /**
     * 绘制时钟圆形边框
     */
    drawCircle () {
        const { canvas, ctx, radius } = this;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    
    /**
     * 绘制时间刻度
     */
    drawNumerals () {
        const { ctx, canvas, handRadius, fontHeight } = this,
            numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let angle = 0,
            numeralWidth = 0;
        
        numerals.forEach((numeral) => {
            angle = Math.PI / 6 * (numeral - 3);
            numeralWidth = ctx.measureText(numeral).width;
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.fillText(numeral,
                canvas.width / 2 + Math.cos(angle) * (handRadius) - numeralWidth / 2,
                canvas.height / 2 + Math.sin(angle) * (handRadius) + fontHeight / 3,
            );
        })
    }
    
    /**
     * 绘制时钟中间的小点
     */
    drawCenter () {
        const { ctx, canvas } = this;
        
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
        ctx.fillStyle = '#f00';
        ctx.fill();
        ctx.closePath();
    }
    
    /**
     * 绘制指针
     * @param loc
     * @param isHour
     */
    drawHand (loc, isHour) {
        const { ctx, canvas, radius, handTruncation, hourHandTruncation } = this,
            angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
            handRadius = isHour ? radius - handTruncation - hourHandTruncation : radius - handTruncation;
        
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
            canvas.height / 2 + Math.sin(angle) * handRadius);
        ctx.stroke();
        ctx.closePath();
    }
    
    /**
     * 绘制时、分、秒针
     */
    drawHands () {
        const date = new Date();
        let hour = date.getHours();
        hour = hour > 12 ? hour - 12 : hour;
        
        this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
        this.drawHand(date.getMinutes(), false);
        this.drawHand(date.getSeconds(), false);
    }
    
    /**
     * 绘制时钟
     */
    drawClock () {
        const { canvas, ctx } = this;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawCircle();
        this.drawCenter();
        this.drawHands();
        this.drawNumerals();
    }
}