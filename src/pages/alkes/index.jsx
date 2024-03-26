import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import Modal from "../../components/modal/modal";
import FormCreateAlkes from "../../components/form/form-create-alkes";
import FormUpdateAlkes from "../../components/form/form-update-alkes";
import {
  createAlkes,
  getAlkesById,
  deleteAlkes,
  getAllAlkes,
  updateAlkes,
} from "../../service/alkes";

const Alkes = () => {
  const [data, setData] = useState([]);
  const [alkes, setAlkes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchAlkes();
  }, []);

  useEffect(() => {
    if (id !== null) {
      getAlkesById(id).then((alkes) => {
        setAlkes(alkes);
      });
    }
  }, [id]);

  const fetchAlkes = async () => {
    try {
      const alkesData = await getAllAlkes();
      setData(alkesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Alkes:", error);
    }
  };

  const handleUpdate = async (id, updatedAlkes) => {
    try {
      await updateAlkes(id, updatedAlkes);
      setData(
        data.map((alkesItem) =>
          alkesItem.id === id ? updatedAlkes : alkesItem
        )
      );
    } catch (error) {
      console.error("Error updating Alkes:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlkes(id);
      setData(data.filter((alkesItem) => alkesItem.id !== id));
    } catch (error) {
      console.error("Error deleting Alkes:", error.message);
    }
  };

  return (
    <Layout>
      {isModalCreate && (
        <Modal
          title="Tambah Alkes"
          setOpenModal={setIsModalCreate}
          children={
            <FormCreateAlkes
              setOpenModal={setIsModalCreate}
              data={data}
              setData={setData}
            />
          }
        />
      )}

      {isModalUpdate && (
        <Modal
          title="Edit Alkes"
          setOpenModal={setIsModalUpdate}
          children={
            <FormUpdateAlkes
              id={id}
              setOpenModal={setIsModalUpdate}
              data={data}
              setData={setData}
              handleUpdate={handleUpdate}
            />
          }
        />
      )}

      <h1 className="mb-8 text-3xl font-bold">Data Alkes</h1>
      <div className="flex items-center justify-end mb-8">
        <button
          onClick={() => setIsModalCreate(true)}
          className="btn btn-primary"
        >
          Tambah
        </button>
      </div>
      <div className="overflow-x-auto shadow">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            ) : (
              data.map((alkesItem, index) => (
                <tr key={alkesItem.id}>
                  <th>{index + 1}</th>
                  <td>{alkesItem.name}</td>
                  <td className="flex items-center justify-center space-x-4">
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(alkesItem.id)}
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => {
                        setId(alkesItem.id);
                        setIsModalUpdate(true);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <Link to={`/alkes/${alkesItem.id}`} className="btn">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Alkes;
