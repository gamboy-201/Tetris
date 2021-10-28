namespace Tetris {
    export class GameController {
        protected view;
        protected left: Keyboard = new Keyboard("ArrowLeft", true);
        protected up = new Keyboard("ArrowUp", true);
        protected right = new Keyboard("ArrowRight", true);
        protected down = new Keyboard("ArrowDown", true);
        protected xDown = null;
        protected yDown = null;
        constructor(view: GameView) {
            this.view = view;
            
        }
        public ShowTheGame(): void {
            this.view.ShowTheGame();
            this.left.press = () => {
                this.view.moveFormLeft();
            };
            this.up.press = () => {
                this.view.rotateForm();
            };
            this.right.press = () => {
                this.view.moveFormRight();
            };
            this.down.press = () => {
                this.view.hardDown();
            };
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        }

        public turnOffEvents():void{
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchmove', this.handleTouchMove);
        }



        protected getTouches(evt: any):void {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }

        protected handleTouchStart(evt: any):void {
            const firstTouch = this.getTouches(evt)[0];
            this.xDown = firstTouch.clientX;
            this.yDown = firstTouch.clientY;
        };

        protected handleTouchMove(evt: any):void {
            if (!this.xDown || !this.yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    this.view.moveFormLeft();
                } else {
                    this.view.moveFormRight();
                }
            } else {
                if (yDiff > 0) {
                    this.view.rotateForm();
                } else {
                    this.view.hardDown();
                }
            }
            this.xDown = null;
            this.yDown = null;
        };
    }
}