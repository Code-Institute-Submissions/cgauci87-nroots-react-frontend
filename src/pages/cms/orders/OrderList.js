import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

// import hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// import antD components
import { Card, Table, Layout, Input, Menu } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

// import components
import HeaderCms from "../../../components/global/navbar/HeaderCms";

// import utils
import EllipsisDropdown from "../../../components/cms/utils/EllipsisDropdown";
import Flex from "../../../components/cms/utils/Flex";

const { Content } = Layout;


// OrderList page
function OrderList({options}) {

  //const options = params.options
  const axiosPrivate = useAxiosPrivate();
  const [OrderListData, setOrders] = useState([]);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderField, setOrderField] = useState("&orderField=-created_at");

  const getOrderList = async () => {
    try {
      const response = await axiosPrivate.get(
        `/order/?page=${currentPage}&search=${searchTerm}&ordering=${orderField}`
      ); // API
      let data = response.data.results;
      setCount(response.data.count);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList(); // Fetch list upon update
  }, [currentPage, searchTerm, orderField]);

  // ==========================================================================

  const [list, setList] = useState(OrderListData);

  const navigate = useNavigate();
  const viewDetails = (row) => {
    navigate(`/cms/orders/view/order/${row.id}`); // navigate to order details of that specific order, once button of viewDetails is clicked
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
      sorter: true,
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      sorter: true,
    },
    {
      title: "Checkout Type",
      dataIndex: "checkout_type",
      sorter: true,
    },
    {
      title: "Total Amount",
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
      sorter: true,
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
  // onSearch

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchTerm(value);
  };

  // =========================================================================================
  // handing events
  const onPaginationChange = (e) => {
    setCurrentPage(e);
  };
  const onTableChange = (paginationConfig, filters, sorter) => {
    console.log(paginationConfig, filters, sorter);

    const order = sorter.order !== "ascend" ? "-" : "";
    const column = sorter.field;
    setOrderField(`${order}${column}`);
    return false;
  };

  return (
    <Fragment>
      <HeaderCms options={options} />
      <Layout>
        <Content>
          <Card>
            <Flex
              alignItems="center"
              justifyContent="between"
              mobileFlex={false}
            >
              <Flex className="mb-1" mobileFlex={false}>
                <div className="mr-md-3 mb-3">
                  <Input
                    placeholder="Search by Order ID"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
              </Flex>
            </Flex>
            <div className="table-responsive">
              <Table
                pagination={{
                  defaultPageSize: 12,
                  total: count,
                  onChange: onPaginationChange,
                }}
                onChange={onTableChange}
                columns={tableColumns}
                dataSource={OrderListData}
                rowKey="id"
              />
            </div>
          </Card>
        </Content>
      </Layout>
    </Fragment>
  );
}

export default OrderList;
