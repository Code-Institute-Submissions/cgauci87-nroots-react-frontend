import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// import hooks
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

// import antD components
import { NumericFormat } from "react-number-format";
import { Layout, Card, Table, Select, Input, Button, Menu } from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";

// import components
import HeaderCms from "../../../../components/global/navbar/HeaderCms";

// import utils
import AvatarStatus from "../../../../components/cms/utils/AvatarStatus";
import EllipsisDropdown from "../../../../components/cms/utils/EllipsisDropdown";
import Flex from "../../../../components/cms/utils/Flex";

const { Content } = Layout;

// ProductList Page
function ProductList({ options }) {
  const axiosPrivate = useAxiosPrivate();
  // ====================================================================
  // get product list data from API
  const [ProductListData, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderField, setOrderField] = useState("&orderField=-created_at");

  const getProductList = async () => {
    try {
      const response = await axiosPrivate.get(
        `/products/?page=${currentPage}&search=${searchTerm}&ordering=${orderField}`
      );
      let data = response.data.results;
      setCount(response.data.count);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductList(); // Fetch product list whenever the list updates (asynchronous)
  }, [currentPage, searchTerm, orderField]);

  // ====================================================================

  const navigate = useNavigate();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [deleteAll, setDeleteAll] = useState(false);
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        {" "}
        {/* view/edit details of a specific product */}
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details / Edit</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        {" "}
        {/* delete a single row */}
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})` // Multiple deletion of products if there will be multiple selection of rows
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const viewDetails = (row) => {
    navigate(`/cms/products/view-edit/product/${row.id}`);
    //  when admin/is_staff user clicks 'View Details / Edit' on a specific product;
    //  it will navigate to the edit product form (which would include the id of that product in the end path)
  };

  const deleteRow = async (row) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        const objKey = "id";
        let data = axiosPrivate.delete(objKey, elm);
        setList(data);
        setSelectedRows([]);
        axiosPrivate
          .delete(
            "/products/bulk_delete/", // bulk delete API
            (data = selectedRows.map((i) => i.id))
          )
          .then((response) => {
            getProductList();
          });
      });
    } else {
      await axiosPrivate.delete(`/products/${row.id}/`); // delete a single product
      getProductList(); // this function is being called to fetch the latest data upon deletion
    }
  };

  /*==========================================================================*/
  // define table columns and set sorting from the backend
  const tableColumns = [
    {
      title: "Date Created",
      dataIndex: "created_at",
      sorter: true,
    },
    {
      title: "Product",
      dataIndex: "title",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.uploadedImg}
            name={record.title}
          />
        </div>
      ),
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <div>
          <NumericFormat
            displayType={"text"}
            value={(Math.round(price * 100) / 100).toFixed(2)}
            prefix={"€"}
            thousandSeparator={true}
          />
        </div>
      ),
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];
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

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setDeleteAll(true);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    setSelectedRowKeys([]);
    setSearchTerm(value);
  };

  // =========================================================================================
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
                    placeholder="Search by Product / Category / Tag"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
              </Flex>
              <div>
                {deleteAll && (
                  <Button
                    onClick={() => {
                      const response = window.confirm(
                        // confirm prior deletion
                        "Are you sure you want to delete selected products?"
                      );
                      console.log({ response });
                      if (response) {
                        axiosPrivate
                          .delete("/products/bulk_delete/", {
                            // bulk_delete API for bulk deletion
                            data: selectedRows.map((i) => i.id),
                          })
                          .then(() => {
                            getProductList(); // Fetch data upon deletion to get the latest
                          });
                      }
                    }}
                    type="secondary"
                  >
                    Delete Selected
                  </Button>
                )}
              </div>
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
                dataSource={ProductListData} //payload
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
        </Content>
      </Layout>
    </Fragment>
  );
}

export default ProductList;
