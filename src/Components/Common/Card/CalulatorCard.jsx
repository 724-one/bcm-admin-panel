// import React from "react";
// import { Card } from "antd";
// import { useNavigate } from "react-router-dom";

// const CalculatorCard = ({ title, image }) => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       hoverable
//       className="overflow-hidden lg:rounded-t-lg sm:rounged-md transition-transform hover:scale-[1.02] h-[200px]"
//       style={{
//         borderTopLeftRadius: "18.75px",
//         borderTopRightRadius: "18.75px"
//       }}
//       cover={
//         <div className="aspect-[4/3] overflow-hidden h-[144px]">
//           <img src={image} alt={title} className="h-full w-full object-cover" />
//         </div>
//       }
//       //onClick={() => navigate(`/calculator/${title.toLowerCase()}`)}
//     >
//       <Card.Meta
//         title={
//           <span className="text-base font-medium text-gray-900">{title}</span>
//         }
//       />
//     </Card>
//   );
// };

// export default CalculatorCard;

import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CalculatorCard = ({ id, title, image, onDelete }) => {
  return (
    <div className="relative">
      {" "}
      {/* Added container with relative positioning */}
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when deleting
          onDelete(id);
        }}
        className="absolute top-2 right-2 z-50 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300"
      >
        <DeleteOutlined className="text-white text-lg" />
      </button>
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
        <Card.Meta
          title={
            <span className="text-base font-medium text-gray-900">{title}</span>
          }
        />
      </Card>
    </div>
  );
};

export default CalculatorCard;
