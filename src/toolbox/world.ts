import { Data } from './types';

const SPEED = 2;

export const moveCharacterUp = (data: Data): void => {
  data.yPosCharacter -= SPEED;
}

export const moveCharacterDown = (data: Data): void => {
  data.yPosCharacter += SPEED;
}

export const moveCharacterLeft = (data: Data): void => {
  data.xPosCharacter -= SPEED;
}

export const moveCharacterRight = (data: Data): void => {
  data.xPosCharacter += SPEED;
}

export const shiftWorldUp = (data: Data): void => {
  data.objects.forEach(item => {
    item.yPos -= 10;
  })
}

export const shiftWorldDown = (data: Data): void => {
  data.objects.forEach(item => {
    item.yPos += 10;
  })
}
export const shiftWorldLeft = (data: Data): void => {
  data.objects.forEach(item => {
    item.xPos -= 10;
  })
}

export const shiftWorldRight = (data: Data): void => {
  data.objects.forEach(item => {
    item.xPos += 10;
  })
}