import Game from "./src/game";

declare global {
    interface Window { game: any; }
}

const game = new Game();

window.game = game;

console.log(game);