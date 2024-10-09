/**
 * @description percentDiff(10, 9) -0.1
 * @description percentDiff(9, 10) 0.1
 */
export const percentDiff = (b: number, a: number) => {
  return 100 * ((a - b) / ((a + b) / 2));
};
