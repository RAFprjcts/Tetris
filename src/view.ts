export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };
    element: any;
    width: number;
    height: number;
    convas: HTMLCanvasElement;
    context: any;
    blockWidth: number;
    blockHeight: number;


    constructor(element, w: number, h: number, r: number, c: number) {
        this.element = element;
        this.width = w;
        this.height = h;

        this.convas = document.createElement('canvas');
        this.convas.width = this.width;
        this.convas.height = this.height;
        this.context = this.convas.getContext('2d');

        this.blockWidth = this.width / c;
        this.blockHeight = this.height / r;

        this.element.appendChild(this.convas);
    }

    render({ playfield }) {
        this.clearScreen()
        this.renderPlayfield(playfield);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPlayfield(playfield) {

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }
}