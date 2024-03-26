import React, { useState } from "react";
import { createAlkes } from "../../service/alkes";

const FormCreateAlkes = ({ setData, data, setOpenModal }) => {
  const [newAlkes, setNewAlkes] = useState({
    name: "",
    createdAt: new Date().toISOString(), // Set createdAt to current time
    updatedAt: new Date().toISOString(), // Set updatedAt to current time
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlkes((prevAlkes) => ({
      ...prevAlkes,
      [name]: value,
      updatedAt: new Date().toISOString(), // Update updatedAt on change
    }));
  };

  const handleCreate = async () => {
    try {
      const createdAlkes = await createAlkes(newAlkes);
      setData([...data, createdAlkes]);
      setOpenModal(false); // Close modal on successful creation
    } catch (error) {
      console.error("Error creating Alkes:", error.message);
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
          Ya
        </button>
      </div>
    </>
  );
};

export default FormCreateAlkes;
