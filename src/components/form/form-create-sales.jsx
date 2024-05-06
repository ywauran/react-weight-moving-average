import React, { useState } from "react";
import { createSale } from "../../service/sales";
import Loading from "../loading";

const FormCreateSales = ({ fetchData, setOpenModal, id }) => {
  const [newSale, setNewSale] = useState({
    salesAmount: 0,
    updatedAt: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createSale(newSale, id);
      fetchData();
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating Sale:", error.message);
      setIsLoading(false);
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
          min="0"
        />
      </div>
      <div className="flex justify-end pt-2 space-x-4">
        <button onClick={() => setOpenModal(false)} className="w-16 btn">
          Tidak
        </button>
        <button
          onClick={handleCreate}
          className="w-16 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Ya"}
        </button>
      </div>
    </>
  );
};

export default FormCreateSales;
