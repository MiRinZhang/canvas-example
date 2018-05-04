export default class Rubber {
    constructor (canvasId, rubberId, resetId, imagePath) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.rubberHandDiv = document.getElementById(rubberId);
        this.resetBtn = document.getElementById(resetId);
        
        this.image = new Image();
        this.mousedown = { x: 0, y: 0 };
        this.rubberBandRectangle = {};
        this.dragging = false;
        this.image.src = imagePath;
        
        this.handleEvents();
    }
    
    handleEvents () {
        this.canvas.onmousedown = (e) => {
            const x = e.x || e.clientX,
                y = e.y || e.clientY;
            
            e.preventDefault();
            
            this.rubberHandStart(x, y);
        };
        
        this.resetBtn.onclick = () => {
            this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        };
        
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        };
        
        this.canvas.onmousemove = (e) => {
            const x = e.x || e.clientX,
                y = e.y || e.clientY;
            
            e.preventDefault();
            
            this.dragging && this.rubberHandStretch(x, y);
        };
        
        window.onmouseup = (e) => {
            e.preventDefault();
            this.rubberHandEnd();
        };
    }
    
    rubberHandStart (x, y) {
        this.mousedown.x = x;
        this.mousedown.y = y;
        this.rubberBandRectangle.left = x;
        this.rubberBandRectangle.top = y;
        
        this.moveRubberHandDiv();
        this.showRubberBandDiv();
        
        this.dragging = true;
    }
    
    rubberHandStretch (x, y) {
        this.rubberBandRectangle.left = x < this.mousedown.x ? x : this.mousedown.x;
        this.rubberBandRectangle.top = y < this.mousedown.y ? y : this.mousedown.y;
        
        this.rubberBandRectangle.width = Math.abs(x - this.mousedown.x);
        this.rubberBandRectangle.height = Math.abs(y - this.mousedown.y);
        
        this.moveRubberHandDiv();
        this.resizeRubberHandDiv();
    }
    
    moveRubberHandDiv () {
        this.rubberHandDiv.style.top = this.rubberBandRectangle.top + 'px';
        this.rubberHandDiv.style.left = this.rubberBandRectangle.left + 'px';
    }
    
    resizeRubberHandDiv () {
        this.rubberHandDiv.style.width = this.rubberBandRectangle.width + 'px';
        this.rubberHandDiv.style.height = this.rubberBandRectangle.height + 'px';
    }
    
    rubberHandEnd () {
        const box = this.canvas.getBoundingClientRect(),
            { ctx, canvas, rubberBandRectangle } = this;
        try {
            ctx.drawImage(canvas,
                rubberBandRectangle.left - box.left,
                rubberBandRectangle.top - box.top,
                rubberBandRectangle.width,
                rubberBandRectangle.height,
                0, 0, canvas.width, canvas.height);
        } catch (e) {
            console.warn(`[Suppress error]: ${e}`);
        }
        
        this.resetRubberHandRectangle();
        
        this.rubberHandDiv.style.width = 0;
        this.rubberHandDiv.style.height = 0;
        
        this.hideRubberBandDiv();
        
        this.dragging = false;
    }
    
    resetRubberHandRectangle () {
        this.rubberBandRectangle = {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        };
    }
    
    showRubberBandDiv () {
        this.rubberHandDiv.style.display = 'inline';
    }
    
    hideRubberBandDiv () {
        this.rubberHandDiv.style.display = 'none';
    }
}