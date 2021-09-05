console.log('> core');

//import { createTile } from './components/Tile';
import { createISOTile } from './components/ISOTile';
import { createISOTileObject } from './components/ISOTileObject';

const WORLD_VIEW_HEIGHT = 500;
const WORLD_VIEW_WIDTH = 500;
const TILE_SIZE = 250;
//const TILE_WIDTH = 80;
//const TILE_HEIGHT = 92.4;

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
      break;
  }

})

let app = document.getElementById('app');

let div1 = document.createElement("div");
div1.appendChild(createISOTile("isoTile_01"));//, TILE_HEIGHT, TILE_WIDTH));
//div1.appendChild(createISOTile("isoTile_02"));//, TILE_HEIGHT, TILE_WIDTH));
app.appendChild(div1);

// let divWorld = document.createElement("div");
// let svgWorld = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// svgWorld.setAttribute('id', 'svgWorld');
// svgWorld.setAttribute('style', 'border: 1px solid black');
// svgWorld.setAttribute('height', WORLD_VIEW_HEIGHT);
// svgWorld.setAttribute('width', WORLD_VIEW_WIDTH);


// let tile = createISOTileObject("firstTileObject");
// svgWorld.appendChild(tile);

// divWorld.appendChild(svgWorld);

// app.appendChild(divWorld);