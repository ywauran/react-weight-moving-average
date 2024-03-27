import React, { useState } from "react";
import { createAlkes } from "../../service/alkes";
import Loading from "../loading";

const FormCreateAlkes = ({ fetchData, setOpenModal }) => {
  const [newAlkes, setNewAlkes] = useState({
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlkes((prevAlkes) => ({
      ...prevAlkes,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const createdAlkes = await createAlkes(newAlkes);
      fetchData();
      setOpenModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error creating Alkes:", error.message);
      setLoading(false);
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
        <button onClick={handleCreate} className="w-16 btn btn-primary">
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </>
  );
};

export default FormCreateAlkes;
