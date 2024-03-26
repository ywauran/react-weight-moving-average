import Layout from "../../layout";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSalesByAlkesId } from "../../service/sales";
import Modal from "../../components/modal/modal";
import FormCreateSales from "../../components/form/form-create-sales";

const DetailAlkes = () => {
  const { id } = useParams();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [sales, setSales] = useState([]);

  const fetchSalesByAlkesId = async () => {
    try {
      const sales = await getSalesByAlkesId(id);
      setSales(sales);

      console.log(sales);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSalesByAlkesId();
  }, [id]);

  return (
    <Layout>
      {isModalCreate && (
        <Modal
          isOpen={isModalCreate}
          setOpenModal={setIsModalCreate}
          title="Tambah Penjualan"
        >
          <FormCreateSales
            setData={setSales}
            data={sales}
            id={id}
            setOpenModal={setIsModalCreate}
          />
        </Modal>
      )}
      <h1 className="mb-8 text-3xl font-bold">Alkes 1</h1>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setIsModalCreate(true)}
          className="btn btn-primary"
        >
          Tambah
        </button>
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
            {sales.map((sale, index) => (
              <tr key={sale.id}>
                <th>{index + 1}</th>
                <td>{sale.salesAmount}</td>
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
