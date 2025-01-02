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
      event.stopPropagation(); // Prevent row click when action button is clicked
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
        dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
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
        <div className="flex items-center gap-2">
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
          <span className="text-sm text-[#8A8A8A] ml-4">
            1 - 12 of 40 items
          </span>
        </div>

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

export default CustomTable;
