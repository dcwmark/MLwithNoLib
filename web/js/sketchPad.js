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
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
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
      const mouse = [
        Math.round(evt.clientX - rect.left),
        Math.round(evt.clientY - rect.top),
      ]
      console.log(mouse);
    };
  }
}
