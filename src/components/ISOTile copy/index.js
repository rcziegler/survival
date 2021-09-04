import objData from '../../data/objects.json';

/** */
export const createISOTile = (id) => {
  let obj = document.createElement("custom-iso-tile");
  obj.setAttribute('id', id);
  return obj;
}

/** */
class ISOTile extends HTMLElement {
  connectedCallback() {
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.scale = 1;
    this.scaleIncrement = 0.1;
    this.shadow = this.attachShadow({ mode: 'open' })
    this.setupSVG();
  }

  draw() {

  }

  generateD(data) {
    console.log('> generateD');
    console.log(data);
    let result = "";
    let position = 0;
    data.forEach(item => {

      if (typeof (item) === "string") {
        result += item;
      }

      if (typeof (item) === "number") {
        if (position === 0) {
          result += `${(item).toString()},`;
          position = 1;
        } else if (position === 1) {
          result += `${(item).toString()} `;
          position = 0;
        }

      }
    })
    console.log(".");
    console.log(result);
    return result;
  }

  setupSVG() {
    console.log("> setupSVG");

    let currObject = objData.objects[0];

    this.svg.innerHTML = "";


    let height = currObject.height * this.scale;
    let id = this.getAttribute('id') ? this.getAttribute('id') : null;
    let width = currObject.width * this.scale;

    this.svg.setAttribute('style', 'border: 1px solid green');
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);
    this.svg.setAttribute('id', id);

    let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");

    g1.setAttribute('transform', `scale(${this.scale}) translate(${this.scaleIncrement}, ${this.scaleIncrement})`);

    currObject.paths.forEach(pathData => {
      let currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      currPath.setAttribute('fill', pathData.fill);
      currPath.setAttribute('d', pathData.d);
      g1.appendChild(currPath);
    })

    this.svg.appendChild(g1);

    this.shadow.appendChild(this.svg);

    this.shadow.firstElementChild.onclick = e => {
      this.scale += this.scaleIncrement;
      this.setupSVG();
    }
  }
}
/**
 * Register "Tile"
 */
window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-iso-tile', ISOTile);
});