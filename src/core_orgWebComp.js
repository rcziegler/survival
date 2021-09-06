console.log('> core');

import { decodedTextSpanIntersectsWith } from 'typescript';
import { createISOTile } from './components/ISOTile';

import _data from './data/objects.json';

const WORLD_VIEW_HEIGHT = 500;
const WORLD_VIEW_WIDTH = 500;
const TILE_SIZE = 250;

let data = _data;

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

document.addEventListener("keydown", (event) => {

  data = document.getElementById("isoTile_01").getAttribute('data');

  switch (event.key.toLowerCase()) {
    case KEY.UP_NUMBER:
    case KEY.UP_LETTER:
      console.log('> up');
      break;
    case KEY.DOWN_NUMBER:
    case KEY.DOWN_LETTER:
      console.log('> down');
      break;
    case KEY.LEFT_NUMBER:
    case KEY.LEFT_LETTER:
      console.log('> left');
      break;
    case KEY.RIGHT_NUMBER:
    case KEY.RIGHT_LETTER:
      console.log('> right');

      let dataObj = JSON.parse(data);
      dataObj.objects.forEach(item => {
        item.xPos += 10;
      })
      data = JSON.stringify(dataObj);
      //console.log(data);
      document.getElementById("isoTile_01").setAttribute('data', data);

      break;
  }
});

let app = document.getElementById('app');
let div1 = document.createElement("div");
let world = createISOTile("isoTile_01", data);
console.log(world);

div1.appendChild(world);
app.appendChild(div1);
