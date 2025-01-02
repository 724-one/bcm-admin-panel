// import React, { useState } from "react";
// import { Input, Button, Upload, message } from "antd";
// import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import UploadImg from "../../../assets/images/upload.svg";
// const AddCalculator = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     image: null
//   });

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       // Add your API call here
//       message.success("Calculator added successfully");
//       navigate("/calculator");
//     } catch (error) {
//       message.error("Failed to add calculator");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6">
//       <div className="relative w-[500px] rounded-lg bg-white p-8 shadow-sm">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/calculator")}
//           className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
//         >
//           <CloseOutlined className="text-gray-600" />
//         </button>

//         {/* Title */}
//         <h1 className="mb-8 text-xl font-semibold text-gray-900">
//           Add new Calculator
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
//                 // icon={UploadImg}
//                 className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500"
//               >
//                 <span>
//                   <img src={UploadImg} />
//                 </span>
//                 Upload Your Image
//               </Button>
//             </Upload>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             loading={loading}
//             className="mt-4 h-11 w-full bg-red-500 text-white hover:bg-[#ffffff]  text-xl font-semibold"
//           >
//             Add New
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCalculator;

// working code for add calculator without image

// import React, { useState } from "react";
// import { Input, Button, Upload, message } from "antd";
// import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import UploadImg from "../../../assets/images/upload.svg";
// import { storage, db } from "../../../firebase/FirebaseConfig"; // Make sure path is correct
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";

// const AddCalculator = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     image: null
//   });

//   // const handleSubmit = async () => {
//   //   if (!formData.title || !formData.image) {
//   //     message.error("Please fill in all fields");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);

//   //     // 1. Upload image to Firebase Storage
//   //     const storageRef = ref(
//   //       storage,
//   //       `calculator-images/${formData.image.name}`
//   //     );
//   //     const uploadResult = await uploadBytes(storageRef, formData.image);
//   //     const imageUrl = await getDownloadURL(uploadResult.ref);

//   //     // 2. Store data in Firestore
//   //     const calculatorData = {
//   //       name: formData.title,
//   //       url: imageUrl,
//   //       createdAt: new Date().toISOString()
//   //     };

//   //     await addDoc(collection(db, "calculators"), calculatorData);

//   //     message.success("Calculator added successfully");
//   //     navigate("/calculator");
//   //   } catch (error) {
//   //     console.error("Error adding calculator:", error);
//   //     message.error("Failed to add calculator");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!formData.title) {
//       message.error("Please enter a title");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Create calculator data with or without image
//       const calculatorData = {
//         name: formData.title,
//         url: "https://dummyimage.com/300x200/000/fff&text=Hello+World", // Default empty string for imageUrl
//         createdAt: new Date().toISOString()
//       };

//       // Only add image if one was uploaded
//       if (formData.image) {
//         const storageRef = ref(
//           storage,
//           `calculator-images/${formData.image.name}`
//         );
//         const uploadResult = await uploadBytes(storageRef, formData.image);
//         // Here's the change: using 'url' instead of 'imageUrl'
//         const url = await getDownloadURL(uploadResult.ref);
//         calculatorData.url = url; // Store in 'url' field instead of 'imageUrl'
//       }
//       // if (formData.image) {
//       //   const storageRef = ref(
//       //     storage,
//       //     `calculator-images/${formData.image.name}`
//       //   );
//       //   const uploadResult = await uploadBytes(storageRef, formData.image);
//       //   const imageUrl = await getDownloadURL(uploadResult.ref);
//       //   calculatorData.imageUrl = imageUrl;
//       // }

//       // Add to Firestore regardless of image status
//       await addDoc(collection(db, "calculators"), calculatorData);

//       message.success("Calculator added successfully");
//       navigate("/calculator");
//     } catch (error) {
//       console.error("Error adding calculator:", error);
//       message.error("Failed to add calculator");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6">
//       <div className="relative w-[500px] rounded-lg bg-white p-8 shadow-sm">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/calculator")}
//           className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
//         >
//           <CloseOutlined className="text-gray-600" />
//         </button>

//         {/* Title */}
//         <h1 className="mb-8 text-xl font-semibold text-gray-900">
//           Add new Calculator
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
//           {/* Upload Image Section */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">
//               Upload Image (Optional):
//             </label>
//             <Upload
//               maxCount={1}
//               beforeUpload={(file) => {
//                 setFormData({ ...formData, image: file });
//                 return false;
//               }}
//               className="w-full"
//             >
//               <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
//                 <span>
//                   <img src={UploadImg} alt="upload" />
//                 </span>
//                 Upload Your Image
//               </Button>
//             </Upload>
//           </div>

//           {/* <div className="flex flex-col gap-2">
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
//               <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
//                 <span>
//                   <img src={UploadImg} alt="upload" />
//                 </span>
//                 Upload Your Image
//               </Button>
//             </Upload>
//           </div> */}
//           {/* Submit Button */}
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             loading={loading}
//             className="mt-4 h-11 w-full bg-red-500 text-white hover:bg-[#ffffff] text-xl font-semibold"
//           >
//             Add New
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCalculator;

// working code for add calculator with image
import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UploadImg from "../../../assets/images/upload.svg";
import { db } from "../../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddCalculator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null
  });

  const handleSubmit = async () => {
    if (!formData.title) {
      message.error("Please enter a title");
      return;
    }

    try {
      setLoading(true);

      // Create calculator data with dummy image URL regardless of upload
      const calculatorData = {
        name: formData.title,
        url: "https://dummyimage.com/300x200/000/fff&text=Hello+World", // Always use dummy image
        createdAt: new Date().toISOString()
      };

      // Add to Firestore
      await addDoc(collection(db, "calculators"), calculatorData);

      message.success("Calculator added successfully");
      navigate("/calculator");
    } catch (error) {
      console.error("Error adding calculator:", error);
      message.error("Failed to add calculator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50 p-6">
      <div className="relative w-[500px] rounded-lg bg-white p-8 shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate("/calculator")}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full"
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* Title */}
        <h1 className="mb-8 text-xl font-semibold text-gray-900">
          Add new Calculator
        </h1>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title:</label>
            <Input
              placeholder="Enter Name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
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
                setFormData({ ...formData, image: file });
                return false;
              }}
              className="w-full"
            >
              <Button className="flex h-11 w-full items-center justify-start border-gray-300 text-gray-500">
                <span>
                  <img src={UploadImg} alt="upload" />
                </span>
                Upload Your Image
              </Button>
            </Upload>
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="mt-4 h-11 w-full bg-red-500 text-white hover:bg-[#ffffff] text-xl font-semibold"
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCalculator;
