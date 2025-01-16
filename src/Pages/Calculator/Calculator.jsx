import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import CalculatorCard from "../../Components/Common/Card/CalulatorCard";
import { Modal, message } from "antd";
import { useSearchContext } from "../../Components/SearchContext/SearchProvider";
import "../../styles/Button/Button.scss";
const Calculator = () => {
  const navigate = useNavigate();
  const [calculatorItems, setCalculatorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchValue } = useSearchContext();

  // Fetch calculators
  const fetchCalculators = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "calculators"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCalculatorItems(items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching calculator items:", error);
      message.error("Failed to fetch calculators");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalculators();
  }, []);

  // Handle delete calculator
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Calculator",
      content: "Are you sure you want to delete this calculator?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      style: {
        transform: "translate(110%, 40%)", // Start from the left
        left: "0%", // Position it off-screen to the left
        transition: "transform 0.3s ease-in-out" // Add transition for smooth effect
      },
      onOk: async () => {
        try {
          // Delete from Firestore
          await deleteDoc(doc(db, "calculators", id));

          // Update local state
          setCalculatorItems((prev) => prev.filter((item) => item.id !== id));

          message.success("Calculator deleted successfully");
        } catch (error) {
          console.error("Error deleting calculator:", error);
          message.error("Failed to delete calculator");
        }
      }
    });
  };

  const handleEdit = (id) => {
    const calculatorToEdit = calculatorItems.find((item) => item.id === id);
    navigate("/calculator/add", { state: { calculator: calculatorToEdit } });
  };

  // Add this function to filter calculators
  const filteredCalculators = calculatorItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  console.log(filteredCalculators);

  return (
    <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
      {/* Header with Add Button */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900"></h1>
        <button
          onClick={() => navigate("/calculator/add")}
          className="group flex items-center gap-2 px-4 py-2 rounded-[10px] border-[1px] border-[#E81E1E] hover:bg-[#E81E1E] transition-colors duration-300"
        >
          <span className="text-[16px] font-medium text-[#ED4B4B] group-hover:text-white transition-colors duration-300">
            +
          </span>
          <span className="text-[16px] font-[600] text-[#E61E2C] group-hover:text-white transition-colors duration-300">
            Add New
          </span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 pb-[40px] gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : filteredCalculators.length === 0 ? (
          <div>No calculators found</div>
        ) : (
          filteredCalculators.map((item) => (
            <CalculatorCard
              key={item.id}
              id={item.id}
              title={item.name} // Using name instead of title
              image={item.url}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
