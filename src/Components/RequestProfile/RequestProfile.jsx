import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import user1 from "../../assets/Images/user1.png";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/FirebaseConfig";
import "../../../src/App.css";
import { Select, Button, message, Upload, Avatar, Spin } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ViewPDF from "../modals/ViewPDF";
const RequestProfile = () => {
  const { id } = useParams(); // Change userId to id to match the route param
  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state?.requestData;
  const [status, setStatus] = useState(requestData.status || "N/A");
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [singleUserData, setSingleUserData] = useState();

  const fetchUserProfile = async () => {
    try {
      const userDocRef = doc(db, "users", requestData.userUid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSingleUserData(userData);

        console.log("Fetched user data:", singgleUserData);
      } else {
        console.warn("No user found with the given ID.");
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log("requestData", requestData);
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
      // if (onStatusChange) {
      //   onStatusChange(value);
      // }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  // const handleFileChange = ({ file }) => {
  //   if (file.type === "application/pdf") {
  //     setFile(file);
  //   } else {
  //     message.error("Please upload a valid PDF file.");
  //   }
  // };

  // const handleSubmit = async () => {
  //   setFileLoading(true);
  //   if (!file) {
  //     message.error("Please upload a file before submitting.");
  //     setFileLoading(false);
  //     return;
  //   }
  //   if (!id) {
  //     message.error("UID is missing. Cannot update the document.");
  //     setFileLoading(false);
  //     return;
  //   }

  //   try {
  //     setFileLoading(true);
  //     const fileName = `reqDocuments/${file.name}`;
  //     const storageRef = ref(storage, fileName);

  //     await uploadBytes(storageRef, file.originFileObj);
  //     const downloadURL = await getDownloadURL(storageRef);

  //     const docRef = doc(db, "requests", id);
  //     await updateDoc(docRef, {
  //       approvedReports: downloadURL,
  //       status: "Uploaded",
  //     });

  //     message.success("File uploaded and URL saved successfully.");
  //     setFile(null);
  //     setFileLoading(false);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     setFileLoading(false);
  //     message.error("Failed to upload file.");
  //   }
  // };

  ///////new code

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setSelectedFile(info.file.originFileObj);
    }
  };

  const beforeUpload = (file) => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    return isPdf;
  };

  const handleSubmit = async () => {
    setFileLoading(true);
    if (!selectedFile) {
      message.error("No file selected for upload");
      setFileLoading(false);
      return;
    }

    const uniqueId = Date.now().toString();
    const storageRef = ref(
      storage,
      `requests/${uniqueId}_${selectedFile.name}`
    );

    try {
      await uploadBytes(storageRef, selectedFile);
      const fileURL = await getDownloadURL(storageRef);
      const docRef = doc(db, "requests", id);
      await updateDoc(docRef, {
        approvedReports: fileURL,
        status: "Uploaded",
      });
      setFileLoading(false);
      message.success("File uploaded successfully");
      navigate("/request");
    } catch (error) {
      setFileLoading(false);
      message.error("File upload failed");
      console.error("Error uploading file: ", error);
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
            {requestData.userName || "N/A"}
          </h2>
          {singleUserData ? (
            singleUserData.photo ? (
              <img
                src={singleUserData.photo}
                alt="User Photo"
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <Avatar
                size={56}
                style={{
                  color: "white",
                  backgroundColor: "rgba(232, 30, 30, 1)",
                }}
              >
                N/A
              </Avatar>
            )
          ) : (
            <p>Loading...</p> // Placeholder while data is loading
          )}
        </div>

        {/* User Details Grid */}
        <Spin spinning={fileLoading}>
          <div className="grid grid-cols-2 gap-x-[10rem] gap-y-8">
            <div className="flex gap-2 items-center">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Name:
              </span>
              <span className="text-base text-[#1E1E1E]">
                {requestData.userName || "N/A"}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Request Type:
              </span>
              <span className="text-base text-[#1E1E1E]">
                {requestData.requestName || "N/A"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Property Type:
              </span>
              <span className="text-base text-[#1E1E1E] w-50%">
                {requestData.foundationDug || "N/A"}
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

              <Select
                disabled={requestData.status === "Uploaded" ? true : false}
                value={status}
                onChange={handleStatusChange}
                // value={requestData.status || "N/A"}
                // onChange={handleStatusChange}
                style={{
                  width: 120,
                  borderRadius: "20px",

                  border: "none", // Remove border
                  // backgroundColor: "rgba(232, 30, 30, 0.17)", // Set background color to light red
                  color: "#E81E1E",
                }} // Adjust width as needed
                className="custom-select"
              >
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Uploaded">Uploaded</Select.Option>
                <Select.Option value="Rejected">Rejected</Select.Option>
              </Select>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg font-semibold text-[#1E1E1E]">
                Number Of Request:
              </span>
              <span className="text-base text-[#1E1E1E] ">
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
                  {requestData.length || "N/A"}(feet) * 15{" "}
                  <span className="text-xs text-[#1E1E1E]-500">in feet</span>
                </span>
              </div>

              {/* How will foundation be dug */}
              <div className="flex flex-col gap-1 ">
                <span className="text-lg font-semibold text-[#1E1E1E]">
                  {/* How will foundation be dug? * */}
                  Will the sides of foundation be supported by forms? *
                </span>
                <span className="text-base text-gray-900">
                  {/* {requestData.foundationDug || "N/A"} */}
                  {requestData?.supportedByForms ? "YES" : "NO"}
                </span>
              </div>

              {/* Second Strip Foundation */}
              <div className="flex flex-col gap-1 ">
                <span className="text-lg font-semibold text-[#1E1E1E]">
                  How will foundation be dug? *
                </span>
                <span className="text-base text-gray-900">
                  {/* {requestData.length || "N/A"}(feet) * 15{" "} */}
                  {requestData?.foundationDug
                    ? requestData?.foundationDug
                    : "N/A"}
                  <span className="text-xs text-[#1E1E1E]-500">in feet</span>
                </span>
              </div>

              {/* Description */}
              <div className="flex justify-between ">
                <div className="w-[50%]">
                  <span className="text-lg font-semibold text-[#1E1E1E]">
                    Description
                  </span>
                  <div className="mt-8">
                    <span className="text-base text-gray-900 ">
                      {requestData.description || "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold text-[#1E1E1E]">
                      PDF / Image
                    </span>
                  </div>
                  <div className="mt-8">
                    <span>
                      <ViewPDF
                        // type="image"
                        // url="https://firebasestorage.googleapis.com/v0/b/bcm-app-f5ba8.firebasestorage.app/o/images%2F0b585db8-e38d-4bab-88b1-92504761bf89.jpg1737380934617?alt=media&token=694c90c3-a849-4963-939b-c5ef379bff04"
                        type={requestData?.mediaLink?.type}
                        url={requestData?.mediaLink?.link}
                      >
                        <Button>View</Button>
                      </ViewPDF>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Upload Documents Button */}
            {/* <div className="mt-8 flex justify-center items-center">
            <Button type="primary" className="bg-red-500">
              Upload Documents
            </Button>
          </div> */}

            {requestData?.status === "Uploaded" ? null : (
              <div className="mt-8 flex flex-col items-center">
                {/* <Upload
                accept="application/pdf"
                onChange={handleChange}
                showUploadList={true} // Hide default upload list
                beforeUpload={() => false} // Prevent automatic upload
              >
                <Button
                  type="primary"
                  className="bg-red-500  custom-upload-button"
                  style={{
                    width: "400px",
                    //   color: "white", // Set text color to white
                    //   borderColor: "transparent", // Remove border color
                    //   backgroundColor: "#ff4d4f", // Set background color (red)
                    //   boxShadow: "none"
                  }}
                >
                  Upload Documents..
                </Button>
              </Upload> */}

                {/* <Upload
                  accept="application/pdf"
                  onChange={handleFileChange}
                  // showUploadList={true}
                  showUploadList={!!file}
                  beforeUpload={() => false}
                > */}
                <Upload
                  accept="application/pdf"
                  beforeUpload={beforeUpload}
                  showUploadList={true}
                  onChange={handleChange}
                  customRequest={({ file, onSuccess }) => {
                    onSuccess("ok");
                  }}
                >
                  <Button
                    type="primary"
                    className="bg-red-500 custom-upload-button"
                    style={{
                      width: "400px",
                    }}
                  >
                    Upload Documents..
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
                {/* {file && ( */}
                {/* )} */}
              </div>
            )}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default RequestProfile;
