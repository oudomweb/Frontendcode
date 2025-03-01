import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { formatDateClient, isPermission, request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
import * as XLSX from 'xlsx/xlsx.mjs';

function Stock_UserPage() {
  const { config } = configStore();
  const [form] = Form.useForm();
  const [list, setList] = useState([]);

  const [state, setState] = useState({
    list: [],
    total: 0,
    loading: false,
    visibleModal: false,
    is_list_all: false
  });

  const refPage = React.useRef(1);

  const [filter, setFilter] = useState({
    txt_search: "",
    category_id: "",
    brand: "",
    user_id: "", // Add user_id to the filter state
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    var param = {
      ...filter,
      page: refPage.current,
      user_id: filter.user_id, // Ensure user_id is included
    };
    setState((pre) => ({ ...pre, loading: true }));
    

    const res = await request(`stockUser?user_id=${user_id}`, "get");

    
  
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        total: refPage.current === 1 ? res.total : pre.total,
        loading: false,
      }));
    }
  };
  

  const onFilter = () => {
    getList();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const ExportToExcel = () => {
    if (list.length === 0) {
      message.warning("No data available to export.");
      return;
    }

    const data = list.map((item) => ({
      ...item,
      create_at: formatDateClient(item.create_at),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Product");

    setTimeout(() => {
      XLSX.writeFile(wb, "Product_Data.xlsx");
    }, 2000);
  };

  return (
    <MainPage loading={state.loading}>
      <div className="pageHeader">
        <Space>
          <div>Product {state.total}</div>
          <Input.Search
            onChange={(event) =>
              setFilter((p) => ({ ...p, txt_search: event.target.value }))
            }
            allowClear
            placeholder="Search"
          />
          <Select
            allowClear
            style={{ width: 130 }}
            placeholder="Category"
            options={config.category}
            onChange={(id) => {
              setFilter((pre) => ({ ...pre, category_id: id }));
            }}
          />
          <Select
            allowClear
            style={{ width: 160 }}
            placeholder="Brand"
            options={config.brand}
            onChange={(id) => {
              setFilter((pre) => ({ ...pre, brand: id }));
            }}
          />
          <Select
            allowClear
            style={{ width: 160 }}
            placeholder="User"
            options={config.users} // Assuming config.users contains the list of users
            onChange={(id) => {
              setFilter((pre) => ({ ...pre, user_id: id }));
            }}
          />
          <Button onClick={onFilter} type="primary">
            Filter
          </Button>
        </Space>
        <Button onClick={ExportToExcel} type="primary">Export to Excel</Button>
       
      </div>

    
      <Table
        className="custom-table"
        dataSource={state.list}
        pagination={{
          pageSize: 2,
          total: state.total,
          onChange: (page) => {
            refPage.current = page;
            getList();
          },
        }}
        columns={[
          {
            key: "name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឈ្មោះ</div>
                <div className="english-text">Name</div>
              </div>
            ),
            dataIndex: "product_name",
            render: (text) => (
              <div className="truncate-text" title={text || ""}>
                {text || "N/A"}
              </div>
            ),
          },
          {
            key: "barcode",
            title: (
              <div className="table-header">
                <div className="khmer-text">លេខបាកូដ</div>
                <div className="english-text">Barcode</div>
              </div>
            ),
            dataIndex: "barcode",
            render: (value) => <Tag color="blue">{value}</Tag>,
          },
          {
            key: "description",
            title: (
              <div className="table-header">
                <div className="khmer-text">សេចក្ដីពិពណ៌នា</div>
                <div className="english-text">Description</div>
              </div>
            ),
            dataIndex: "description",
            render: (text) => (
              <div className="truncate-text" title={text || ""}>
                {text || "N/A"}
              </div>
            ),
          },
          {
            key: "category_name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ប្រភេទ</div>
                <div className="english-text">Category</div>
              </div>
            ),
            dataIndex: "category_name",
          },
          {
            key: "brand",
            title: (
              <div className="table-header">
                <div className="khmer-text">ម៉ាក</div>
                <div className="english-text">Brand</div>
              </div>
            ),
            dataIndex: "brand",
          },
          
          {
            key: "qty",
            title: (
              <div className="table-header">
                <div className="khmer-text">បរិមាណ</div>
                <div className="english-text">Quantity</div>
              </div>
            ),
            dataIndex: "qty",
            render: (value) => (
              <Tag color={value > 5000 ? "green" : "red"}>{value}</Tag>
            ),
          },
          {
            key: "unit",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឯកតា</div>
                <div className="english-text">Unit</div>
              </div>
            ),
            dataIndex: "unit",
            render: (value) => <Tag color="green">{value}</Tag>,
          },
          {
            key: "unit_price",
            title: (
              <div className="table-header">
                <div className="khmer-text">តម្លៃរាយ</div>
                <div className="english-text">Unit Price</div>
              </div>
            ),
            dataIndex: "unit_price",
            render: (value) => (
              <Tag color={value > 20 ? "green" : "volcano"}>
                {formatCurrency(value)}
              </Tag>
            ),
          },
          {
            key: "price",
            title: (
              <div className="table-header">
                <div className="khmer-text">តម្លៃសរុប</div>
                <div className="english-text">Total Price</div>
              </div>
            ),
            dataIndex: "total_price",
            render: (text) => formatCurrency(text),
          },
          {
            key: "discount",
            title: (
              <div className="table-header">
                <div className="khmer-text">បញ្ចុះតម្លៃ</div>
                <div className="english-text">Discount</div>
              </div>
            ),
            dataIndex: "discount",
          },
          {
            key: "status",
            title: (
              <div className="table-header">
                <div className="khmer-text">ស្ថានភាព</div>
                <div className="english-text">Status</div>
              </div>
            ),
            dataIndex: "status",
            render: (status) =>
              status == 1 ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
          {
            key: "create_at",
            title: (
              <div className="table-header">
                <div className="khmer-text">កាលបរិច្ឆេទបង្កើត</div>
                <div className="english-text">Created At</div>
              </div>
            ),
            dataIndex: "last_updated",
            render: (value) => formatDateClient(value, "DD/MM/YYYY H:m A"),
          },
          {
            key: "create_by",
            title: (
              <div className="table-header">
                <div className="khmer-text">បង្កើតដោយ</div>
                <div className="english-text">Created By</div>
              </div>
            ),
            dataIndex: "create_by",
          },
          {
            key: "Action",
            title: (
              <div className="table-header">
                <div className="khmer-text">សកម្មភាព</div>
                <div className="english-text">Action</div>
              </div>
            ),
            align: "center",
            render: (item, data, index) => (
              <Space>
                <Button
                  type="primary"
                  icon={<MdEdit />}
                  onClick={() => onClickEdit(data, index)}
                />
                <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => onClickDelete(data, index)}
                />
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}

export default Stock_UserPage;