import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { resetWarned } from "antd/es/_util/warning";
import { configStore } from "../../store/configStore";
function UserPage() {
  const [form] = Form.useForm();
  const { config } = configStore();
  const [filter, setFilter] = useState({
    txt_search: "",
    category_id: "",
    brand: "",
  });
  const [state, setState] = useState({
    list: [],
    role: [],
    // branch_name: [],
    loading: false,
    visible: false,
  });
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("auth/get-list", "get");
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        role: res.role,
        branch_name: res.branch_name,
      }));
    }
  };

  const onClickEdit = (data) => {
    setState((pre) => ({
      ...pre,
      // handleOpenModal
      visible: true
    }))
    form.setFieldsValue({
      ...data
    });
    //
    // form.getFieldValue("id")
  };
  const clickBtnDelete = (item) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to remove this user?",
      onOk: async () => {
        const res = await request("user", "delete", { id: item.id });

        if (res && !res.error) {
          message.success(res.message);
          const newList = state.list.filter((item1) => item1.id !== item.id);
          setState((prev) => ({
            ...prev,
            list: newList,
          }));
        } else {
          // If the user is already in use
          message.error(res.message || "This user cannot be deleted because they are linked to other records.");
        }
      },
    });
  };


  const handleCloseModal = () => {
    setState((pre) => ({
      ...pre,
      visible: false,
    }));
    form.resetFields();
  };

  const handleOpenModal = () => {
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  // {"name":"a","username":"b","password":"12","role_id":2,"is_active":0}
  const onFinish = async (item) => {
    if (item.password !== item.confirm_password) {
      message.warning("Password and Confirm Password Not Match!");
      return;
    }

    const data = {
      id: form.getFieldValue("id"), // Ensure this is correct
      ...item,
    };

    let method = "post";
    if (form.getFieldValue("id")) {
      method = "put";
    }

    const res = await request("auth/register", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList(); // Refresh the list after update
      handleCloseModal();
    } else {
      message.warning(res.message);
    }
  };


  //  const clickBtnDelete =()=>{}
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>User</div>
          <Space>
            <Input.Search style={{ marginLeft: 10 }} placeholder="Search" />


            {/* <div>
              <Space>
                <Select
                  allowClear
                  style={{ width: 130 }}
                  placeholder="Select Province"
                  options={config.category}
                  onChange={(id) => {
                    setFilter((pre) => ({ ...pre, category_id: id }));
                  }}
                />
                <Select
                  allowClear
                  style={{ width: 130 }}
                  placeholder="Select Tel"
                  options={config.brand}
                  onChange={(id) => {
                    setFilter((pre) => ({ ...pre, brand: id }));
                  }}
                />
              </Space>
            </div> */}
          </Space>
        </div>
        <Button type="primary" onClick={handleOpenModal}>
          New
        </Button>
      </div>
      <Modal

        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
        title={form.getFieldValue("id") ? "Update Customer" : "New Customer"}

      >
        <Form layout="vertical" form={form} onFinish={onFinish}>

          <Row gutter={[16, 16]}> {/* Added vertical spacing between rows */}
            <Col span={12}>
              <Form.Item
                name={"name"}
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please fill in name",
                  },
                ]}
              >
                <Input placeholder="Name" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"address"}
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please fill in Address",
                  },
                ]}
              >
                <Input placeholder="Address" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"tel"}
                label="Tel"
                rules={[
                  {
                    required: true,
                    message: "Please fill in Tel",
                  },
                ]}
              >
                <Input placeholder="Tel" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"username"}
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please fill in email",
                  },
                ]}
              >
                <Input placeholder="Email" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"is_active"}
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please select status",
                  },
                ]}
              >
                <Select
                  placeholder="Select Status"
                  options={[
                    {
                      label: "Active",
                      value: 1,
                    },
                    {
                      label: "InActive",
                      value: 0,
                    },
                  ]}
                  style={{ borderRadius: "6px" }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={"password"}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please fill in password",
                  },
                ]}
              >
                <Input.Password placeholder="Password" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"confirm_password"}
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please fill in confirm password",
                  },
                ]}
              >
                <Input.Password placeholder="Confirm Password" style={{ borderRadius: "6px" }} />
              </Form.Item>
              <Form.Item
                name={"role_id"}
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please select role",
                  },
                ]}
              >
                <Select
                  placeholder="Select Role"
                  options={state?.role}
                  style={{ borderRadius: "6px" }}
                />
              </Form.Item>
              <Form.Item
                name={"branch_name"}
                label="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please select Branch",
                  },
                ]}
              >
                <Select
                  placeholder="Select Branch"
                  options={config?.branch_name}
                  style={{ borderRadius: "6px" }}
                />
              </Form.Item>

            </Col>
          </Row>


          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
      {/* <div>{form.getFieldValue("id") +""}</div> */}
      <Table
        dataSource={state.list}
        columns={[
          {
            key: "no",
            title: (
              <div>
                <div className="khmer-text">លេខកូដ</div>
                <div className="english-text">Code</div>
              </div>
            ),
            dataIndex: "id", // Keep the actual id as dataIndex
            render: (text) => (
              <Tag color="blue">
                {"U" + text} {/* Prefix U before the id */}
              </Tag>
            ),
          },


          {
            key: "name",
            title: (
              <div>
                <div className="khmer-text">ឈ្មោះ</div>
                <div className="english-text">Name</div>
              </div>
            ),
            dataIndex: "name",
          },
          {
            key: "name",
            title: (
              <div>
                <div className="khmer-text">ឈ្មោះ</div>
                <div className="english-text">Role Name</div>
              </div>
            ),
            dataIndex: "role_name",
          },
          
          {
            key: "username",
            title: (
              <div>
                <div className="khmer-text">ឈ្មោះអ្នកប្រើប្រាស់</div>
                <div className="english-text">Username</div>
              </div>
            ),
            dataIndex: "username",
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
            key: "branch",
            title: (
              <div>
                <div className="khmer-text">សាខា</div>
                <div className="english-text">Branch</div>
              </div>
            ),
            dataIndex: "branch_name",
          },
          {
            key: "address",
            title: (
              <div>
                <div className="khmer-text">អាសយដ្ឋាន</div>
                <div className="english-text">Address</div>
              </div>
            ),
            dataIndex: "address",
          },
          {
            key: "is_active",
            title: (
              <div>
                <div className="khmer-text">ស្ថានភាព</div>
                <div className="english-text">Status</div>
              </div>
            ),
            dataIndex: "is_active",
            render: (value) =>
              value ? (
                <Tag color="green">សកម្ម | Active</Tag>
              ) : (
                <Tag color="red">អសកម្ម | Inactive</Tag>
              ),
          },
          {
            key: "create_by",
            title: (
              <div>
                <div className="khmer-text">បង្កើតដោយ</div>
                <div className="english-text">Create By</div>
              </div>
            ),
            dataIndex: "create_by",
          },
          {
            key: "create_at",
            title: (
              <div>
                <div className="khmer-text">កាលបរិច្ឆេទបង្កើត</div>
                <div className="english-text">Created At</div>
              </div>
            ),
            dataIndex: "create_at",
          },
          {
            key: "action",
            title: (
              <div>
                <div className="khmer-text">សកម្មភាព</div>
                <div className="english-text">Action</div>
              </div>
            ),
            align: "center",
            render: (value, data) => (
              <Space>
                <Button onClick={() => onClickEdit(data)} type="primary" className="dual-text">
                  <span className="khmer-text">កែប្រែ</span> | <span className="english-text">Edit</span>
                </Button>
                <Button onClick={() => clickBtnDelete(data)} danger type="primary" className="dual-text">
                  <span className="khmer-text">លុប</span> | <span className="english-text">Delete</span>
                </Button>
              </Space>
            ),
          }

        ]}
      />

    </div>
  );
}

export default UserPage;
