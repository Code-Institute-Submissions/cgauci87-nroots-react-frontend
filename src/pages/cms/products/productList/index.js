import React, { useState, useEffect, Fragment } from "react";
import HeaderCms from "../../../../components/";

import { axiosReq } from "../../../../../api/axiosDefaults";
import { Layout, Card, Table, Select, Input, Button, Menu } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { NumericFormat } from 'react-number-format';
import AvatarStatus from "../../../../../shared-components/AvatarStatus";
import EllipsisDropdown from "../../../../../shared-components/EllipsisDropdown";
import Flex from "../../../../../shared-components/Flex";
import { useNavigate } from "react-router-dom";
import utils from "../../../../../utils";

// const [filter, setFilter] = useState('')
/*
to set filter, add a button or a link that has the following onclick
onclick={e => setFilter('categories=Muschroom Kit')}
*/

const { Content } = Layout;

const { Option } = Select;

const categories = [];
const tags = [];

function ProductList({ options, user }) {
  const [ProductListData, setProducts] = useState([]);


  const getProductList = async () => {
    try {
      const response = await axiosReq.get("/products");
      let data = response.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getProductList = async () => {
  //   try {
  //     //const filters = 'tag=Summer'
  //     const response = await axiosReq.get(`/products?${filter}`);
  //     let data = response.data;
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  useEffect(() =>  {
    getProductList();
  }, []);


  // useEffect(() =>  {//this function will get called everytime filter changes
  //   getProductList();
  // }, [filter]);

  const navigate = useNavigate();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [deleteAll, setDeleteAll] = useState(false);
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  // useEffect(() => {
  //   if (deleteAll) {
  //     // delete all products
  //     axiosReq
  //       .delete("/products/bulk_delete/", {
  //         data: selectedRows.map((i) => i.id),
  //       })
  //       .then((response) => {
  //         console.log("response", response);
  //       });
  //   }
  // }, [deleteAll]);

  const addProduct = () => {
    navigate(`/cms/add-product`);
  };

  const viewDetails = (row) => {
    navigate(`/cms/edit-product/${row.id}`);
  };

  // To perform operations and clear selections after selecting some rows, use rowSelection.selectedRowKeys to control selected rows.
  // Doc: https://ant.design/components/table#components-table-demo-row-selection
  // example: https://codesandbox.io/s/t7muu
  // or https://codesandbox.io/s/4092nz8r94?file=/index.js

  const deleteRow = async (row) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    if (selectedRows.length > 1) {
      selectedRows.forEach((elm) => {
        const objKey = "id";
        let data = axiosReq.delete(objKey, elm);
        setList(data);
        setSelectedRows([]);
        axiosReq
          .delete(
            "/products/bulk_delete/",
            (data = selectedRows.map((i) => i.id))
          )
          .then((response) => {
            getProductList();
          });
      });
    } else {
      await axiosReq.delete(`/products/${row.id}/`);
      getProductList();
    }
  };

  // pending bug
  const tableColumns = [
    {
      title: "Date Created",
      dataIndex: "created_at",
      sorter: (a, b) => utils.antdTableSorter(a, b, "created_at"),
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
      sorter: (a, b) => utils.antdTableSorter(a, b, "title"),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => utils.antdTableSorter(a, b, "category"),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      sorter: (a, b) => utils.antdTableSorter(a, b, "tag"),
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
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
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
      setSelectedRows(rows);
      setDeleteAll(true);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : ProductListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowCategory = (value) => {
    if (value !== "All") {
      const key = "category";
      const data = utils.filterArray(ProductListData, key, value);
      setList(data);
    } else {
      setList(ProductListData);
    }
  };

  const handleShowTag = (value) => {
    if (value !== "All") {
      const key = "tag";
      const data = utils.filterArray(ProductListData, key, value);
      setList(data);
    } else {
      setList(ProductListData);
    }
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
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    defaultValue="All"
                    className="w-100"
                    onChange={handleShowCategory}
                    placeholder="Category"
                  >
                    <Option value="All">All</Option>
                    {categories.map((elm) => (
                      <Option key={elm} value={elm}>
                        {elm}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    defaultValue="All"
                    className="w-100"
                    onChange={handleShowTag}
                    placeholder="Tag"
                  >
                    <Option value="All">All</Option>
                    {tags.map((elm) => (
                      <Option key={elm} value={elm}>
                        {elm}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Flex>
              <div>
                {deleteAll && (
                  <Button
                    onClick={() => {
                      const response = window.confirm(
                        "Are you sure you want to delete selected products?"
                      );
                      console.log({ response });
                      if (response) {
                        axiosReq
                          .delete("/products/bulk_delete/", {
                            data: selectedRows.map((i) => i.id),
                          })
                          .then((response) => {
                            console.log("response", response);
                            getProductList();
                          });
                      }
                    }}
                    type="secondary"
                  >
                    Delete Selected
                  </Button>
                )}
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add product
                </Button>
              </div>
            </Flex>
            <div className="table-responsive">
              <Table
                columns={tableColumns}
                dataSource={ProductListData}
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
