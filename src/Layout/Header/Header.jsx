import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Add this import
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Modal, Input } from "antd";
import "../../styles/Header/Header.scss";
import SidebarComponent from "../Sidebar/Sidebar";
import { useSearchContext } from "../../Components/SearchContext/SearchProvider";
import bell from "../../assets/Icons/bell.svg";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Add this
  const { showSearch, searchValue, setSearchValue } = useSearchContext();

  // Clear search when navigating away
  useEffect(() => {
    setSearchValue("");
  }, [location.pathname, setSearchValue]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      document.querySelector(".custom-input").focus();
    }
  };

  return (
    <div className="main-header">
      <div className="haeder-content">
        {showSearch ? (
          <div className="search">
            <Input
              placeholder="Search here"
              onPressEnter={handleSearch}
              prefix={
                <IoSearchOutline
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={handleSearch}
                />
              }
              className="custom-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear // Add this to show clear button
            />
          </div>
        ) : (
          <div style={{ flexGrow: 1 }}></div>
        )}

        <div className="">
          {/* <div className="notify">
            <img src={bell} className="cursor-set w-[25px] h-[25px]" />
          </div> */}
          <div className="bg-[#e81e1e] text-white px-4 py-2 rounded">Admin</div>
        </div>
      </div>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="sidebar-modal"
        closable={false}
      >
        <SidebarComponent />
      </Modal>
    </div>
  );
};

export default Header;

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"; // Add this import
// import { FiMenu } from "react-icons/fi";
// import { GoBell } from "react-icons/go";
// import { IoSearchOutline } from "react-icons/io5";
// import { Modal, Input } from "antd";
// import "../../styles/Header/Header.scss";
// import SidebarComponent from "../Sidebar/Sidebar";
// import { useSearchContext } from "../../Components/SearchContext/";

// const Header = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const location = useLocation(); // Add this
//   const { showSearch, searchValue, setSearchValue } = useSearchContext();

//   // Clear search when navigating away
//   useEffect(() => {
//     setSearchValue("");
//   }, [location.pathname, setSearchValue]);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleSearch = () => {
//     if (searchValue.trim()) {
//       document.querySelector(".custom-input").focus();
//     }
//   };

//   return (
//     <div className="main-header">
//       <div className="haeder-content">
//         {showSearch ? (
//           <div className="search">
//             <Input
//               placeholder="Search by name or email"
//               onPressEnter={handleSearch}
//               prefix={
//                 <IoSearchOutline
//                   className="w-[20px] h-[20px] cursor-pointer"
//                   onClick={handleSearch}
//                 />
//               }
//               className="custom-input"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               allowClear // Add this to show clear button
//             />
//           </div>
//         ) : (
//           <div style={{ flexGrow: 1 }}></div>
//         )}
//         {/* ... rest of your header code ... */}
//       </div>
//       {/* ... Modal code ... */}
//     </div>
//   );
// };

// export default Header;
