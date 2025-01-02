import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NotificationCard from "../../Components/Common/Card/NotificationCard";
import cardImage from "../../assets/images/card2.png";
import { useNavigate } from "react-router-dom";
const Notification = () => {
  const navigate = useNavigate();
  const notificationItems = [
    {
      title: "How to prepare for construction",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
      title: "How to find professionals",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
      title: "Get an estimate",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
      title: "How to prepare for construction",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
      title: "How to find professionals",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    },
    {
      title: "Get an estimate",
      image: cardImage,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    }
  ];

  return (
    <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto ">
      {/* Header with Add Button */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900"></h1>

        <button
          onClick={() => navigate("/notification/add")}
          className="group flex items-center gap-2 px-4 py-1 rounded-[10px] border-[1px] border-[#E81E1E] hover:bg-[#E81E1E] transition-colors duration-300"
        >
          <span className="text-2xl font-medium text-[#ED4B4B] group-hover:text-white transition-colors duration-300">
            +
          </span>
          <span className="text-base font-[600] text-[#E61E2C] group-hover:text-white transition-colors duration-300">
            Add New
          </span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-[40px]">
        {notificationItems.map((item, index) => (
          <NotificationCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
