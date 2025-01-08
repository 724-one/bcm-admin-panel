// working code for add calculator with image
import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import UploadImg from "../../../assets/images/upload.svg";
import { db } from "../../../firebase/FirebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import "../../../styles/AddNotification/AddNotification.scss";
const AddCalculator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location); // Log the entire location object

  const { calculator } = location.state || {};
  console.log(calculator);
  // const [formData, setFormData] = useState({
  //   title: "",
  //   image: null
  // });
  const defaultImageUrl =
    "https://dummyimage.com/300x200/000/fff&text=Hello+World";
  const [formData, setFormData] = useState({
    title: calculator ? calculator.name : "", // Prefill title if editing
    image: calculator ? calculator.url : null
  });

  // const handleSubmit = async () => {
  //   if (!formData.title) {
  //     message.error("Please enter a title");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // Create calculator data with dummy image URL regardless of upload
  //     const calculatorData = {
  //       name: formData.title,
  //       url: "https://dummyimage.com/300x200/000/fff&text=Hello+World", // Always use dummy image
  //       createdAt: new Date().toISOString()
  //     };

  //     // Add to Firestore
  //     await addDoc(collection(db, "calculators"), calculatorData);

  //     message.success("Calculator added successfully");
  //     navigate("/calculator");
  //   } catch (error) {
  //     console.error("Error adding calculator:", error);
  //     message.error("Failed to add calculator");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!formData.title) {
      message.error("Please enter a title");
      return;
    }

    try {
      setLoading(true);

      const calculatorData = {
        name: formData.title,
        url: calculator
          ? calculator.url
          : "https://dummyimage.com/300x200/000/fff&text=Hello+World",
        createdAt: new Date().toISOString()
      };

      if (formData.image) {
        // Handle image upload logic here if needed
      }

      if (calculator) {
        // Update existing calculator
        await updateDoc(doc(db, "calculators", calculator.id), calculatorData);
      } else {
        // Add new calculator
        await addDoc(collection(db, "calculators"), calculatorData);
      }

      message.success(
        calculator
          ? "Calculator updated successfully"
          : "Calculator added successfully"
      );
      navigate("/calculator");
    } catch (error) {
      console.error("Error saving calculator:", error);
      message.error("Failed to save calculator");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: defaultImageUrl }); // Reset to default image URL
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result }); // Update image with the uploaded file
    };
    reader.readAsDataURL(file); // Read the file as a data URL
    return false; // Prevent default upload behavior
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
            <label className="text-sm font-bold text-gray-700">Title:</label>
            <Input
              className="h-11 rounded-md custom-input-des"
              placeholder="Enter Name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              //className="h-11 rounded-md addCalc-input " // Add the custom-input class
            />
          </div>

          {/* Display Prefilled Image */}
          {/* {formData.image && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Current Image:
              </label>
              <img
                src={formData.image}
                alt="Current"
                className="h-32 w-full object-cover mb-2"
              />
            </div>
          )} */}

          {/* Display Prefilled Image Filename */}
          {calculator && calculator.url ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-800">
                  {calculator.url &&
                    calculator.url.split("https://dummyimage.com/300x200/000/")}
                </span>{" "}
                <DeleteOutlined
                  className="text-red-500 cursor-pointer"
                  onClick={handleDeleteImage}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Upload Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              Upload Image:
            </label>
            <Upload
              maxCount={1}
              beforeUpload={handleUpload}
              // beforeUpload={(file) => {
              //   setFormData({ ...formData, image: file });
              //   return false;
              // }}
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
            className="mt-4 h-11 w-full bg-red-500 text-white hover:bg-[#ffffff] text-[18px] font-semibold"
          >
            {calculator ? "Save Changes" : "Add New"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCalculator;
