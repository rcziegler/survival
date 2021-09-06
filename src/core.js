console.log('> core 2');

import data from './data/objects.json';
import {
  moveCharacterUp,
  moveCharacterDown,
  moveCharacterLeft,
  moveCharacterRight,
  shiftWorldUp,
  shiftWorldDown,
  shiftWorldLeft,
  shiftWorkRight,
  shiftWorldRight
} from './toolbox/world';

const WORLD_VIEW_HEIGHT = 500;
const WORLD_VIEW_WIDTH = 500;

const KEY = {
  "DOWN_NUMBER": "2",
  "DOWN_LETTER": "s",
  "UP_NUMBER": "8",
  "UP_LETTER": "w",
  "LEFT_NUMBER": "4",
  "LEFT_LETTER": "a",
  "RIGHT_NUMBER": "6",
  "RIGHT_LETTER": "d"
}

let app = document.getElementById('app');
let svgWorld = document.createElementNS("http://www.w3.org/2000/svg", "svg");

let scale = 1;
let scaleIncrement = 0.1;

svgWorld.setAttribute('style', 'border: 1px solid black');
svgWorld.setAttribute('height', WORLD_VIEW_HEIGHT);
svgWorld.setAttribute('width', WORLD_VIEW_WIDTH);
svgWorld.addEventListener('click', (e) => {
  console.log(e.target.parentNode.id);
  updateObject(e.target.parentNode.id);
  draw();
});

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case KEY.UP_NUMBER:
    case KEY.UP_LETTER:
      moveCharacterUp(data);
      break;
    case KEY.DOWN_NUMBER:
    case KEY.DOWN_LETTER:
      moveCharacterDown(data);
      break;
    case KEY.LEFT_NUMBER:
    case KEY.LEFT_LETTER:
      moveCharacterLeft(data);
      break;
    case KEY.RIGHT_NUMBER:
    case KEY.RIGHT_LETTER:
      moveCharacterRight(data);
      break;
  }
  draw();
});



const updateObject = id => {
  let idx = data.objects.findIndex(obj => obj.id === id);
  let obj = data.objects[idx];
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

  data.objects[idx] = obj;
}

const generateD = data => {
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

const draw = () => {
  svgWorld.innerHTML = "";

  data.objects.forEach(obj => {
    let g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");

    let xPos = obj.xPos + scaleIncrement;
    let yPos = obj.yPos + scaleIncrement;
    g1.setAttribute('id', obj.id);
    g1.setAttribute('transform', `scale(${scale}) translate(${xPos}, ${yPos})`);

    obj.paths.forEach(pathData => {
      let currPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      currPath.setAttribute('fill', pathData.fill);
      currPath.setAttribute('d', generateD(pathData.d2));
      g1.appendChild(currPath);
    })

    svgWorld.appendChild(g1);
    app.appendChild(svgWorld);
  })

  // Draw Character
  // <circle cx="50" cy="50" r="50"/>
  let character = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  character.setAttribute('cx', data.xPosCharacter);
  character.setAttribute('cy', data.yPosCharacter);
  character.setAttribute('r', 5);
  svgWorld.appendChild(character);

}

draw();