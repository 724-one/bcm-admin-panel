import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const UserDetail = () => {
  const { userId, id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Mock data - replace with API call
        const data = {
          name: "Mr. Thomas johnson",
          email: "test@example.com",
          dateSubmitted: "14-09-2024",
          requests: "12",
          image: "https://via.placeholder.com/64"
        };
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>User not found</div>;

  return (
    <div className="h-full w-full bg-gray-50 p-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-[#1E1E1E]">User Profile</h1>

      {/* White Content Card */}
      <div className="relative rounded-lg bg-white p-8 2xl:h-[676px] lg:h-[400px]  md:h-[380px] shadow-sm">
        {/* Close Button */}
        <button
          onClick={() => navigate("/users")}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full "
        >
          <CloseOutlined className="text-gray-600" />
        </button>

        {/* User Header with Image */}
        <div className="mb-12 flex w-[44%] ml-[55px]  justify-between">
          <h2 className="text-xl font-semibold text-[#1E1E1E]">
            {userData.name}
          </h2>
          <img
            src={userData.image}
            alt={userData.name}
            className="h-14 w-14 rounded-full object-cover"
          />
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
              {userData.dateSubmitted}
            </span>
          </div>

          {/* <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Number Of Request:
            </span>
            <span className="text-base text-[#1E1E1E]">
              {userData.requests}
            </span>
          </div> */}

          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">
              Number Of Request:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base text-[#1E1E1E]">12</span>
              <button
                onClick={() => navigate(`/requestlist/${id}`)}
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
