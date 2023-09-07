class SketchPad {
  constructor(container, size=400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
      background-color: white;
      box-shadow: 0px 0px 18px 2px black;
    `;
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');

    /**
     * The path of drawing in the mouse [X, Y] co-ordinates.
     */
    this.path = [];
    /**
     * Signifying when drawing commences.
     */
    this.isDrawing = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouseLocation(evt);
      this.path = mouse;
      this.isDrawing = true;
      console.log(mouse);
    };
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouseLocation(evt);
        this.path.push(mouse);
        console.log(this.path[this.path.length - 1]);
        this.#redraw();
      }
    };
    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
  }

  #getMouseLocation = (evt) => {
    const rect = this.canvas.getBoundingClientRect();
    /**
     * Obtain the mouse co-ordinate of the mouse by
     * taking the clientX of the event minus
     *   the left side of the canvas rectangle,
     *   thereby, getting the X co-ordinate that is relative
     *   to the left side of the canvas,
     * then, take the clientY of the event minus
     *   the top of the canvas rectangle,
     *   thereby, getting the Y co-ordinate that is relative
     *   to the top part of the canvas.
     * As we do not need the high precision available from the above
     * calculations, we would round off to the nearest integers.
     */
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  };

  #redraw = () => {
    /**
     * Use ctx clearRect to clear the canvas.
     */
    this.ctx.clearRect(
      0, 0,               // from this offset (top left) 
      this.canvas.width,
      this.canvas.height  // to this offset (nottom right)
    );
    draw.path(this.ctx, this.path);
  };
}
