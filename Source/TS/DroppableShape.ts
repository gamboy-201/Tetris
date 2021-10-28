namespace Tetris {
    export class DroppableShape extends PIXI.Graphics {
        public collisionActive: boolean = true;
        public elementName: string ="";
        public electronCount: number =0;
        constructor(elementName:string,electronCount:number) {
            super();
            if(elementName){
                this.elementName = elementName;
            }
            if(electronCount){
                this.electronCount = electronCount;
            }
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
    }
}