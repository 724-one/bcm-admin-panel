// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { CloseOutlined } from "@ant-design/icons";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const NotificationDetail = () => {
//   const location = useLocation();
//   const { notification } = location.state || {}; // Get notification data from state
//   console.log(notification);

//   return (
//     <div className="h-full w-full bg-gray-50 p-8">
//       {/* Page Title */}
//       <h1 className="mb-6 text-2xl font-bold text-[#1E1E1E]">
//         {notification.title}
//       </h1>

//       {/* White Content Card */}
//       <div className="relative  rounded-lg bg-white p-8 2xl:h-[676px] lg:h-[400px] md:h-[380px] shadow-sm">
//         <div className=" flex flex-col justify-between items-center mb-4"></div>
//         <div className="flex justify-between items-start">
//           {/* User Header with Image */}
//           <div className="mb-12 flex w-[44%] ml-[55px] justify-between">
//             <h2 className="text-xl font-semibold text-[#1E1E1E]">
//               {/* {userData.name} */}
//             </h2>
//             <img
//               src={notification.url || "https://via.placeholder.com/64"}
//               // alt={userData.name}
//               className="h-[150px] w-[300px] rounded-sm object-cover"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <EditOutlined className="text-gray-500 cursor-pointer" />
//             <DeleteOutlined
//               className="text-red-500 cursor-pointer"
//               onDelete={handleDeleteNotification}
//             />
//           </div>
//         </div>
//         <div> {notification.description}</div>
//       </div>
//     </div>
//   );
// };

// export default NotificationDetail;

// src/Pages/Notification/NotificationDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import { db } from "../../../firebase/FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

import Delete from "../../../assets/Icons/Delete.svg";
import Edit from "../../../assets/Icons/Edit.svg";
const NotificationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notification } = location.state || {}; // Get notification data from state

  if (!notification) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate("/notification/add", { state: { notification } }); // Pass notification data to edit
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Delete Notification",
      content: "Are you sure you want to delete this notification?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      bodyStyle: { overflow: "hidden" },
      style: {
        transform: "translate(110%, 40%)", // Start from the left
        left: "0%", // Position it off-screen to the left
        transition: "transform 0.3s ease-in-out" // Add transition for smooth effect
      },
      onOk: async () => {
        try {
          await deleteDoc(doc(db, "notifications", notification.id));
          message.success("Notification deleted successfully");
          navigate("/notification"); // Navigate back to notifications list
        } catch (error) {
          console.error("Error deleting notification:", error);
          message.error("Failed to delete notification");
        }
      }
    });
  };

  return (
    <div className="h-full w-full bg-gray-50 p-8 overflow-y-auto">
      {" "}
      {/* P Title */}
      <h1 className="mb-6 font-poppins text-[22px] font-semibold  text-left text-[#1E1E1E]">
        {notification.title}
      </h1>
      <div className="relative  rounded-lg bg-white p-8 2xl:h-[676px] lg:h-[500px] md:h-[380px] shadow-sm  mb-10">
        {/* <div className="flex  justify-between ml-[200px] items-start  space-x-2">
          <img
            src={notification.url}
            alt={notification.title}
            className="w-full max-w-[300px] h-auto object-cover" // Responsive width with max width
            // className="w-[300px] h-[150px] object-cover" // Adjust width and height as needed
          />
          <div className="flex items-center  gap-x-2">
            <EditOutlined
              className="text-gray-500 cursor-pointer"
              onClick={handleEdit}
            />
            <DeleteOutlined
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div> */}

        <div className="flex justify-between items-start 2xl-w-auto lg:ml-[260px]  ">
          {" "}
          {/* Use justify-between to push icons to the end */}
          <img
            src={notification.url}
            alt={notification.title}
            className="w-full max-w-[330px] rounded-[5px] h-[160px] object-cover" // Responsive width with max width
          />
          <div className="flex items-start space-x-2">
            {" "}
            {/* Align icons in a row */}
            <img
              src={Edit}
              onClick={handleEdit}
              className="w-[20px] h-[20px] text-gray-500 cursor-pointer"
            />
            {/* <EditOutlined
              className="text-gray-500 cursor-pointer"
              onClick={handleEdit}
            /> */}
            <img
              src={Delete}
              onClick={handleDelete}
              className="w-[20px] h-[23px] text-red-500 cursor-pointer"
            />
            {/* <DeleteOutlined
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            /> */}
          </div>
        </div>

        {/* Wrap the paragraph in a div with overflow-y-auto */}
        <div className="mt-[4rem] pb-4 overflow-y-auto h-[220px] sidebar-hidden">
          {/* Set a fixed height */}
          <p className="font-poppins text-[13px] font-400] leading-[30px] text-left text-[#151515]">
            {notification.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
