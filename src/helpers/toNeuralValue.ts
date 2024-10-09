/**
 * @description range(-1.0; 1.0) to range(0, 1.0)
 */
export const toNeuralValue = (diff: number) => {
  return (diff * 100 + 100) / 200;
};
