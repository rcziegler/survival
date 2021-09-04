/**
 * 
 */
export const createTile = (id, height, width) => {
  let obj = document.createElement("custom-tile");
  obj.setAttribute('height', height);
  obj.setAttribute('width', width);
  obj.setAttribute('id', id);
  return obj;
}
/**
 * 
 */
class Tile extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' })
    this.setupSVG();
  }

  setupSVG() {
    const DEFAULT_HEIGHT = '10';
    const DEFAULT_WIDTH = '10';
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let height = this.getAttribute('height') ? this.getAttribute('height') : DEFAULT_HEIGHT;
    let id = this.getAttribute('id') ? this.getAttribute('id') : null;
    let width = this.getAttribute('width') ? this.getAttribute('width') : DEFAULT_WIDTH;

    svg.setAttribute('style', 'border: 1px solid black');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('id', id);

    this.shadow.appendChild(svg);

    this.shadow.firstElementChild.onclick = e => {
      console.log(e.target);
    }
  }
}
/**
 * Register "Tile"
 */
window.addEventListener('DOMContentLoaded', () => {
  customElements.define('custom-tile', Tile);
});

// // type TileInfo = {
// //   id: string,
// //   size: number,
// //   xPos: number,
// //   yPos: number
// // }

// /** */
// export const createTile = (id, size) => {
//   let obj = document.createElement("custom-tile");
//   obj.setAttribute('height', size);//tileInfo.size.toString());
//   obj.setAttribute('width', size);//tileInfo.size.toString());
//   obj.setAttribute('id', id);
//   return obj;
// }
// /** */
// class Tile extends HTMLElement {
//   connectedCallback() {
//     this.shadow = this.attachShadow({ mode: 'open' });
//     this.setupTile();
//   }

//   setupTile() {
//     console.log('> setupTile');
//     const DEFAULT_SIZE = 25;

//     let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

//     let height = this.getAttribute('height') ? this.getAttribute('height') : DEFAULT_SIZE;
//     let id = this.getAttribute('id') ? this.getAttribute('id') : null;
//     let width = this.getAttribute('width') ? this.getAttribute('width') : DEFAULT_SIZE;

//     svg.setAttribute('style', 'border: 1px solid black');
//     svg.setAttribute('width', width);
//     svg.setAttribute('height', height);
//     svg.setAttribute('id', id);

//     this.shadow.appendChild(svg);

//     this.shadow.firstElementChild.onClick = e => {
//       console.log(e.target);
//     }
//   }
// }

// /** Register Tile */
// window.addEventListener('DOMContentLoaded', () => {
//   customElements.define('custom-tile', Tile);
// });
