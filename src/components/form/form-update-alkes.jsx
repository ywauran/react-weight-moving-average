import React, { useEffect, useState } from "react";
import { updateAlkes, getAlkesById } from "../../service/alkes";
import Loading from "../loading";

const FormUpdateAlkes = ({ fetchData, setOpenModal, id }) => {
  const [newAlkes, setNewAlkes] = useState({
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAlkesById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlkes((prevAlkes) => ({
      ...prevAlkes,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const fetchAlkesById = async (id) => {
    try {
      const alkes = await getAlkesById(id);
      setNewAlkes(alkes);
    } catch (error) {
      console.error("Error fetching Alkes:", error.message);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateAlkes(id, newAlkes);
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating Alkes:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="name" className="label">
          Nama Alat Kesehatan
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full input input-bordered"
          value={newAlkes.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <button onClick={() => setOpenModal(false)} className="w-16 btn">
          Tidak
        </button>
        <button
          onClick={handleUpdate}
          className="w-16 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </>
  );
};

export default FormUpdateAlkes;
