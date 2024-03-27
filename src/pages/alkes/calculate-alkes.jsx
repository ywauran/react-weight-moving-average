import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import LineChart from "../../components/chart/line-chart";
import { getAlkesById } from "../../service/alkes";
import { getSalesByAlkesId } from "../../service/sales";

const CalculateAlkes = () => {
  const { id } = useParams();
  const [period, setPeriod] = useState(3);

  const [sales, setSales] = useState([]); // Mengubah periode menjadi 3
  const [wma, setWma] = useState(Array(sales?.length).fill(0));
  const [actual, setActual] = useState([]);
  const [alkes, setAlkes] = useState({});

  const fetchAlkes = async () => {
    try {
      const alkes = await getAlkesById(id);
      setAlkes(alkes);
    } catch (error) {
      console.error("Error fetching alkes:", error);
    }
  };

  const fetchSalesByAlkesId = async () => {
    try {
      const sales = await getSalesByAlkesId(id);
      console.log(sales);
      setSales(sales);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const calculateWMA = (startIndex) => {
    let sum = 0;
    let weightSum = 0;
    let weight = period;

    for (let i = 0; i < period; i++) {
      sum += sales[startIndex + i].salesAmount * weight;
      weightSum += weight;
      weight--;
    }

    return sum / weightSum;
  };

  useEffect(() => {
    if (period > 0) {
      const calculatedWma = [];
      for (let i = 0; i < sales.length; i++) {
        if (i >= period - 1) {
          calculatedWma.push(calculateWMA(i - period + 1).toFixed(2));
        } else {
          calculatedWma.push(0);
        }
      }
      setWma(calculatedWma);
    }
  }, [sales, period]);

  useEffect(() => {
    const actualData = sales.map((item) => item.salesAmount);
    setActual(actualData);
  }, [sales]);

  useEffect(() => {
    fetchAlkes();
    fetchSalesByAlkesId();
  }, [id]);

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
          onChange={(e) => setPeriod(parseInt(e.target.value))}
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
            {sales.map((alkes, index) => (
              <tr key={alkes.id}>
                <td>{index + 1}</td>
                <td>Minggu Ke-{index + 1}</td>
                <td>{alkes.salesAmount}</td>
                <td>{wma[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <LineChart actual={actual} wma={wma} />
      </div>
      {/* Proses perhitungan ditambahkan di bawah ini */}
      <div className="mt-8">
        <h2>Proses Perhitungan Weighted Moving Average (WMA)</h2>
        <ol>
          {sales.map((_, index) => (
            <li key={index}>
              Minggu ke-{index + 1}:{" "}
              {index >= period - 1
                ? `(${sales
                    .slice(index - period + 1, index + 1)
                    .map((item) => item.salesAmount)
                    .join(" + ")}) * (3 + 2 + 1) / 6 = ${wma[index]}`
                : "Belum dapat dihitung"}
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
};

export default CalculateAlkes;
