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
    this.objectData = objData;
    this.drawSVG();
  }

  generateD(data) {
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
    return result;
  }

  updateObject(id) {
    console.log(`> updating ${id}`);
    let idx = this.objectData.objects.findIndex(obj => obj.id === id);
    let obj = this.objectData.objects[idx];
    let DEPTH = 2.5;

    // top
    obj.paths[0].d2[2] = obj.paths[0].d2[2] + DEPTH;
    obj.paths[0].d2[4] = obj.paths[0].d2[4] + DEPTH;
    obj.paths[0].d2[6] = obj.paths[0].d2[6] + DEPTH;
    obj.paths[0].d2[8] = obj.paths[0].d2[8] + DEPTH;

    // left
    obj.paths[1].d2[2] = obj.paths[1].d2[2] + DEPTH;
    obj.paths[1].d2[4] = obj.paths[1].d2[4] + DEPTH;

    // right
    obj.paths[2].d2[2] = obj.paths[2].d2[2] + DEPTH;
    obj.paths[2].d2[4] = obj.paths[2].d2[4] + DEPTH;

    this.objectData.objects[idx] = obj;
  }

  drawSVG() {
    this.svg.innerHTML = "";

    let height = 500;//currObject.height * this.scale;
    let id = this.getAttribute('id') ? this.getAttribute('id') : null;
    let width = 500;//currObject.width * this.scale;

    this.svg.setAttribute('style', 'border: 1px solid green');
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);
    this.svg.setAttribute('id', id);

    this.objectData.objects.forEach(obj => {
      let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");

      let xPos = obj.xPos + this.scaleIncrement;
      let yPos = obj.yPos + this.scaleIncrement;
      g1.setAttribute('id', obj.id);
      g1.setAttribute('transform', `scale(${this.scale}) translate(${xPos}, ${yPos})`);

      obj.paths.forEach(pathData => {
        let currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        currPath.setAttribute('fill', pathData.fill);
        currPath.setAttribute('d', this.generateD(pathData.d2));
        g1.appendChild(currPath);
      })

      this.svg.appendChild(g1);
    })

    this.shadow.appendChild(this.svg);

    this.shadow.firstElementChild.onclick = e => {
      this.updateObject(e.target.parentNode.id);
      this.drawSVG();
    }
  }
}
/**
 * Register "Tile"
 */
window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-iso-tile', ISOTile);
});

/**
 * Original shap change
 */
    // // paths[1]
    // obj.paths[0].d2[4] = obj.paths[0].d2[4] + 0.5;
    // obj.paths[1].d2[2] = obj.paths[1].d2[2] + 0.5;