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

function Total_DuePage() {
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
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    var param = {
      ...filter,
      page: refPage.current,
    };
    setState((pre) => ({ ...pre, loading: true }));
    const res = await request("gettotal_due", "get", param);
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        total: refPage.current == 1 ? res.total : pre.total,
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
          <Button onClick={onFilter} type="primary">
            Filter
          </Button>
        </Space>
        <Button onClick={ExportToExcel} type="primary">Export to Excel</Button>
       
      </div>

    
      <Table
  className="custom-table"
  dataSource={state.list}
 
  columns={[
    {
      key: "customer_name",
      title: (
        <div>
          <div className="khmer-text">ឈ្មោះអ្នកជំពាក់</div>
          <div className="english-text">User Name</div>
        </div>
      ),
      dataIndex: "customer_name", // Correct the key to 'customer_name' instead of 'user_name'
      render: (text) => (
        <div className="truncate-text" title={text || ""}>
          {text || "N/A"}
        </div>
      ),
    },
    {
      key: "branch_name",
      title: (
        <div>
          <div className="khmer-text">សាខា</div>
          <div className="english-text">Branch Name</div>
        </div>
      ),
      dataIndex: "branch_name",
      render: (text) => (
        <div className="truncate-text" title={text || ""}>
          {text || "N/A"}
        </div>
      ),
    },
    {
      key: "province_name",
      title: (
        <div>
          <div className="khmer-text">ខេត្ត</div>
          <div className="english-text">Province</div>
        </div>
      ),
      dataIndex: "province_name", // Ensure the column name corresponds to your data model
    },
    {
      key: "tel",
      title: (
        <div>
          <div className="khmer-text">លេខទូរស័ព្ទ</div>
          <div className="english-text">Tel</div>
        </div>
      ),
      dataIndex: "tel",
    },
    {
      key: "order_date",
      title: (
        <div>
          <div className="khmer-text">កាលបរិច្ឆេទកម្មវិធី</div>
          <div className="english-text">Order Date</div>
        </div>
      ),
      dataIndex: "order_date",  // Make sure this field exists in your data
      render: (value) => formatDateClient(value, "DD/MM/YYYY H:m A"), // Use appropriate date formatting
    },
    {
      key: "total_due",
      title: (
        <div>
          <div className="khmer-text">តម្លៃសរុប</div>
          <div className="english-text">Total Due</div>
        </div>
      ),
      dataIndex: "total_due", // Correct field name if needed
      render: (value) => (
        <Tag color="red">
          {formatCurrency(value)} {/* Assuming formatCurrency is a function to format values */}
        </Tag>
      ),
    },
    {
      key: "create_by",
      title: (
        <div>
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

export default Total_DuePage;