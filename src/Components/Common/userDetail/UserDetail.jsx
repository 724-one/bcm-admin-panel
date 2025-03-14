import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { image } from "../../../assets/images";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;

  // console.log("Location state:", location.state);
  // console.log("User data:", userData);
  // console.log("ID:", id);

  if (!userData) {
    return (
      <div className="h-full w-full bg-gray-50 p-8">
        <div className="text-center">No user data found</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 p-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-[#1E1E1E]">
        <ArrowLeftOutlined
          className="text-gray-600 mr-8"
          onClick={() => navigate("/users")}
        />
        User Profile
      </h1>

      {/* White Content Card */}
      <div className="relative rounded-lg bg-white p-8 2xl:h-[676px] lg:h-[400px] md:h-[380px] shadow-sm">
        {/* User Header with Image */}
        <div className="mb-12 flex w-[44%] ml-[55px] justify-between">
          <h2 className="text-xl font-semibold text-[#1E1E1E]">
            {userData.name}
          </h2>
          {/* <img
            src={userData.image || "https://via.placeholder.com/64"}
            alt={userData.name}
            className="h-14 w-14 rounded-full object-cover"
          /> */}
          {userData.photo ? (
            <img
              src={userData.photo}
              alt={userData.photo}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <Avatar size={56} src={image?.User1}></Avatar>
          )}
          {/* <Avatar size={56} src={userData?.photo || null}>
            {userData?.photo ? null : "NO"}
          </Avatar>{" "} */}
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-2 ml-[55px] gap-x-8 gap-y-8">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Owner Name:
            </span>
            <span className="text-base text-[#1E1E1E]">{userData.name}</span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Owner Email:
            </span>
            <span className="text-base text-[#1E1E1E]">{userData.email}</span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Date Submitted:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.createdAt}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Number Of Request:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base text-[#1E1E1E]">
                {userData.totalRequests}
              </span>
              <button
                onClick={() =>
                  navigate(`/requestlist/${userData.id}`, {
                    state: { userData }, // Pass userData to RequestList
                  })
                }
                //  onClick={() => navigate(`/requestlist/${userData.id}`)}
                className="border border-[#E81E1E] bg-[#E81E1E] hover:text-[#E81E1E] px-4 py-[2px] text-sm rounded hover:bg-[white] text-[white] transition-colors duration-200"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
