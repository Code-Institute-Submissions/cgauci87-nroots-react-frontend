/* eslint-disable no-unused-vars */
import React, { useState, Fragment, useEffect } from "react";
import { Card, Table, Select, Input, Button, Menu } from "antd";
import HeaderCms from "../../../../../components/header/HeaderCms";

import utils from "../../../../../utils";
import { useNavigate } from "react-router-dom";

import {
  EyeOutlined,
  FileExcelOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { NumericFormat } from "react-number-format";

import EllipsisDropdown from "../../../../../shared-components/EllipsisDropdown";
import Flex from "../../../../../shared-components/Flex";

import { axiosReq } from "../../../../../api/axiosDefaults";

const { Option } = Select;

const paymentStatusList = ["Paid", "Pending", "Expired"];

function OrderList(options) {
  const [OrderListData, setOrders] = useState([]);
  console.log("OrderListData", OrderListData);

  const getOrderList = async () => {
    try {
      const response = await axiosReq.get("/order");
      let data = response.data;
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const [list, setList] = useState(OrderListData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "paymentStatus";
      const data = utils.filterArray(list, key, value);
      setList(data);
    } else {
      setList([]);
    }
  };

  const navigate = useNavigate();
  const viewDetails = (row) => {
    navigate(`${row.id}`);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item>
        <Flex alignItems="center">
          <PlusCircleOutlined />
          <span className="ml-2">Add to remark</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: "Date Ordered",
      dataIndex: "created_at",
      sorter: (a, b) => utils.antdTableSorter(a, b, "created_at"),
    },
    {
      title: "Customer",
      dataIndex: "full_name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "full_name"),
    },
    {
      title: "Locality",
      dataIndex: "city",
      sorter: (a, b) => utils.antdTableSorter(a, b, "city"),
    },
    {
      title: "Checkout",
      dataIndex: "checkout_type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "checkout_type"),
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total) => (
        <div>
          <NumericFormat
            displayType={"text"}
            value={(Math.round(total * 100) / 100).toFixed(2)}
            prefix={"€"}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "total"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : OrderListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  return (
    <Fragment>
      <HeaderCms options={options} />
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3" style={{ marginLeft: 250 }}>
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
              />
            </div>
            <div className="mb-3">
              <Select
                defaultValue="All"
                className="w-100"
                style={{ minWidth: 180 }}
                // onChange={handleShowStatus}
                placeholder="Status"
              >
                <Option value="All">All payment </Option>
                {paymentStatusList.map((elm) => (
                  <Option key={elm} value={elm}>
                    {elm}
                  </Option>
                ))}
              </Select>
            </div>
          </Flex>
          <div>
            <Button type="primary" icon={<FileExcelOutlined />} block>
              Export All
            </Button>
          </div>
        </Flex>
        <div className="table-responsive" style={{ marginLeft: 250 }}>
          <Table
            columns={tableColumns}
            dataSource={OrderListData}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
          />
        </div>
      </Card>
    </Fragment>
  );
}

export default OrderList;
