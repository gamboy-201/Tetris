namespace Tetris {
    export class DraggingShape extends PIXI.Graphics {
        public collisionActive: boolean = true;
        public dragging:boolean = false;
        public elementName: string ="";
        public electronCount: number =0;
        constructor(elementName?:string,electronCount?:number) {
            super();
            if(elementName){
                this.elementName = elementName;
            }
            if(electronCount){
                this.electronCount = electronCount;
            }
            this.on('mousedown', this.HandleMouseDown, this);
            this.on('mousemove', this.HandleMouseMove, this);
            this.on('mouseup', this.HandleMouseUp, this);
            this.dragging =false;
        }
        public CheckForCollision(withElement: any): boolean {
            let isCollision: boolean = false;
            let ypos: number = this.y;
            let xpos:number = this.x;
            if(xpos >=withElement.x-20 && xpos <=withElement.x+20 && ypos >=withElement.y-20 && ypos <=withElement.y+20){
                if(this.elementName = withElement.elementName){
                    isCollision=true;
                }
            }
            return isCollision;
        }
        protected HandleMouseDown(e: any) {
            console.log('Picked up');
            this.x = e.data.global.x-this.width;
            this.y = e.data.global.y;
            this.dragging = true;
        }
        protected HandleMouseMove(e: any) {
            if(this.dragging){
                console.log('Moving');
                this.x = e.data.global.x-this.width;
                this.y = e.data.global.y;
            }
            //this.dragging = false;
        }
        protected HandleMouseUp(e: any) {
            console.log('Moving');
            this.x = e.data.global.x-this.width;
            this.y = e.data.global.y;
            this.dragging = false;
        }
    }
}