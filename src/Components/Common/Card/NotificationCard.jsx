import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const NotificationCard = ({
  id,
  title,
  image,
  description,
  onDelete,
  onClick
}) => {
  return (
    <div className="relative">
      {" "}
      {/* Added relative positioning */}
      {/* Delete Button */}
      <div className="flex flex-col gap-3 h-full">
        {/* Title above card with truncation */}
        <h2 className="text-xl font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>

        {/* Card */}
        <Card
          hoverable
          onClick={onClick}
          className="h-[350px] overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
          bodyStyle={{ padding: 0 }}
        >
          {/* Image Section */}
          <div className="aspect-video h-[200px] w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 overflow-y-auto overflow-hidden text-ellipsis ">
            <p className="font-poppins text-[14px] font-normal leading-[21px] text-left text-gray-600 line-clamp-5">
              {description}
            </p>
            {/* <button
              onClick={() => onDelete(id)}
              className="absolute top-2 right-2 z-50 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              <DeleteOutlined className="text-white text-lg" />
            </button> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationCard;
