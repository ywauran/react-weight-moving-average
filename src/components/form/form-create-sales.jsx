import React, { useState } from "react";
import { createSale } from "../../service/sales";

const FormCreateSales = ({ setData, data, setOpenModal, id }) => {
  const [newSale, setNewSale] = useState({
    salesAmount: 0,
    createdAt: new Date().toISOString(), // Set createdAt to current time
    updatedAt: new Date().toISOString(), // Set updatedAt to current time
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: value, // Menggunakan name, bukan newSales
      updatedAt: new Date().toISOString(), // Update updatedAt on change
    }));
  };

  const handleCreate = async () => {
    try {
      const createdSale = await createSale(newSale, id); // Menggunakan createSale
      setData([...data, createdSale]);
      setOpenModal(false); // Close modal on successful creation
    } catch (error) {
      console.error("Error creating Sale:", error.message);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="salesAmount" className="label">
          Penjualan
        </label>
        <input
          type="number"
          name="salesAmount"
          id="salesAmount"
          className="w-full input input-bordered"
          value={newSale.salesAmount}
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

export default FormCreateSales;
