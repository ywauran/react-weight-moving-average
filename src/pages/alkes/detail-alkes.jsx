import Layout from "../../layout";
import { Link, useParams } from "react-router-dom";

const DetailAlkes = () => {
  const { id } = useParams();
  const dataAlkes = [
    { id: 1, transactionAmount: 10 },
    { id: 2, transactionAmount: 20 },
    { id: 3, transactionAmount: 30 },
    // Add as many objects as needed to simulate your data
  ];

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Alkes 1</h1>
      <div>{id}</div>
      <div className="flex items-center justify-between mb-8">
        <button className="btn btn-primary">Tambah</button>
        <Link to={`/alkes/calculate/${id}`} className="btn">
          Lihat Perhitungan
        </Link>
      </div>
      <div className="overflow-x-auto shadow">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Penjualan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataAlkes.map((alkes, index) => (
              <tr key={alkes.id}>
                <th>{index + 1}</th>
                <td>{alkes.transactionAmount}</td>
                <td className="flex items-center justify-center space-x-4">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-error">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DetailAlkes;
