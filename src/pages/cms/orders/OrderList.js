import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { axiosReq } from "../../../api/axiosDefaults";

// import antD components
import { Card, Table, Input, Button, Menu } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

// import components
import HeaderCms from "../../../../components/cms/navbar/HeaderCms";

// import utils
import utils from "../../../components/cms/utils/Table";
import EllipsisDropdown from "../../../components/cms/utils/EllipsisDropdown";
import Flex from "../../../components/cms/utils/Flex";

// OrderList page
function OrderList(options) {
  const [OrderListData, setOrders] = useState([]);
  const getOrderList = async () => {
    try {
      const response = await axiosReq.get("/order"); // API
      let data = response.data;
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList(); // Fetch list upon update
  }, []);

  // ==========================================================================

  const [list, setList] = useState(OrderListData);

  const navigate = useNavigate();
  const viewDetails = (row) => {
    navigate(`${row.id}`); // navigate to order details of that specific order, once button of viewDetails is clicked
  };

  // ==========================================================================

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  // ==========================================================================

  // ==========================================================================
  // define table columns and set sorting with utils
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


  // ==========================================================================
  // onSearch using utils.wildCardSearch
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : OrderListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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
          </Flex>
        </Flex>
        <div className="table-responsive" style={{ marginLeft: 250 }}>
          <Table
            columns={tableColumns}
            dataSource={OrderListData}
            rowKey="id"
          />
        </div>
      </Card>
    </Fragment>
  );
}

export default OrderList;
