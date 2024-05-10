export function calculateMSE(actual, predicted) {
  if (actual.length !== predicted.length) {
    throw new Error("The arrays must be of equal length.");
  }

  const sumOfSquares = actual.reduce((acc, value, index) => {
    const error = value - predicted[index];
    return acc + error * error;
  }, 0);

  return sumOfSquares / actual.length;
}
