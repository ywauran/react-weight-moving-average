import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import LineChart from "../../components/chart/line-chart";
import { getAlkesById } from "../../service/alkes";
import { getSalesByAlkesId } from "../../service/sales";
import calculateWMA from "../../service/wma";

const CalculateAlkes = () => {
  const { id } = useParams();
  const [period, setPeriod] = useState(3); // Start with default value satisfying the new condition
  const [sales, setSales] = useState([]);
  const [wma, setWma] = useState([]);
  const [alkes, setAlkes] = useState({});

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
    if (sales.length > 0 && period > 2 && period <= sales.length) {
      setWma(calculateWMA(sales, period));
    }
  }, [sales, period]);

  const handlePeriodChange = (e) => {
    const newPeriod = parseInt(e.target.value, 10);
    // Check the new period against the conditions before setting it
    if (newPeriod > 2 && newPeriod <= sales.length) {
      setPeriod(newPeriod);
    } else {
      alert(
        "Periode harus lebih dari 2 dan kurang dari panjang data penjualan - 1"
      );
    }
  };

  return (
    <Layout>
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
              <th>Weight Moving Average</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={sale.id}>
                <td>{index + 1}</td>
                <td>Minggu Ke-{index + 1}</td>
                <td>{sale.salesAmount}</td>
                <td>{wma.length > index ? wma[index] : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <LineChart actual={sales.map((sale) => sale.salesAmount)} wma={wma} />
      </div>
    </Layout>
  );
};

export default CalculateAlkes;
