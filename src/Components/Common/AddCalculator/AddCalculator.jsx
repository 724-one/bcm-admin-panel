import React, { useState } from "react";
import { Input, Button, Upload, message, Modal } from "antd";
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
  const { calculator } = location.state || {};

  // const defaultImageUrl =
  //   "https://dummyimage.com/300x200/000/fff&text=Hello+World";
  const [formData, setFormData] = useState({
    title: calculator ? calculator.name : "", // Prefill title if editing
    image: calculator ? calculator.url : null
  });

  const handleSubmit = async () => {
    if (!formData.title) {
      message.error("Please enter a title");
      return;
    }

    try {
      setLoading(true);

      const calculatorData = {
        name: formData.title,
        url: formData.image, // Use uploaded image or default
        createdAt: new Date().toISOString()
      };

      if (calculator) {
        // Update existing calculator
        await updateDoc(doc(db, "calculators", calculator.id), calculatorData);
        message.success("Calculator updated successfully");
      } else {
        // Add new calculator
        await addDoc(collection(db, "calculators"), calculatorData);
        message.success("Calculator added successfully");
      }

      navigate("/calculator");
    } catch (error) {
      console.error("Error saving calculator:", error);
      message.error("Failed to save calculator");
    } finally {
      setLoading(false);
    }
  };

  // const handleDeleteImage = () => {
  //   setFormData({ ...formData, image: null }); // Reset to default image URL
  // };\
  const handleDeleteImage = () => {
    Modal.confirm({
      title: "Delete Image",
      content: "Are you sure you want to delete this image?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // Update the form data to remove the image
          setFormData({ ...formData, image: null });

          // If editing, update Firestore to remove the image URL
          if (calculator) {
            await updateDoc(doc(db, "calculators", calculator.id), {
              url: null // Set the URL to null
            });
          }

          message.success("Image deleted successfully");
        } catch (error) {
          console.error("Error deleting image:", error);
          message.error("Failed to delete image");
        }
      }
    });
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
            />
          </div>

          {/* Display Prefilled Image Filename */}
          {calculator && calculator.url ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-800">
                  {calculator.url.split("/").pop()}
                  {/* {calculator.url &&
                    calculator.url.split("https://dummyimage.com/300x200/000/")} */}
                </span>
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
            accept="image/*"
            maxCount={1} beforeUpload={handleUpload} className="w-full">
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
