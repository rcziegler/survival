console.log('> ISOTileObject');

import objData from '../../data/objects.json';

/** */
export const createISOTileObject = (id) => {
  let obj = document.createElement("custom-iso-tile-object");
  obj.setAttribute('id', id);
  return obj;
}

/** */
class ISOTileObject extends HTMLElement {
  connectedCallback() {
    this.g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.shadow = this.attachShadow({ mode: 'open' })
    this.setupObject();
  }

  setupObject() {
    console.log('> setupObject');

    let currObject = objData.objects[0];

    this.g1.setAttribute('width', 100);
    this.g1.setAttribute('height', 100);
    this.g1.setAttribute('transform', 'scale(1) translate(0,0)');

    currObject.paths.forEach(pathData => {
      let currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      currPath.setAttribute('fill', pathData.fill);
      currPath.setAttribute('d', pathData.d);
      this.g1.appendChild(currPath);
    })

    this.shadow.appendChild(this.g1);
  }
}

/** */
window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-iso-tile-object', ISOTileObject);
});