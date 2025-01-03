// import React from "react";
// import { Table, Select } from "antd";
// import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";
// import { IoMdArrowBack } from "react-icons/io";
// import { useNavigate, useParams } from "react-router-dom";
// import { GrNext, GrPrevious } from "react-icons/gr";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const RequestList = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);
//   console.log("Request List ID:", id);
//   const columns = [
//     {
//       title: "Number of Request",
//       dataIndex: "requestNumber",
//       key: "requestNumber",
//       className: "font-medium text-gray-900"
//     },
//     {
//       title: "Request Name",
//       dataIndex: "requestName",
//       key: "requestName",
//       className: "font-medium text-gray-900"
//     },
//     {
//       title: "Date & Time",
//       dataIndex: "dateTime",
//       key: "dateTime",
//       className: "font-medium text-gray-900"
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <span
//           className={`px-3 py-1 rounded-full ${
//             status === "Uploaded"
//               ? "bg-[#E8F5E9] text-[#1B5E1F]"
//               : "bg-[#E81E1E26] text-[#E81E1E]"
//           } text-sm font-medium`}
//         >
//           {status}
//         </span>
//       )
//     }
//     // {
//     //   title: "Actions",
//     //   key: "actions",
//     //   width: 80,
//     //   className: "text-center",
//     //   align: "center",
//     //   render: () => (
//     //     <div className="flex justify-center">
//     //       <BsThreeDots className="cursor-pointer text-gray-500 h-5 w-5" />
//     //     </div>
//     //   )
//     // }
//   ];

//   const data = [
//     {
//       key: "1",
//       requestNumber: "001",
//       requestName: "Luxury Apartment",
//       dateTime: "25 March 2023, 12:42 AM",
//       status: "Uploaded"
//     },
//     {
//       key: "2",
//       requestNumber: "002",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Pending"
//     },
//     {
//       key: "3",
//       requestNumber: "003",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Uploaded"
//     },
//     {
//       key: "4",
//       requestNumber: "004",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Pending"
//     },
//     {
//       key: "5",
//       requestNumber: "005",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Uploaded"
//     },
//     {
//       key: "6",
//       requestNumber: "006",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Pending"
//     },
//     {
//       key: "7",
//       requestNumber: "007",
//       requestName: "Luxury Apartment",
//       dateTime: "35 Station Road London",
//       status: "Uploaded"
//     }
//   ];

//   const handleBack = () => {
//     navigate(`/users/${id}`);
//     //navigate("/users");
//   };
//   return (
//     <div className="p-6 pb-[100px] bg-gray-50 min-h-screen overflow-y-auto relative">
//       <div className="mb-6 p-3 flex items-center gap-2">
//         <IoMdArrowBack
//           className="back-arrow cursor-pointer text-[#E81E1E] w-[20px] h-[20px] font-bold"
//           onClick={handleBack}
//         />
//         <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
//           Request List
//           <span className="text-xl font-semibold flex items-center gap-2 text-gray-900">
//             (12)
//           </span>
//         </h1>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm">
//         <Table
//           columns={columns}
//           dataSource={data}
//           pagination={false}
//           className="overflow-hidden border-none"
//           rowClassName="hover:bg-gray-50"
//         />
//       </div>

//       {/* Add or update your global styles */}
//       <style jsx global>{`
//         .ant-table-wrapper .ant-table-thead > tr > th {
//           background: white;
//           font-weight: 600;
//           padding: 16px;
//           font-size: 14px;
//           color: #000000 !important;
//           border: none !important; /* Remove header borders */
//         }

//         /* Remove all table borders */
//         .ant-table {
//           border: none !important;
//         }

//         .ant-table-container {
//           border: none !important;
//         }

//         /* Remove cell borders */
//         .ant-table-cell {
//           border: none !important;
//           border-bottom: none !important;
//         }

//         /* Remove row borders */
//         .ant-table-tbody > tr > td {
//           border: none !important;
//         }

//         /* Remove the right border from header cells */
//         .ant-table-thead > tr > th::before {
//           display: none !important;
//         }

//         /* Remove table body borders */
//         .ant-table-tbody {
//           border: none !important;
//         }

//         /* Remove last row border */
//         .ant-table-tbody > tr:last-child > td {
//           border-bottom: none !important;
//         }

//         /* Remove all borders, hover, and focus effects from Select components */
//         .ant-select .ant-select-selector {
//           border: none !important;
//           box-shadow: none !important;
//           background-color: transparent !important;
//         }

//         .ant-select:hover .ant-select-selector,
//         .ant-select-focused .ant-select-selector,
//         .ant-select-open .ant-select-selector {
//           border: none !important;
//           box-shadow: none !important;
//           background-color: transparent !important;
//         }

//         /* Remove hover background effect */
//         .ant-select-item-option-active,
//         .ant-select-item-option:hover {
//           background-color: transparent !important;
//         }

//         /* Remove focus background effect */
//         .ant-select-item-option-selected {
//           background-color: transparent !important;
//         }
//         /* Style for Select text */
//         .ant-select .ant-select-selection-item {
//           font-weight: 600 !important;
//           color: #000000 !important;
//         }

//         /* Style for Select arrow */
//         .ant-select .ant-select-arrow {
//           color: #000000 !important;
//           font-weight: bold !important;
//         }

//         /* Style for dropdown options */
//         .ant-select-item-option-content {
//           font-weight: 600 !important;
//           color: #000000 !important;
//         }

//         /* Keep existing styles for removing borders */
//         .ant-select .ant-select-selector {
//           border: none !important;
//           box-shadow: none !important;
//           background-color: transparent !important;
//         }
//       `}</style>

//       {/* Table Pagination footer */}
//       <div className="flex items-center justify-between px-4 py-2 mb-8 border-b bg-[#ffffff] mt-auto mb-5 border-t border-[#E0E0E0]">
//         <div className="flex items-center ">
//           <span className="text-sm text-gray-600">Items per page:</span>
//           <Select
//             defaultValue="12"
//             className="w-[60px]"
//             options={[
//               { value: "12", label: "12" },
//               { value: "24", label: "24" },
//               { value: "36", label: "36" }
//             ]}
//           />
//           <span className="text-sm text-[#8A8A8A] border-l border-gray-200 pl-4  py-2 h-8">
//             1 - 12 of 40 items
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <Select
//             defaultValue="01"
//             className="w-[60px]"
//             options={[
//               { value: "01", label: "01" },
//               { value: "02", label: "02" },
//               { value: "03", label: "03" },
//               { value: "04", label: "04" },
//               { value: "05", label: "05" }
//             ]}
//           />
//           <span className="text-sm text-[#151515]">of 05 pages</span>
//           <div className="flex ml-2">
//             <button className="p-1 border-l hover:bg-gray-50">
//               <MdKeyboardArrowLeft className="h-5 w-5 text-gray-600" />
//             </button>
//             <button className="p-1 border-l hover:bg-gray-50">
//               <MdKeyboardArrowRight className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestList;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, Select } from "antd";
import { BsThreeDotsVertical, BsThreeDots } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const RequestList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation(); // Add this
  const userData = location.state?.userData; // Get userData from navigation state
  console.log(userData);
  // Fetch requests for specific user
  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      const requestsRef = collection(db, "requests");
      const q = query(requestsRef, where("userId", "==", id));
      const querySnapshot = await getDocs(q);

      const requests = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        requestNumber: doc.data().requestNumber || "001",
        requestName: doc.data().name || "N/A",
        dateTime: doc.data().dateSubmitted || "N/A",
        status: doc.data().status || doc.data()["status "] || "Pending"
      }));

      console.log("Fetched requests:", requests);
      setData(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserRequests();
    }
  }, [id]);

  const columns = [
    {
      title: "Number of Request",
      dataIndex: "requestNumber",
      key: "requestNumber",
      className: "font-medium text-gray-900"
    },
    {
      title: "Request Name",
      dataIndex: "requestName",
      key: "requestName",
      className: "font-medium text-gray-900"
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      className: "font-medium text-gray-900"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full ${
            status === "Uploaded"
              ? "bg-[#E8F5E9] text-[#1B5E1F]"
              : "bg-[#E81E1E26] text-[#E81E1E]"
          } text-sm font-medium`}
        >
          {status}
        </span>
      )
    }
  ];

  const handleBack = () => {
    navigate(`/users/${id}`, {
      state: { userData } // Pass the userData back to UserDetail
    });
    // navigate(`/users/${id}`);
  };

  return (
    <div className="p-6 pb-[100px] bg-gray-50 min-h-screen overflow-y-auto relative">
      <div className="mb-6 p-3 flex items-center gap-2">
        <IoMdArrowBack
          className="back-arrow cursor-pointer text-[#E81E1E] w-[20px] h-[20px] font-bold"
          onClick={handleBack}
        />
        <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
          Request List
          <span className="text-xl font-semibold flex items-center gap-2 text-gray-900">
            ({data.length})
          </span>
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="overflow-hidden border-none"
          rowClassName="hover:bg-gray-50"
          loading={loading}
        />
      </div>

      {/* Table Pagination footer */}
      <div className="flex items-center justify-between px-4 py-2 mb-8 border-b bg-[#ffffff] mt-auto mb-5 border-t border-[#E0E0E0]">
        <div className="flex items-center ">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select
            defaultValue="12"
            className="w-[60px]"
            options={[
              { value: "12", label: "12" },
              { value: "24", label: "24" },
              { value: "36", label: "36" }
            ]}
          />
          <span className="text-sm text-[#8A8A8A] border-l border-gray-200 pl-4  py-2 h-8">
            1 - 12 of 40 items
          </span>
        </div>

        <style jsx global>{`
          .ant-table-wrapper .ant-table-thead > tr > th {
            background: white;
            font-weight: 600;
            padding: 16px;
            font-size: 14px;
            color: #000000 !important;
            border: none !important; /* Remove header borders */
          }

          /* Remove all table borders */
          .ant-table {
            border: none !important;
          }

          .ant-table-container {
            border: none !important;
          }

          /* Remove cell borders */
          .ant-table-cell {
            border: none !important;
            border-bottom: none !important;
          }

          /* Remove row borders */
          .ant-table-tbody > tr > td {
            border: none !important;
          }

          /* Remove the right border from header cells */
          .ant-table-thead > tr > th::before {
            display: none !important;
          }

          /* Remove table body borders */
          .ant-table-tbody {
            border: none !important;
          }

          /* Remove last row border */
          .ant-table-tbody > tr:last-child > td {
            border-bottom: none !important;
          }

          /* Remove all borders, hover, and focus effects from Select components */
          .ant-select .ant-select-selector {
            border: none !important;
            box-shadow: none !important;
            background-color: transparent !important;
          }

          .ant-select:hover .ant-select-selector,
          .ant-select-focused .ant-select-selector,
          .ant-select-open .ant-select-selector {
            border: none !important;
            box-shadow: none !important;
            background-color: transparent !important;
          }

          /* Remove hover background effect */
          .ant-select-item-option-active,
          .ant-select-item-option:hover {
            background-color: transparent !important;
          }

          /* Remove focus background effect */
          .ant-select-item-option-selected {
            background-color: transparent !important;
          }
          /* Style for Select text */
          .ant-select .ant-select-selection-item {
            font-weight: 600 !important;
            color: #000000 !important;
          }

          /* Style for Select arrow */
          .ant-select .ant-select-arrow {
            color: #000000 !important;
            font-weight: bold !important;
          }

          /* Style for dropdown options */
          .ant-select-item-option-content {
            font-weight: 600 !important;
            color: #000000 !important;
          }

          /* Keep existing styles for removing borders */
          .ant-select .ant-select-selector {
            border: none !important;
            box-shadow: none !important;
            background-color: transparent !important;
          }
        `}</style>

        <div className="flex items-center gap-2">
          <Select
            defaultValue="01"
            className="w-[60px]"
            options={[
              { value: "01", label: "01" },
              { value: "02", label: "02" },
              { value: "03", label: "03" },
              { value: "04", label: "04" },
              { value: "05", label: "05" }
            ]}
          />
          <span className="text-sm text-[#151515]">of 05 pages</span>
          <div className="flex ml-2">
            <button className="p-1 border-l hover:bg-gray-50">
              <MdKeyboardArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-1 border-l hover:bg-gray-50">
              <MdKeyboardArrowRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
