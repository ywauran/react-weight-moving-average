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
  const [wmaSteps, setWmaSteps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAlkes = await getAlkesById(id);
        setAlkes(fetchedAlkes);
        const fetchedSales = await getSalesByAlkesId(id);
        setSales(fetchedSales);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Tambahkan penanganan kesalahan di sini jika diperlukan
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (sales.length > 0 && period > 2 && period <= sales.length) {
      const calculatedWMA = calculateWMA(sales, period);
      setWma(calculatedWMA);

      // Perhitungan langkah-langkah WMA
      const steps = sales.map((sale, index) => {
        const weights = Array.from({ length: period }, (_, i) => period - i);
        const weightedSales = sales
          .slice(index, index + period)
          .map((s, i) => s.salesAmount * weights[i]);
        const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
        const totalWeightedSales = weightedSales.reduce(
          (acc, curr) => acc + curr,
          0
        );
        return {
          week: index + 1,
          previousSales: index > 0 ? sales[index - 1].salesAmount : "N/A",
          weights,
          weightedSales,
          totalWeight,
          totalWeightedSales,
          wma: index >= period - 1 ? calculatedWMA[index] : "N/A",
        };
      });
      setWmaSteps(steps);
    }
  }, [sales, period]);

  const handlePeriodChange = (e) => {
    const newPeriod = parseInt(e.target.value, 10);
    if (newPeriod > 2 && newPeriod <= sales.length) {
      setPeriod(newPeriod);
    } else {
      // Ubah cara menampilkan pesan kesalahan
      alert(`Periode harus lebih dari 2 dan kurang dari ${sales.length}`);
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
      {wmaSteps.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            Langkah-langkah Perhitungan WMA
          </h2>
          <div className="overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>Minggu</th>
                  <th>Penjualan Sebelumnya</th>
                  <th>Bobot</th>
                  <th>Penjualan x Bobot</th>
                  <th>Total Bobot</th>
                  <th>Total Penjualan yang Dibobotkan</th>
                  <th>Detail Sebelum Hasil</th>
                  <th>WMA</th>
                </tr>
              </thead>
              <tbody>
                {wmaSteps?.map((step) => (
                  <tr key={step.week}>
                    <td>{step.week}</td>
                    <td>{step.previousSales}</td>
                    <td>{step.weights.join(", ")}</td>
                    <td>{step.weightedSales.join(", ")}</td>
                    <td>{step.totalWeight}</td>
                    <td>{step.totalWeightedSales}</td>
                    <td>
                      {step?.week >= period
                        ? `=((${step?.weightedSales?.join("+")})/${
                            step?.totalWeight
                          })`
                        : "N/A"}
                    </td>
                    <td>{step.wma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CalculateAlkes;
