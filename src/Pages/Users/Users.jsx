// ==================get data from firebase ==================================
import { useState, useEffect } from "react";
import { Space, Button, Tooltip, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import CustomTable from "../../Components/Common/Table/CustomTable";
import "../../styles/Users/Users.scss";
import userImg from "../../assets/images/users.svg";
// import User1 from "../../assets/images/User1.png";
import TotalInfoCard from "../../Components/Common/TotalInfoCard/TotalInfoCard";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../Components/SearchContext/SearchProvider";
import { useMemo } from "react";
import { image } from "../../assets/images";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const { searchValue } = useSearchContext(); // Add this

  // Add filtered users logic using useMemo
  const filteredUsers = useMemo(() => {
    if (!searchValue.trim()) {
      return userData;
    }

    const searchTerm = searchValue.toLowerCase();
    return userData.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm)
    );
  }, [userData, searchValue]);
  const navigate = useNavigate();

  console.log("filteredUsers", filteredUsers);
  // Define columns configuration
  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      align: "center",
      render: (photo) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
            minWidth: "60px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <img
              src={photo || image?.User1}
              alt="Profile"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
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
        xs: 50,
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "No. of Requests",
      dataIndex: "requests",
      key: "requests",
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
      ),
    },
  ];

  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const usersCollection = collection(db, "users");
  //     const userSnapshot = await getDocs(usersCollection);

  //     const users = userSnapshot.docs.map((doc) => ({
  //       key: doc.id, // Keep the original Firebase document ID
  //       id: doc.id, // Also store it as id for reference
  //       ...doc.data(),
  //       createdAt:
  //         doc.data().createdAt?.toDate().toISOString().split("T")[0] || "",
  //       requests: `${doc.data().totalRequests || 0} Requests`,
  //     }));

  //     setUserData(users);
  //     setTotalUsers(users.length);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     message.error("Failed to fetch users");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);

      // Fetch users and their requests count
      const users = await Promise.all(
        userSnapshot.docs.map(async (doc) => {
          const userData = doc.data();
          const userId = doc.id;

          // Fetch the count of requests for the current user
          const requestsQuery = query(
            collection(db, "requests"),
            where("userUid", "==", userId)
          );
          const requestsSnapshot = await getDocs(requestsQuery);
          const requestsCount = requestsSnapshot.size;

          return {
            key: userId, // Firebase document ID
            id: userId,
            ...userData,
            createdAt:
              userData.createdAt?.toDate().toISOString().split("T")[0] || "",
            requests: `${requestsCount} Requests`,
          };
        })
      );

      setUserData(users);
      setTotalUsers(users.length);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (record) => {
    console.log("Viewing record:", record);
    // Clean up the record data before passing
    const userData = {
      id: record.id,
      name: record.name,
      email: record.email,
      createdAt: record.createdAt,
      totalRequests: record.totalRequests,
      requests: record.requests,
      photo: record?.photo || "",
    };

    navigate(`/users/${record.id}`, {
      state: { userData },
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("Table changed:", { pagination, filters, sorter });
  };

  // const handleDropdownAction = async (item, record) => {
  //   if (item === "View") {
  //     handleView(record);
  //   } else if (item === "Delete") {
  //     //handleDelete(record);
  //     try {
  //       setLoading(true);
  //       await deleteDoc(doc(db, "users", record.key));
  //       message.success("User deleted successfully");
  //       fetchUsers(); // Refresh the list
  //     } catch (error) {
  //       console.error("Error deleting user:", error);
  //       message.error("Failed to delete user");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      // Use record.id or record.key (they should be the same - the Firebase document ID)
      await deleteDoc(doc(db, "users", record.id || record.key));
      message.success("User deleted successfully");
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownAction = async (item, record) => {
    if (item === "View") {
      handleView(record);
      console.log("record", record);
    } else if (item === "Delete") {
      await handleDelete(record);
    }
  };

  return (
    <div className="users-container h-full w-full p-6 overflow-y-auto ">
      <div className="heading-users">Users</div>
      <div className="flex justify-between items-center mb-6 ">
        <TotalInfoCard
          imageSrc={userImg}
          heading={filteredUsers.length || 0}
          text="Number Of Users"
        />
      </div>
      <div className="flex justify-between items-center ">
        <CustomTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
          pagination={true}
          onChange={handleTableChange}
          dropdownItems={["View", "Delete"]}
          onDropdownAction={handleDropdownAction}
          onRowClick={(record) => handleView(record)}
        />
      </div>
    </div>
  );
};

export default Users;
