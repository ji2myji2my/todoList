export const ITEM_HEIGHT = 80;

/**
 * getPosition : renvoie { x, y } pour positionner l'item
 * en fonction de son index
 */
export const getPosition = (index, itemHeight = ITEM_HEIGHT) => {
  'worklet';
  return {
    x: 0,
    y: index * itemHeight,
  };
};

/**
 * getOrder : déduit le nouvel index (ordre) d'un item
 * en se basant sur translateY
 */
export const getOrder = (translateY, itemHeight = ITEM_HEIGHT, numberOfItems) => {
  'worklet';
  const rawIndex = translateY / itemHeight;
  const newIndex = Math.round(rawIndex);
  // Empêcher de sortir de la liste
  return Math.max(0, Math.min(newIndex, numberOfItems - 1));
};
