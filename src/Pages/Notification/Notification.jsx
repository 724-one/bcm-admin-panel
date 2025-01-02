// import React from "react";
// import { Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import NotificationCard from "../../Components/Common/Card/NotificationCard";
// import cardImage from "../../assets/images/card2.png";
// import { useNavigate } from "react-router-dom";
// const Notification = () => {
//   const navigate = useNavigate();
//   const notificationItems = [
//     {
//       title: "How to prepare for construction",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     },
//     {
//       title: "How to find professionals",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     },
//     {
//       title: "Get an estimate",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     },
//     {
//       title: "How to prepare for construction",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     },
//     {
//       title: "How to find professionals",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     },
//     {
//       title: "Get an estimate",
//       image: cardImage,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
//     }
//   ];

//   return (
//     <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto ">
//       {/* Header with Add Button */}
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-900"></h1>

//         <button
//           onClick={() => navigate("/notification/add")}
//           className="group flex items-center gap-2 px-4 py-1 rounded-[10px] border-[1px] border-[#E81E1E] hover:bg-[#E81E1E] transition-colors duration-300"
//         >
//           <span className="text-2xl font-medium text-[#ED4B4B] group-hover:text-white transition-colors duration-300">
//             +
//           </span>
//           <span className="text-base font-[600] text-[#E61E2C] group-hover:text-white transition-colors duration-300">
//             Add New
//           </span>
//         </button>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-[40px]">
//         {notificationItems.map((item, index) => (
//           <NotificationCard key={index} {...item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;

// ==================get data from firebase ==================================
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../../firebase/FirebaseConfig";
// import NotificationCard from "../../Components/Common/Card/NotificationCard";

// const Notification = () => {
//   const navigate = useNavigate();
//   const [notificationItems, setNotificationItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from Firestore with console logs for debugging
//   useEffect(() => {
//     const fetchNotificationItems = async () => {
//       try {
//         console.log("Fetching notifications...");
//         const notificationsRef = collection(db, "notifications");
//         const querySnapshot = await getDocs(notificationsRef);

//         console.log(
//           "Raw data:",
//           querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//         );

//         const items = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           console.log("Document data:", data);
//           return {
//             id: doc.id,
//             title: data.title,
//             url: data.url,
//             description: data.description
//           };
//         });

//         console.log("Processed items:", items);
//         setNotificationItems(items);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching notification items:", error);
//         setLoading(false);
//       }
//     };

//     fetchNotificationItems();
//   }, []);

//   // Add this console log to check state updates
//   console.log("Current notificationItems:", notificationItems);

//   return (
//     <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
//       {/* Header with Add Button */}
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-900"></h1>
//         <button
//           onClick={() => navigate("/notification/add")}
//           className="group flex items-center gap-2 px-4 py-1 rounded-[10px] border-[1px] border-[#E81E1E] hover:bg-[#E81E1E] transition-colors duration-300"
//         >
//           <span className="text-2xl font-medium text-[#ED4B4B] group-hover:text-white transition-colors duration-300">
//             +
//           </span>
//           <span className="text-base font-[600] text-[#E61E2C] group-hover:text-white transition-colors duration-300">
//             Add New
//           </span>
//         </button>
//       </div>

//       {/* Grid Layout with Debug Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-[40px]">
//         {loading ? (
//           <div>Loading...</div>
//         ) : notificationItems.length === 0 ? (
//           <div>No notifications found</div>
//         ) : (
//           notificationItems.map((item) => (
//             <NotificationCard
//               key={item.id}
//               title={item.title}
//               image={item.url}
//               description={item.description}
//             />
//           ))
//         )}
//       </div>

//       {/* Debug section */}
//       {/* <div className="mt-4 p-4 bg-gray-100 rounded">
//         <p>Debug Info:</p>
//         <p>Loading: {loading.toString()}</p>
//         <p>Number of items: {notificationItems.length}</p>
//         <pre>{JSON.stringify(notificationItems, null, 2)}</pre>
//       </div> */}
//     </div>
//   );
// };

// export default Notification;

// working code for delete notification with delete card button

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import NotificationCard from "../../Components/Common/Card/NotificationCard";
import { Modal, message } from "antd"; // Import Modal for confirmation

const Notification = () => {
  const navigate = useNavigate();
  const [notificationItems, setNotificationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const notificationsRef = collection(db, "notifications");
      const querySnapshot = await getDocs(notificationsRef);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotificationItems(items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      message.error("Failed to fetch notifications");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle delete notification
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Notification",
      content: "Are you sure you want to delete this notification?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // Delete from Firestore
          await deleteDoc(doc(db, "notifications", id));

          // Update local state
          setNotificationItems((prev) => prev.filter((item) => item.id !== id));

          message.success("Notification deleted successfully");
        } catch (error) {
          console.error("Error deleting notification:", error);
          message.error("Failed to delete notification");
        }
      }
    });
  };

  return (
    <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
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
        {loading ? (
          <div>Loading...</div>
        ) : notificationItems.length === 0 ? (
          <div>No notifications found</div>
        ) : (
          notificationItems.map((item) => (
            <NotificationCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.url}
              description={item.description}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
