import React from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Delete from "../../../assets/Icons/Delete.svg";
import Edit from "../../../assets/Icons/Edit.svg";

const CalculatorCard = ({ id, title, image, onDelete, onEdit }) => {
  return (
    <div className="relative">
      {" "}
      {/* Added container with relative positioning */}
      {/* Delete Button */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when deleting
          onDelete(id);
        }}
        className="absolute top-2 right-2 z-50 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300"
      >
        <DeleteOutlined className="text-white text-lg" />
      </button> */}
      <Card
        hoverable
        className="overflow-hidden lg:rounded-t-lg sm:rounged-md transition-transform hover:scale-[1.02] h-[200px]"
        style={{
          borderTopLeftRadius: "18.75px",
          borderTopRightRadius: "18.75px"
        }}
        cover={
          <div className="aspect-[4/3] overflow-hidden h-[144px]">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        }
      >
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">{title}</span>
          <div className="flex space-x-2">
            <img
              src={Edit}
              onClick={() => onEdit(id)}
              className="w-[20px] h-[20px] text-gray-500 cursor-pointer"
            />

            <img
              src={Delete}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when deleting
                onDelete(id);
              }}
              className="w-[20px] h-[20px] text-gray-500 cursor-pointer"
            />
            {/* <EditOutlined
              className="text-gray-500 cursor-pointer"
              onClick={() => onEdit(id)}
            /> */}
            {/* <DeleteOutlined
              className="text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when deleting
                onDelete(id);
              }}
            /> */}
          </div>
        </div>
        {/* <Card.Meta
          title={
            <span className="text-base font-medium text-gray-900">{title}</span>
          }
        /> */}
      </Card>
    </div>
  );
};

export default CalculatorCard;
