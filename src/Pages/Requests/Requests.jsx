import { useState } from "react";
import { Input, Space, Button, Tooltip } from "antd";
import { SearchOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import CustomTable from "../../components/common/Table/CustomTable";
import "../../styles/Users/Users.scss";
import RequestImg from "../../assets/images/request.svg";
import User1 from "../../assets/images/User1.png";
import TotalInfoCard from "../../Components/Common/TotalInfoCard/TotalInfoCard";
import { useNavigate } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
const Requests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Sample data - replace with your API data
  const userData = [
    {
      key: "1",
      name: "John Doe",
      requestType: "Cost Estimation",
      propertyType: "Modern Villa",
      dateSubmitted: "2024-12-10",
      requests: "10 Requests",
      image: "https://via.placeholder.com/32",
      status: "Uploaded"
    },
    {
      key: "2",
      name: "Jane Smith",
      requestType: "Cost Estimation",
      propertyType: "Luxury Apartment",
      dateSubmitted: "2024-12-10",
      requests: "12 Requests",
      image: "https://via.placeholder.com/32",
      status: "Pending"
    },
    {
      key: "3",
      name: "Alice Brown",
      requestType: "Cost Estimation",
      propertyType: "Residential Tower",
      dateSubmitted: "2024-12-10",
      requests: "8 Requests",
      image: "https://via.placeholder.com/32",
      status: "Uploaded"
    },
    {
      key: "4",
      name: "Jane Smith",
      requestType: "Cost Estimation",
      propertyType: "Modern Villa",
      dateSubmitted: "2024-12-10",
      requests: "20 Requests",
      image: "https://via.placeholder.com/32",
      status: "Pending"
    },
    {
      key: "5",
      name: "John Doe",
      requestType: "Property Creation",
      propertyType: "Luxury Apartment",
      dateSubmitted: "2024-12-10",
      requests: "10 Requests",
      image: "https://via.placeholder.com/32",
      status: "Uploaded"
    },
    {
      key: "6",
      name: "Jane Smith",
      requestType: "Cost Estimation",
      propertyType: "Residential Tower",
      dateSubmitted: "2024-12-10",
      requests: "12 Requests",
      image: "https://via.placeholder.com/32",
      status: "Uploaded"
    },
    {
      key: "7",
      name: "Alice Brown",
      requestType: "Cost Estimation",
      propertyType: "Modern Villa",
      dateSubmitted: "2024-12-10",
      requests: "8 Requests",
      image: "https://via.placeholder.com/32",
      status: "Pending"
    }
  ];

  const columns = [
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => (
    //     <img
    //       src={User1}
    //       alt="user"
    //       style={{ width: "40px", height: "40px", borderRadius: "50px" }}
    //       // className="w-8 h-8 rounded-full object-cover"
    //     />
    //   )
    // },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: () => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
            minWidth: "60px",
            position: "relative"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              position: "relative",
              flexShrink: 0
            }}
          >
            <img
              src={User1}
              alt="user"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          </div>
        </div>
      ),
      responsive: ["sm", "md", "lg", "xl", "xxl"],
      width: {
        xxl: 100,
        xl: 90,
        lg: 80,
        md: 70,
        sm: 60,
        xs: 50
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
      key: "requestType"
    },
    {
      title: "Property Type",
      dataIndex: "propertyType",
      key: "propertyType"
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted"
    },
    {
      title: "Request Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            status === "Uploaded"
              ? "bg-[#1B5E1F1A] text-[#1B5E1F]"
              : "bg-[#E81E1E2B] text-[#E81E1E]"
          }`}
        >
          {status}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleDelete = (record) => {
    console.log("Delete:", record);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("Table changed:", { pagination, filters, sorter });
    // Handle table changes here (sorting, filtering, pagination)
  };

  const handleDropdownAction = (item, record) => {
    if (item === "View") {
      handleView(record);
    } else if (item === "Delete") {
      handleDelete(record);
    }
  };
  const handleView = (record) => {
    console.log("View:", record);
    navigate(`/request/${record.key}`);
  };

  return (
    <div className="users-container h-full w-full p-6  overflow-y-auto ">
      <div className="heading-users">Requests</div>
      <div className="flex justify-between items-center mb-6 ">
        <TotalInfoCard
          imageSrc={RequestImg}
          heading="1K"
          text="Number Of Requests"
        />
      </div>
      <div className="flex justify-between items-center ">
        <CustomTable
          columns={columns}
          data={userData}
          loading={loading}
          onChange={handleTableChange}
          dropdownItems={["View", "Delete"]}
          onDropdownAction={handleDropdownAction}
          onRowClick={(record) => handleView(record)}
        />
      </div>
    </div>
  );
};

export default Requests;
