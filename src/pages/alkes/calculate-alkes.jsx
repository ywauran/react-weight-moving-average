import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import LineChart from "../../components/chart/line-chart";
import { getAlkesById } from "../../service/alkes";
import { getSalesByAlkesId } from "../../service/sales";
import calculateWMA from "../../service/wma";

const CalculateAlkes = () => {
  const { id } = useParams();
  const [period, setPeriod] = useState(3);
  const [sales, setSales] = useState([]);
  const [wma, setWma] = useState([]);
  const [alkes, setAlkes] = useState({});
  const [currentPageWMA, setCurrentPageWMA] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAlkes = await getAlkesById(id);
        setAlkes(fetchedAlkes);
        const fetchedSales = await getSalesByAlkesId(id);
        setSales(fetchedSales);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here if needed
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

  return (
    <Layout>
      <div className="p-10 bg-gray-50">
        <h1 className="mb-8 text-3xl font-bold">Perhitungan {alkes?.name}</h1>
        <div className="mb-8">
          <label htmlFor="period" className="label">
            Periode
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
                <th>Week</th>
                <th>Sales</th>
                <th>Weights</th>
                <th>Total Weight</th>
                <th>WMA Detail</th>
                <th>Weighted Moving Average</th>
              </tr>
            </thead>
            <tbody>
              {currentWMA.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Week {item.index + 2}</td>
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
            &#8592; Prev
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
            Next &#8594;
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CalculateAlkes;
