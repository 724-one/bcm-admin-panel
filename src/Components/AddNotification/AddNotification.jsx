// import React, { useState } from "react";
// import { Input, Button, Upload, message } from "antd";
// import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import UploadImg from "../../assets/images/upload.svg";
// import "../../styles/Button/Button.scss";
// import "../../styles/AddNotification/AddNotification.scss";
// const { TextArea } = Input;

// const AddNotification = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     image: null,
//     description: ""
//   });

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       // Add your API call here
//       message.success("Notification added successfully");
//       navigate("/notification");
//     } catch (error) {
//       message.error("Failed to add notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6 overflow-y-auto">
//       <div className="relative mt-[180px] w-[500px] rounded-lg bg-white p-8 shadow-sm">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/notification")}
//           className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
//         >
//           <CloseOutlined className="text-gray-600" />
//         </button>

//         {/* Title */}
//         <h1 className="mb-8 text-xl font-semibold text-gray-900">
//           Add new Notification
//         </h1>

//         {/* Form Fields */}
//         <div className="flex flex-col gap-6">
//           {/* Title Input */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">Title:</label>
//             <Input
//               placeholder="Enter Name"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="h-11 rounded-md"
//             />
//           </div>

//           {/* Upload Image */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">
//               Upload Image:
//             </label>
//             <Upload
//               maxCount={1}
//               beforeUpload={(file) => {
//                 setFormData({ ...formData, image: file });
//                 return false;
//               }}
//               className="w-full"
//             >
//               <Button
//                 // icon={<UploadOutlined />}
//                 className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500"
//               >
//                 <img src={UploadImg} />
//                 Upload Your Image
//               </Button>
//             </Upload>
//           </div>

//           {/* Description Input */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">
//               Description:
//             </label>
//             <TextArea
//               placeholder="Description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="min-h-[120px] rounded-md !border-[#D1D5DB]"
//               rows={4}
//               style={{
//                 boxShadow: "none",
//                 borderColor: "#D1D5DB"
//               }}
//             />
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             loading={loading}
//             className="mt-4 h-11 w-full bg-red-500 text-white  text-xl font-semibold"
//           >
//             Add New
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNotification;

// working code for add notification with image
import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UploadImg from "../../assets/images/upload.svg";
import { db } from "../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const { TextArea } = Input;

const AddNotification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "https://dummyimage.com/600x400/000/fff", // Default dummy image
    description: ""
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title || !formData.description) {
      message.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Create notification data with dummy image URL
      const notificationData = {
        title: formData.title,
        description: formData.description,
        url: "https://dummyimage.com/600x400/000/fff", // Always use dummy image
        createdAt: new Date().toISOString()
      };

      // Add to Firestore
      await addDoc(collection(db, "notifications"), notificationData);

      message.success("Notification added successfully");
      navigate("/notification");
    } catch (error) {
      console.error("Error adding notification:", error);
      message.error("Failed to add notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6 overflow-y-auto">
      <div className="relative mt-[180px] w-[500px] rounded-lg bg-white p-8 shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate("/notification")}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* Title */}
        <h1 className="mb-8 text-xl font-semibold text-gray-900">
          Add new Notification
        </h1>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Title Input - Fixed the onChange handler */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title:</label>
            <Input
              placeholder="Enter Title"
              value={formData.title}
              onChange={
                (e) => setFormData({ ...formData, title: e.target.value }) // Fixed this line
              }
              className="h-11 rounded-md"
            />
          </div>

          {/* Upload Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Image:
            </label>
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                // We still allow upload UI but ignore the actual file
                return false;
              }}
              className="w-full"
            >
              <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
                <img src={UploadImg} alt="upload" />
                Upload Your Image
              </Button>
            </Upload>
          </div>

          {/* Description Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Description:
            </label>
            <TextArea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[120px] rounded-md !border-[#D1D5DB]"
              rows={4}
              style={{
                boxShadow: "none",
                borderColor: "#D1D5DB"
              }}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="mt-4 h-11 w-full bg-red-500 text-white text-xl font-semibold"
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
