const calculateWMA = (sales, period) => {
  return sales.map((sale, index) => {
    if (index < period - 1) return 0;
    let sum = 0;
    let weightSum = 0;
    for (let i = 0; i < period; i++) {
      const weight = period - i;
      sum += sales[index - i].salesAmount * weight;
      weightSum += weight;
    }
    return (sum / weightSum).toFixed(2);
  });
};

export default calculateWMA;
