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
      <div className="p-10">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
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
                          onClick={() => {
                            setId(alkesItem.id);
                            setIsModalUpdate(true);
                          }}
                          className="btn btn-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>
                        <Link to={`/alkes/${alkesItem.id}`} className="btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
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
      </div>
    </Layout>
  );
};

export default Alkes;
