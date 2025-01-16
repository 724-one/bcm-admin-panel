import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import user1 from "../../assets/Images/user1.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import "../../../src/App.css";
import { Select, Button, message } from "antd";
const RequestProfile = () => {
  const { id } = useParams(); // Change userId to id to match the route param
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state?.requestData;
  const [status, setStatus] = useState(requestData.status || "N/A");

  // If no data is available, show error state
  if (!requestData) {
    return (
      <div className="h-full w-full bg-gray-50 p-8">
        <div className="text-center">No request data found</div>
      </div>
    );
  }
  const handleStatusChange = async (value) => {
    setStatus(value); // Update local state

    // Update status in Firestore
    try {
      const requestRef = doc(db, "requests", requestData.id);
      await updateDoc(requestRef, { status: value });
      message.success("Status updated successfully");

      // Call the callback to update the status in the Requests component
      if (onStatusChange) {
        onStatusChange(value);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 p-12 overflow-y-auto">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-[#1E1E1E]">
        Requester Profile
      </h1>

      {/* White Content Card */}
      <div className="relative rounded-lg bg-white p-[60px] shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* User Header with Image */}
        <div className="mb-12 flex w-[50%]  justify-between">
          <h2 className="text-xl font-semibold text-[#1E1E1E]">
            {requestData.name || "N/A"}
          </h2>
          <img
            src={requestData.image || user1}
            alt={requestData.name || "N/A"}
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-2 gap-x-[10rem] gap-y-8">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">Name:</span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.name || "N/A"}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Type:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.requestType || "N/A"}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Property Type:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.propertyType || "N/A"}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Date Submitted:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.dateSubmitted || "N/A"}
            </span>
          </div>
          {/* <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Status:
            </span> */}

          {/* Request Status */}
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Status:
            </span>
            <Select
              value={status}
              onChange={handleStatusChange}
              // value={requestData.status || "N/A"}
              // onChange={handleStatusChange}
              style={{
                width: 120,
                borderRadius: "20px",
                border: "none", // Remove border
                // backgroundColor: "rgba(232, 30, 30, 0.17)", // Set background color to light red
                color: "#E81E1E"
              }} // Adjust width as needed
              // dropdownStyle={{ backgroundColor: "#FEE2E2" }}
              className="custom-select"
            >
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Approved">Approved</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </div>
          {/* <span className="text-base text-[#1E1E1E]">
              {requestData.status || "N/A"}
            </span> */}
          {/* </div> */}

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Number Of Request:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.requests || "N/A"}
            </span>
          </div>
        </div>
        {/* Request Data Section */}
        <div className="mt-10 border-t border-[#E0E0E0] pt-10">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Request Data
          </h3>

          <div className="grid grid-cols-2 gap-x-5 gap-y-6 ml-20">
            {/* Strip Foundation */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Strip Foundation
              </span>
              <span className="text-base font-normal text-gray-900">
                {requestData.length || "N/A"}(feet) * 50{" "}
                <span className="text-xs text-[#1E1E1E]-500">in feet</span>
              </span>
            </div>

            {/* How will foundation be dug */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                How will foundation be dug? *
              </span>
              <span className="text-base text-gray-900">
                {requestData.foundationDug || "N/A"}
              </span>
            </div>

            {/* Second Strip Foundation */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Strip Foundation
              </span>
              <span className="text-base text-gray-900">
                {requestData.length || "N/A"}(feet) * 50{" "}
                <span className="text-xs text-[#1E1E1E]-500">in feet</span>
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Description
              </span>
              <span className="text-base text-gray-900">
                {requestData.description || "N/A"}
              </span>
            </div>
          </div>
          {/* Upload Documents Button */}
          <div className="mt-8 flex justify-center items-center">
            <Button type="primary" className="bg-red-500">
              Upload Documents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestProfile;
