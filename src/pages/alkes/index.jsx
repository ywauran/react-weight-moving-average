import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import Modal from "../../components/modal/modal";
import FormCreateAlkes from "../../components/form/form-create-alkes";
import FormUpdateAlkes from "../../components/form/form-update-alkes";
import FormDeleteAlkes from "../../components/form/form-delete-alkes";
import { getAllAlkes } from "../../service/alkes";

const PAGE_SIZE = 5;

const Alkes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAlkes();
  }, [currentPage]); // Trigger fetchAlkes on page change

  const fetchAlkes = async () => {
    setIsLoading(true);
    try {
      const response = await getAllAlkes();
      setData(response.alkes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Alkes:", error);
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
              fetchData={fetchAlkes}
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
              fetchData={fetchAlkes}
            />
          }
        />
      )}

      {isModalDelete && (
        <Modal
          title="Hapus Alkes"
          setOpenModal={setIsModalDelete}
          children={
            <FormDeleteAlkes
              setOpenModal={setIsModalDelete}
              fetchData={fetchAlkes}
              id={id}
            />
          }
        />
      )}

      <h1 className="mb-8 text-3xl font-bold">Data Alkes</h1>
      <>
        <div className="flex items-center justify-end mb-8">
          <button
            onClick={() => setIsModalCreate(true)}
            className="btn btn-primary"
          >
            Tambah
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow">
          <table className="table text-center">
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
                currentData.map((alkesItem, index) => (
                  <tr key={alkesItem.id}>
                    <th>{startIndex + index + 1}</th>

                    <td className="font-semibold">{alkesItem.name}</td>
                    <td className="flex items-center justify-center space-x-4">
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          setId(alkesItem.id);
                          setIsModalDelete(true);
                        }}
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
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="btn"
            onClick={handlePrevPage}
            disabled={!canGoPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="btn"
            onClick={handleNextPage}
            disabled={!canGoNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </>
    </Layout>
  );
};

export default Alkes;
