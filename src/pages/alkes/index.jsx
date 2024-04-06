import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import Modal from "../../components/modal/modal";
import FormCreateAlkes from "../../components/form/form-create-alkes";
import FormUpdateAlkes from "../../components/form/form-update-alkes";
import FormDeleteAlkes from "../../components/form/form-delete-alkes";
import { getAllAlkes } from "../../service/alkes";
import TableSkeleton from "../../components/skeleton/table";

const PAGE_SIZE = 5;

const Alkes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [docSnapshots, setDocSnapshots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    fetchAlkes();
  }, []);

  const fetchAlkes = async (forward = true) => {
    setIsLoading(true);
    try {
      // Determine the startAfterDoc based on the direction of navigation
      const startAfterDoc = forward
        ? docSnapshots[docSnapshots.length - 1] || null
        : docSnapshots[docSnapshots.length - 3] || null; // Go two steps back for backward navigation

      const response = await getAllAlkes(PAGE_SIZE, startAfterDoc);
      setData(response.alkes);
      setIsLoading(false);

      // Update docSnapshots stack based on navigation direction
      if (response.alkes.length > 0) {
        if (forward) {
          setDocSnapshots([...docSnapshots, response.lastVisible]);
        } else {
          setDocSnapshots(docSnapshots.slice(0, -1));
        }
      }

      setCanGoNext(!!response.alkes.length);
      setCanGoPrev(docSnapshots.length > 1); // Enable "Previous" if there are snapshots to go back to
    } catch (error) {
      console.error("Error fetching Alkes:", error);
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    fetchAlkes(true);
  };

  const handlePrevPage = () => {
    if (docSnapshots.length > 1) {
      // Ensure there's a previous page to go back to
      fetchAlkes(false);
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
                data.map((alkesItem, index) => (
                  <tr key={alkesItem.id}>
                    <th>{(currentPage - 1) * PAGE_SIZE + index + 1}</th>

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
        <div className="flex justify-between mt-4">
          <button className="btn" onClick={handlePrevPage}>
            Previous
          </button>
          <button className="btn" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </>
    </Layout>
  );
};

export default Alkes;
