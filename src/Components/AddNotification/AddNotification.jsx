// // working code for add notification with image
// import React, { useState } from "react";
// import { Input, Button, Upload, message } from "antd";
// import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useLocation, useNavigate } from "react-router-dom";
// import UploadImg from "../../assets/images/upload.svg";
// import { db } from "../../firebase/FirebaseConfig";
// import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
// import "../../styles/Button/Button.scss";
// import "../../styles/AddNotification/AddNotification.scss";
// const { TextArea } = Input;

// const AddNotification = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   const { notification } = location.state || {}; // Get notification data if editing

//   const [formData, setFormData] = useState({
//     title: notification ? notification.title : "",
//     url: notification
//       ? notification.url
//       : "https://dummyimage.com/600x400/000/fff", // Default dummy image
//     description: notification ? notification.description : ""
//   });

//   const handleSubmit = async () => {
//     // Validate required fields
//     if (!formData.title || !formData.description) {
//       message.error("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       if (notification) {
//         // Update existing notification
//         const notificationRef = doc(db, "notifications", notification.id);
//         await updateDoc(notificationRef, {
//           title: formData.title,
//           description: formData.description,
//           url: formData.url // Update the image URL if needed
//         });
//         message.success("Notification updated successfully");
//       } else {
//         // Create new notification
//         const notificationData = {
//           title: formData.title,
//           description: formData.description,
//           url: formData.url,
//           createdAt: new Date().toISOString()
//         };
//         await addDoc(collection(db, "notifications"), notificationData);
//         message.success("Notification added successfully");
//       }
//       navigate("/notification");
//     } catch (error) {
//       console.error("Error saving notification:", error);
//       message.error("Failed to save notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteImage = () => {
//     setFormData({ ...formData, url: "https://dummyimage.com/600x400/000/fff" }); // Reset to dummy image
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6 overflow-y-auto">
//       <div className="relative mt-[180px] w-[500px] rounded-lg bg-white p-8 shadow-sm">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/notification")}
//           className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
//         >
//           <CloseOutlined className="text-gray-600" />
//         </button>

//         {/* Title */}
//         <h1 className="mb-8 text-[22px] font-semibold text-gray-900">
//           Add new Notification
//         </h1>

//         {/* Form Fields */}
//         <div className="flex flex-col gap-6">
//           {/* Title Input */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-gray-700">Title:</label>
//             <Input
//               placeholder="Enter Title"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="h-11 rounded-md  custom-input-des "
//             />
//           </div>

//           {/* Display Prefilled Image Filename */}
//           {notification && notification.url && (
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-800">
//                   {notification.url.split("/").pop()}
//                 </span>
//                 <DeleteOutlined
//                   className="text-red-500 cursor-pointer"
//                   onClick={handleDeleteImage}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Upload Image */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-gray-700">
//               Upload Image:
//             </label>
//             <Upload
//               maxCount={1}
//               beforeUpload={(file) => {
//                 setFormData({ ...formData, url: URL.createObjectURL(file) });
//                 // We still allow upload UI but ignore the actual file
//                 return false;
//               }}
//               className="w-full"
//             >
//               <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
//                 <img src={UploadImg} alt="upload" />
//                 Upload Your Image
//               </Button>
//             </Upload>
//           </div>

//           {/* Description Input */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-gray-700">
//               Description:
//             </label>
//             <TextArea
//               placeholder="Description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="min-h-[120px] rounded-md  custom-input-des "
//               rows={4}
//               // style={{
//               //   boxShadow: "none",
//               //   borderColor: "#D1D5DB"
//               // }}
//             />
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             loading={loading}
//             className="mt-4 h-11 w-full bg-red-500 text-white text-[18px] font-semibold"
//           >
//             {" "}
//             {notification ? "Save Changes" : "Add New"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNotification;

import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase/FirebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UploadImg from "../../assets/images/upload.svg";
import "../../styles/Button/Button.scss";
import "../../styles/AddNotification/AddNotification.scss";
const { TextArea } = Input;

const AddNotification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { notification } = location.state || {};

  const [formData, setFormData] = useState({
    title: notification ? notification.title : "",
    url: notification ? notification.url : "",
    description: notification ? notification.description : "",
    file: null,
  });

  const handleUpload = async () => {
    if (!formData.file) {
      message.error("Please upload an image");
      return null;
    }

    const storageRef = ref(storage, `notifications/${formData.file.name}`);
    await uploadBytes(storageRef, formData.file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      message.error("Please fill in all fields");
      return;
    }

    if (!formData.file && !formData.url) {
      message.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = formData.url;

      if (formData.file) {
        imageUrl = await handleUpload();
      }

      if (notification) {
        const notificationRef = doc(db, "notifications", notification.id);
        await updateDoc(notificationRef, {
          title: formData.title,
          description: formData.description,
          url: imageUrl,
        });
        message.success("Notification updated successfully");
      } else {
        const notificationData = {
          title: formData.title,
          description: formData.description,
          url: imageUrl,
          createdAt: new Date().toISOString(),
        };
        await addDoc(collection(db, "notifications"), notificationData);
        message.success("Notification added successfully");
      }
      navigate("/notification");
    } catch (error) {
      console.error("Error saving notification:", error);
      message.error("Failed to save notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 py-6 px-10 text-2xl">
        {" "}
        <ArrowLeftOutlined
          className="text-gray-600 "
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6 overflow-y-auto">
        <div className="relative mt-[180px] w-[500px] rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-[22px] font-semibold text-gray-900">
            {formData?.title ? " Edit Notification" : "Add Notification"}
          </h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Title:</label>
              <Input
                placeholder="Enter Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-11 rounded-md custom-input-des"
              />
            </div>

            {formData.url && (
              <div className="flex items-center justify-between">
                <span className="text-gray-800">
                  {formData.url.split("/").pop()}
                </span>
                <DeleteOutlined
                  className="text-red-500 cursor-pointer"
                  onClick={() =>
                    setFormData({ ...formData, url: "", file: null })
                  }
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Upload Image:
              </label>
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={(file) => {
                  setFormData({ ...formData, file });
                  return false;
                }}
                className="w-full"
              >
                <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
                  <img src={UploadImg} alt="upload" /> Upload Your Image
                </Button>
              </Upload>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Description:
              </label>
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[120px] rounded-md custom-input-des"
                rows={4}
              />
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="mt-4 h-11 w-full bg-red-500 text-white text-[18px] font-semibold"
            >
              {notification ? "Save Changes" : "Add New"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotification;
