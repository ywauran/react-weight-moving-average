import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import LineChart from "../../components/chart/line-chart";
import { getAlkesById } from "../../service/alkes";
import { getSalesByAlkesId } from "../../service/sales";
import calculateWMA from "../../service/wma";
import { calculateMSE, calculateMAPE } from "../../service/mse";

const CalculateAlkes = () => {
  const { id } = useParams();
  const [period, setPeriod] = useState(3);
  const [sales, setSales] = useState([]);
  const [wma, setWma] = useState([]);
  const [alkes, setAlkes] = useState({});
  const [currentPageWMA, setCurrentPageWMA] = useState(1);
  const itemsPerPage = 15;

  const [mse, setMse] = useState(null);
  const [mape, setMape] = useState(null);

  useEffect(() => {
    if (wma.length > 0 && sales.length > 0) {
      const actualSales = sales.map((sale) => {
        const value = Number(sale.salesAmount);
        return isNaN(value) ? 0 : value;
      });

      const predictedWMA = wma.map((item) => {
        const value = Number(item.wma);
        return isNaN(value) ? 0 : value;
      });
      const newMse = calculateMSE(actualSales, predictedWMA);

      const newMape = calculateMAPE(actualSales, predictedWMA);
      setMape(newMape);
      setMse(newMse);
    }
  }, [sales, wma]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAlkes = await getAlkesById(id);
        setAlkes(fetchedAlkes);
        const fetchedSales = await getSalesByAlkesId(id);
        setSales(fetchedSales);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (sales.length === 0 || period <= 2 || period > sales.length) {
      return;
    }

    const reversedSales = [...sales].reverse();
    const calculatedWMA = calculateWMA(reversedSales, period);
    const reversedCalculatedWMA = [...calculatedWMA].reverse();
    setWma(reversedCalculatedWMA);
  }, [sales, period]);

  const handlePeriodChange = (e) => {
    const newPeriod = parseInt(e.target.value, 10);
    if (newPeriod > 2 && newPeriod <= sales.length) {
      setPeriod(newPeriod);
    } else {
      alert(`Period must be greater than 2 and less than ${sales.length}`);
    }
  };

  const paginateWMA = (pageNumber) => setCurrentPageWMA(pageNumber);

  const totalWMAPages = Math.ceil(wma.length / itemsPerPage);

  const indexOfLastItemWMA = currentPageWMA * itemsPerPage;
  const indexOfFirstItemWMA = indexOfLastItemWMA - itemsPerPage;
  const currentWMA = wma.slice(indexOfFirstItemWMA, indexOfLastItemWMA);

  const salesAmount = currentWMA.map((item) => item.salesAmount);
  const wmaValue = currentWMA.map((item) => item.wma);

  return (
    <Layout>
      <div className="p-10 bg-gray-50">
        <h1 className="mb-8 text-3xl font-bold">Perhitungan {alkes?.name}</h1>
        <div className="mb-8">
          <label htmlFor="period" className="label">
            Jumlah Periode (Mingguan)
          </label>
          <input
            type="number"
            name="period"
            id="period"
            className="input input-bordered"
            value={period}
            onChange={handlePeriodChange}
            min="3"
            max={sales.length}
          />
        </div>
        <div className="overflow-x-auto shadow">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Minggu Ke-</th>
                <th>Penjualan</th>
                <th>Bobot</th>
                <th>Total Bobot</th>
                <th>WMA Detail</th>
                <th>Weighted Moving Average</th>
              </tr>
            </thead>
            <tbody>
              {currentWMA.map((item, index = 0) => (
                <tr
                  key={index}
                  className={`${index === 0 ? "font-bold bg-blue-200" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td>Week {item.index + 1}</td>
                  <td>{item.salesAmount}</td>
                  <td>{item?.periods?.join(", ")}</td>
                  <td>{item.totalPeriod}</td>
                  <td>{item.wmaString}</td>
                  <td>{item.wma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end my-4 space-x-4">
          <button
            onClick={() =>
              paginateWMA(currentPageWMA > 1 ? currentPageWMA - 1 : 1)
            }
            disabled={currentPageWMA === 1}
            className="btn"
          >
            &#8592;
          </button>
          <span>{currentPageWMA}</span>
          <button
            onClick={() =>
              paginateWMA(
                currentPageWMA < totalWMAPages
                  ? currentPageWMA + 1
                  : totalWMAPages
              )
            }
            disabled={currentPageWMA === totalWMAPages}
            className="btn"
          >
            &#8594;
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold">Mean Squared Error (MSE)</h2>
          {mse !== null ? (
            <p>{mse.toFixed(2)}</p>
          ) : (
            <p>Menghitung nilai MSE...</p>
          )}
        </div>
        <div className="my-4">
          <h2 className="text-xl font-bold">
            Mean Absolute Percentage Error (MAPE)
          </h2>
          {mse !== null ? (
            <p>{mape.toFixed(2)} %</p>
          ) : (
            <p>Menghitung nilai MAPE...</p>
          )}
        </div>
      </div>

      <LineChart actual={salesAmount} wma={wmaValue} />
    </Layout>
  );
};

export default CalculateAlkes;
