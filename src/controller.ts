import View from "./view";
import Game from "./game";

export default class Controller {
    game: Game;
    view: View;
    intervalId: number | null;
    isPlaying: boolean;


    constructor(game: Game, view: View) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;


        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView()
    }

    play() {
        this.isPlaying = true;
        this.startTimer(); 
        this.updateView()
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView()
    }

    reset() {
        this.game.reset();
        this.play();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        }
        else if (this.isPlaying) {
            this.view.renderMainScreen(state);
        }
        else {
            this.view.renderPauseScreen();
        }
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null;
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 13:
                if (state.isGameOver) {
                    this.reset();
                }
                else if (this.isPlaying) {
                    this.pause();
                }
                else {
                    this.play();
                }
                break;
            case 37:
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38:
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39:
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40:
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }

    handleKeyUp(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 40:
                this.startTimer();
                break;
        }
    }
}