import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  DatePicker,
  Tag
} from "antd";
import { formatDateClient, request } from "../../util/helper";
import * as XLSX from 'xlsx/xlsx.mjs';
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import dayjs from 'dayjs';
function EmployeePage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    txtSearch: "",
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const param = {
      txtSearch: state.txtSearch,
    };
    const res = await request("employee", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };
  const onClickEdit = (data) => {
    setState({
      ...state,
      visibleModal: true,
      id: data.id,
    });
    formRef.setFieldsValue({
      id: data.id,
      name: data.name,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob) : null,
      position: data.position,
      salary: data.salary,
      tel: data.tel,
      email: data.email,
      address: data.address,
      status: data.status,
    });
  };
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to remove this employee?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        const res = await request("employee", "delete", {
          id: data.id,
        });
        if (res && !res.error) {
          message.success(res.message);
          const newList = list.filter((item) => item.id !== data.id);
          setList(newList);
        }
      },
    });
  };
  const onClickAddBtn = () => {
    setState({
      ...state,
      visibleModal: true,
      id: null,
    });
    formRef.resetFields();
  };

  const onCloseModal = () => {
    formRef.resetFields();
    setState({
      ...state,
      visibleModal: false,
      id: null,
    });
  };
  const onFinish = async (values) => {
    const data = {
      id: state.id,
      name: values.name,
      gender: values.gender,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      position: values.position,
      salary: values.salary,
      tel: values.tel,
      email: values.email,
      address: values.address,
      status: values.status,
    };

    const method = state.id ? "put" : "post";
    const res = await request("employee", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  const ExportToExcel = () => {
    const data = list.map((item) => ({
      ...item,
      gender: item.gender === 1 ? "Male" : "Female",
      dob: formatDateClient(item.dob),
      create_at: formatDateClient(item.create_at),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employee");
    XLSX.writeFile(wb, "Employee_Data.xlsx");
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Employee Management</div>
          <Input.Search
            onChange={(e) =>
              setState((prev) => ({ ...prev, txtSearch: e.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search by name"
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
          <Button type="primary" onClick={ExportToExcel}>
            Export
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={state.id ? "Edit Employee" : "New Employee"}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form layout="vertical" onFinish={onFinish} form={formRef}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the employee name" }]}
          >
            <Input placeholder="Input employee name" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              placeholder="Select gender"
              options={[
                { label: "Male", value: 1 },
                { label: "Female", value: 0 },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please input the position" }]}
          >
            <Input placeholder="Input position" />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Please input the salary" }]}
          >
            <Input type="number" placeholder="Input salary" />
          </Form.Item>
          <Form.Item
            name="tel"
            label="Telephone"
            rules={[{ required: true, message: "Please input the telephone number" }]}
          >
            <Input placeholder="Input telephone number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Please input a valid email" }]}
          >
            <Input placeholder="Input email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
          >
            <Input.TextArea placeholder="Input address" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              placeholder="Select status"
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
            />
          </Form.Item>
          <Space>
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {state.id ? "Update" : "Save"}
            </Button>
          </Space>
        </Form>
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (_, __, index) => index + 1,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            key: "gender",
            title: "Gender",
            dataIndex: "gender",
            render: (value) => (value === 1 ? "Male" : "Female"),
          },
          {
            key: "dob",
            title: "Date of Birth",
            dataIndex: "dob",
            render: (value) => formatDateClient(value),
          },
          {
            key: "position",
            title: "Position",
            dataIndex: "position",
          },
          {
            key: "salary",
            title: "Salary",
            dataIndex: "salary",
            render: (value) => `$${value}`,
          },
          {
            key: "tel",
            title: "Telephone",
            dataIndex: "tel",
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "address",
            title: "Address",
            dataIndex: "address",
          },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (value) => (
              <Tag color={value === 1 ? "green" : "red"}>
                {value === 1 ? "Active" : "Inactive"}
              </Tag>
            ),
          },
          {
            key: "action",
            title: "Action",
            align: "center",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<MdEdit />}
                  onClick={() => onClickEdit(record)}
                />
                <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => onClickDelete(record)}
                />
              </Space>
            ),
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </MainPage>
  );
}

export default EmployeePage;