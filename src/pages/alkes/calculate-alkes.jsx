import Layout from "../../layout";
import { useParams } from "react-router-dom";
import LineChart from "../../components/chart/line-chart";

const CalculateAlkes = () => {
  const { id } = useParams();
  const dataAlkes = [
    { id: 1, transactionAmount: 10 },
    { id: 2, transactionAmount: 20 },
    { id: 3, transactionAmount: 30 },
    // Add as many objects as needed to simulate your data
  ];
  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Perhitungan Alkes 1</h1>
      <div>{id}</div>
      <div className="mb-8">
        <label htmlFor="" className="label">
          Jumlah Periode (Mingguan)
        </label>
        <input
          type="number"
          name="period"
          id="period"
          className="input input-bordered"
        />
      </div>
      <div className="overflow-x-auto shadow">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Minggu Ke-</th>
              <th>Penjualan</th>
              <th>Weight Moving Average</th>
            </tr>
          </thead>
          <tbody>
            {dataAlkes.map((alkes, index) => (
              <tr key={alkes.id}>
                <th>{index + 1}</th>
                <td>Minggu Ke-{index + 1}</td>
                <td>0</td>
                <td>{alkes.transactionAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <LineChart />
      </div>
    </Layout>
  );
};

export default CalculateAlkes;
