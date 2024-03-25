import { Link } from "react-router-dom";
import Layout from "../../layout";

const Alkes = () => {
  // Dummy data for the table
  const dataAlkes = [
    { id: 1, name: "Alat Kesehatan 1" },
    { id: 2, name: "Alat Kesehatan 2" },
    { id: 3, name: "Alat Kesehatan 3" },
    // Add as many objects as needed to simulate your data
  ];

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold">Data Alkes</h1>
      <div className="flex items-center justify-end mb-8">
        <button className="btn btn-primary">Tambah</button>
      </div>
      <div className="overflow-x-auto shadow">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataAlkes.map((alkes, index) => (
              <tr key={alkes.id}>
                <th>{index + 1}</th>
                <td>{alkes.name}</td>
                <td className="flex items-center justify-center space-x-4">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-error">Hapus</button>
                  <Link to={`/alkes/${alkes.id}`} className="btn ">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Alkes;
