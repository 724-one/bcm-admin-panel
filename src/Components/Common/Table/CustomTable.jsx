// import { Table, Dropdown, Menu, Switch, Select } from "antd";
// import "../../../styles/table/table.scss";
// import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const CustomTable = ({
//   columns,
//   data,
//   dropdownItems = [],
//   onDropdownAction,
//   showSwitch = false,
//   switchProps = {},
//   onDelete,
//   showDeleteIcon = false,
//   DeleteIcon,
//   onRowClick
// }) => {
//   const handleDropdownClick = (item, record, event) => {
//     if (event && event.stopPropagation) {
//       event.stopPropagation();
//     }
//     if (onDropdownAction) {
//       onDropdownAction(item, record); // Passing item and record in this order
//     }
//   };

//   const getDropdownItems = (record) => {
//     if (record.isBlocked) {
//       return dropdownItems.map((item) => (item === "Block" ? "Unblock" : item));
//     }
//     return dropdownItems;
//   };

//   const renderActionColumn = (text, record) => (
//     <div className="action-cell" onClick={(e) => e.stopPropagation()}>
//       {showSwitch ? (
//         <Switch
//           {...switchProps}
//           checked={record.switchChecked}
//           onChange={(checked) => {
//             if (switchProps.onChange) {
//               switchProps.onChange(checked, record);
//             }
//           }}
//         />
//       ) : (
//         <>
//           {showDeleteIcon ? (
//             <span
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(record);
//               }}
//               className="deleteStyle"
//             >
//               <DeleteIcon />
//             </span>
//           ) : (
//             <Dropdown
//               className="menu"
//               overlay={
//                 <Menu className="!shadow-none border border-gray-200">
//                   {getDropdownItems(record).length > 0 ? (
//                     getDropdownItems(record).map((item, index) => (
//                       <Menu.Item
//                         key={index}
//                         className="menu-item ml-12"
//                         onClick={(e) => handleDropdownClick(item, record, e)} // Ensure event is passed here
//                       >
//                         {item}
//                       </Menu.Item>
//                     ))
//                   ) : (
//                     <Menu.Item key="no-action" disabled>
//                       No actions available
//                     </Menu.Item>
//                   )}
//                 </Menu>
//               }
//               trigger={["click"]}
//             >
//               <PiDotsThreeOutlineVerticalBold className="cursor-sett" />
//             </Dropdown>
//           )}
//         </>
//       )}
//     </div>
//   );

//   const dynamicColumns = columns.map((col) => {
//     if (col.key === "action") {
//       return { ...col, render: renderActionColumn };
//     }
//     return col;
//   });

//   return (
//     <div className="table-container w-full  h-full">
//       <Table
//         // tableLayout="fixed"
//         columns={dynamicColumns}
//         dataSource={data}
//         // dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
//         pagination={true}
//         bordered
//         rowClassName={(record, index) =>
//           index % 2 === 0 ? "even-row" : "odd-row"
//         }
//         headerRowClassName="custom-header"
//         onRow={(record) => ({
//           onClick: () => onRowClick && onRowClick(record)
//         })}
//       />

//       {/* Table Pagination footer */}
//       <div className="flex items-center justify-between px-4 py-2 mb-8 border-t-2 border-b border-[#f3f4f6] bg-[#ffffff]">
//         <div className="flex items-center ">
//           <span className="text-sm text-gray-600">Items per page:</span>
//           <Select
//             defaultValue="12"
//             className="w-[60px] mt-1 custom-select"
//             options={[
//               { value: "12", label: "12" },
//               { value: "24", label: "24" },
//               { value: "36", label: "36" }
//             ]}
//           />
//           <span
//             className="text-sm text-[#8A8A8A]  border-gray-200 pl-4 py-2 h-8"
//             style={{ borderLeft: "1.4px solid #E9E9E9" }}
//           >
//             1 - 12 of 40 items
//           </span>
//         </div>

//         <div className="flex items-center ">
//           <Select
//             defaultValue="01"
//             className="w-[60px] mt-1 flex   "
//             options={[
//               { value: "01", label: "01" },
//               { value: "02", label: "02" },
//               { value: "03", label: "03" },
//               { value: "04", label: "04" },
//               { value: "05", label: "05" }
//             ]}
//           />
//           <span className="text-sm text-[#8A8A8A]">of 05 pages</span>
//           <div className="flex ml-2">
//             <button
//               className="p-1  hover:bg-gray-50"
//               style={{ borderLeft: "1.4px solid #E9E9E9" }}
//             >
//               <MdKeyboardArrowLeft className="h-5 w-5 text-gray-600" />
//             </button>
//             <button
//               className="p-1 hover:bg-gray-50"
//               style={{ borderLeft: "1.4px solid #E9E9E9" }}
//             >
//               <MdKeyboardArrowRight className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>
//       <style jsx global>{`
//         /* Only reduce padding for table body cells */
//         .ant-table-wrapper .ant-table-tbody > tr > td {
//         font-size:12px !important
//           padding: 2px 2px !important; /* Reduced vertical padding */
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
//     </div>
//   );
// };

// export default CustomTable;

import { Table, Dropdown, Menu, Switch, Select } from "antd";
import "../../../styles/table/table.scss";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

const CustomTable = ({
  columns,
  data,
  dropdownItems = [],
  onDropdownAction,
  showSwitch = false,
  switchProps = {},
  onDelete,
  showDeleteIcon = false,
  DeleteIcon,
  onRowClick,
  pagination = true // Add pagination prop
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12); // Default page size

  const handleDropdownClick = (item, record, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    if (onDropdownAction) {
      onDropdownAction(item, record);
    }
  };

  const getDropdownItems = (record) => {
    if (record.isBlocked) {
      return dropdownItems.map((item) => (item === "Block" ? "Unblock" : item));
    }
    return dropdownItems;
  };

  const renderActionColumn = (text, record) => (
    <div className="action-cell" onClick={(e) => e.stopPropagation()}>
      {showSwitch ? (
        <Switch
          {...switchProps}
          checked={record.switchChecked}
          onChange={(checked) => {
            if (switchProps.onChange) {
              switchProps.onChange(checked, record);
            }
          }}
        />
      ) : (
        <>
          {showDeleteIcon ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onDelete(record);
              }}
              className="deleteStyle"
            >
              <DeleteIcon />
            </span>
          ) : (
            <Dropdown
              className="menu"
              overlay={
                <Menu className="!shadow-none border border-gray-200">
                  {getDropdownItems(record).length > 0 ? (
                    getDropdownItems(record).map((item, index) => (
                      <Menu.Item
                        key={index}
                        className="menu-item ml-12"
                        onClick={(e) => handleDropdownClick(item, record, e)}
                      >
                        {item}
                      </Menu.Item>
                    ))
                  ) : (
                    <Menu.Item key="no-action" disabled>
                      No actions available
                    </Menu.Item>
                  )}
                </Menu>
              }
              trigger={["click"]}
            >
              <PiDotsThreeOutlineVerticalBold className="cursor-sett" />
            </Dropdown>
          )}
        </>
      )}
    </div>
  );

  const dynamicColumns = columns.map((col) => {
    if (col.key === "action") {
      return { ...col, render: renderActionColumn };
    }
    return col;
  });

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="table-container w-full h-full">
      <Table
        columns={dynamicColumns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          onChange: handleTableChange
        }}
        bordered
        rowClassName={(record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        headerRowClassName="custom-header"
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record)
        })}
      />

      {/* Table Pagination footer */}
      <div className="flex items-center justify-between px-4 py-2 mb-8 border-t-2 border-b border-[#f3f4f6] bg-[#ffffff]">
        <div className="flex items-center ">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select
            defaultValue="12"
            className="w-[60px] mt-1 custom-select"
            options={[
              { value: "12", label: "12" },
              { value: "24", label: "24" },
              { value: "36", label: "36" }
            ]}
            onChange={(value) => setPageSize(value)}
          />
          <span
            className="text-sm text-[#8A8A8A] border-gray-200 pl-4 py-2 h-8"
            style={{ borderLeft: "1.4px solid #E9E9E9" }}
          >
            {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, data.length)} of {data.length}{" "}
            items
          </span>
        </div>

        <div className="flex items-center ">
          <Select
            defaultValue="01"
            className="w-[60px] mt-1 flex"
            options={[
              { value: "01", label: "01" },
              { value: "02", label: "02" },
              { value: "03", label: "03" },
              { value: "04", label: "04" },
              { value: "05", label: "05" }
            ]}
          />
          <span className="text-sm text-[#8A8A8A]">of 05 pages</span>
          <div className="flex ml-2">
            <button
              className="p-1 hover:bg-gray-50"
              style={{ borderLeft: "1.4px solid #E9E9E9" }}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <MdKeyboardArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-gray-50"
              style={{ borderLeft: "1.4px solid #E9E9E9" }}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(data.length / pageSize))
                )
              }
            >
              <MdKeyboardArrowRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Only reduce padding for table body cells */
        .ant-table-wrapper .ant-table-tbody > tr > td {
          font-size: 12px !important;
          padding: 2px 2px !important; /* Reduced vertical padding */
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
    </div>
  );
};

export default CustomTable;
