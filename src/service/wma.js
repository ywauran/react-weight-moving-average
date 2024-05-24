const calculateWMA = (sales, period) => {
  if (period <= 0 || period > sales.length) {
    return sales.map((sale, index) => {
      return "Period is invalid";
    });
  }

  const totalPeriod = (period * (period + 1)) / 2;
  const periods = Array.from({ length: period }, (_, i) => i + 1);

  return sales.map((sale, index) => {
    if (index < period - 1) return "wma = ?";
    let sum = 0;
    let weightSum = 0;
    const wmaDetails = [];
    for (let i = 0; i < period; i++) {
      const weight = period - i;
      const saleIndex = index - i;
      const saleAmount = parseFloat(sales[saleIndex].salesAmount);
      sum += saleAmount * weight;
      weightSum += weight;
      wmaDetails.push({
        result: saleAmount * weight,
        resultString: `${saleAmount} * ${weight}`,
      });
    }
    const wma = (sum / weightSum).toFixed(2);

    let wmaDetailsString = "";
    for (let i = 0; i < wmaDetails.length; i++) {
      wmaDetailsString += wmaDetails[i].resultString;
      if (i !== wmaDetails.length - 1) {
        wmaDetailsString += " + ";
      }
    }

    const wmaString = `((${wmaDetailsString}) / ${totalPeriod}) `;
    return {
      ...sale,
      wma,
      wmaString,
      periods: periods,
      totalPeriod: totalPeriod,
      salesPrev: wmaDetails,
      index: index,
    };
  });
};

export default calculateWMA;
