import { Table, Dropdown, Menu, Switch, Select } from "antd";
import "../../../styles/table/table.scss";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
  onRowClick
}) => {
  const handleDropdownClick = (item, record, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    if (onDropdownAction) {
      onDropdownAction(item, record); // Passing item and record in this order
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
                        onClick={(e) => handleDropdownClick(item, record, e)} // Ensure event is passed here
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

  return (
    <div className="table-container w-full  h-full">
      <Table
        // tableLayout="fixed"
        columns={dynamicColumns}
        dataSource={data}
        // dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
        pagination={true}
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
            className="w-[60px] mt-1"
            options={[
              { value: "12", label: "12" },
              { value: "24", label: "24" },
              { value: "36", label: "36" }
            ]}
          />
          <span className="text-sm text-[#8A8A8A]  border-l border-gray-200 pl-4 py-2 h-8">
            1 - 12 of 40 items
          </span>
        </div>

        <div className="flex items-center ">
          <Select
            defaultValue="01"
            className="w-[60px] mt-1 flex   "
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
      <style jsx global>{`
        /* Only reduce padding for table body cells */
        .ant-table-wrapper .ant-table-tbody > tr > td {
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
