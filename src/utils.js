/**
 * Утилитарные и общие функции.
 */

//  Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItems = (array, minItemsAmount, maxItemsAmount) => {
  const arrayCopied = array.slice();
  const itemsAmount = getRandomInteger(minItemsAmount, maxItemsAmount);
  const arrayResult = [];

  for (let i = 0; i < itemsAmount; i++) {
    const itemIndex = getRandomInteger(0, arrayCopied.length - 1);
    const currenItem = arrayCopied.splice(itemIndex, 1);
    arrayResult.push(currenItem);
  }

  return arrayResult.flat();
};

export const getOneRandomItem = (array) => {
  const itemIndex = getRandomInteger(0, array.length - 1);
  return array[itemIndex];
};
