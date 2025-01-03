import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import user1 from "../../assets/Images/user1.png";
const RequestProfile = () => {
  const { id } = useParams(); // Change userId to id to match the route param
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state?.requestData;

  // If no data is available, show error state
  if (!requestData) {
    return (
      <div className="h-full w-full bg-gray-50 p-8">
        <div className="text-center">No request data found</div>
      </div>
    );
  }

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
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Request Status:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {requestData.status || "N/A"}
            </span>
          </div>

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
                Length(feet) * 50{" "}
                <span className="text-xs text-[#1E1E1E]-500">in feet</span>
              </span>
            </div>

            {/* How will foundation be dug */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                How will foundation be dug? *
              </span>
              <span className="text-base text-gray-900">
                {requestData.foundationBug || "N/A"}
              </span>
            </div>

            {/* Second Strip Foundation */}
            <div className="flex flex-col gap-1 ">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Strip Foundation
              </span>
              <span className="text-base text-gray-900">
                Length(feet) * 50{" "}
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
        </div>
      </div>
    </div>
  );
};

export default RequestProfile;
