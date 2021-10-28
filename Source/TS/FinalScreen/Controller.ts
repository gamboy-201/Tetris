namespace Tetris {
    export class FinalScreenController {
        protected view;
        constructor(view:FinalScreenView){
            this.view=view;
        }
        public showFinalScreen():void{
            this.view.showFinalScreen();
        }
    }
}