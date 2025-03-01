import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import dayjs from "dayjs";
function SupplierPage() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    list: [],
    loading: false,
    visible: false,
    txtSearch: "",
  });
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    // ?txtSearch=VN-101 query paramter
    setState((p) => ({
      ...p,
      loading: true,
    }));
    var param = {
      txtSearch: state.txtSearch,
    };
    const res = await request("supplier", "get", param);
    if (res && !res.error) {
      setState((p) => ({
        ...p,
        list: res.list,
        loading: false,
      }));
    }
  };

  const openModal = () => {
    setState((p) => ({
      ...p,
      visible: true,
    }));
  };

  const closeModal = () => {
    setState((p) => ({
      ...p,
      visible: false,
    }));
    form.resetFields();
  };

  const onFinish = async (items) => {
    var method = "post";
    if (form.getFieldValue("id")) {
      method = "put";
    }
    setState((p) => ({
      ...p,
      loading: true,
    }));
    const res = await request("supplier", method, {
      ...items,
      id: form.getFieldValue("id"),
    });
    if (res && !res.error) {
      getList();
      closeModal();
      message.success(res.message);
    }
  };
  const onClickBtnEdit = (items) => {
    form.setFieldsValue({
      ...items,
      id: items.id,
    });
    openModal();
  };

  const onClickBtnDelete = (items) => {
    Modal.confirm({
      title: "Delete Suppler",
      content: "Are you sure to delete?",
      onOk: async () => {
        setState((p) => ({
          ...p,
          loading: true,
        }));
        const res = await request("supplier", "delete", {
          id: items.id,
        });
        if (res && !res.error) {
          const newList = state.list.filter((item) => item.id != items.id);
          setState((p) => ({
            ...p,
            list: newList,
            loading: false,
          }));
          // getList();
          message.success(res.message);
        }
      },
    });
  };

  return (
    <MainPage loading={state.loading}>
      <div className="pageHeader">
        <Space>
          <div>Supplier</div>
          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
        </Space>
        <Button type="primary" onClick={openModal}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visible}
        title={form.getFieldValue("id") ? "Edit Supplier" : "New Supplier"}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: "name required!",
              },
            ]}
          >
            <Input placeholder="code" />
          </Form.Item>
          <Form.Item
            name="code"
            label="code"
            rules={[
              {
                required: true,
                message: "code required!",
              },
            ]}
          >
            <Input placeholder="code" />
          </Form.Item>
          <Form.Item
            name="tel"
            label="tel"
            rules={[
              {
                required: true,
                message: "tel required!",
              },
            ]}
          >
            <Input placeholder="tel" />
          </Form.Item>
          <Form.Item
            name="email"
            label="email"
            rules={[
              {
                required: true,
                message: "email required!",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="address"
            rules={[
              {
                required: true,
                message: "address required!",
              },
            ]}
          >
            <Input placeholder="address" />
          </Form.Item>
          <Form.Item
            name="website"
            label="website"
            rules={[
              {
                required: true,
                message: "website required!",
              },
            ]}
          >
            <Input placeholder="website" />
          </Form.Item>
          <Form.Item name="note" label="note">
            <Input.TextArea placeholder="note" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={closeModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Table
  dataSource={state.list}
  columns={[
    {
      key: "name",
      title: (
        <div >
          <div className="khmer-text">ឈ្មោះ</div>
          <div className="english-text">Name</div>
        </div>
      ),
      dataIndex: "name",
    },
    {
      key: "code",
      title: (
        <div >
          <div className="khmer-text">កូដ</div>
          <div className="english-text">Code</div>
        </div>
      ),
      dataIndex: "code",
    },
    {
      key: "tel",
      title: (
        <div >
          <div className="khmer-text">លេខទូរស័ព្ទ</div>
          <div className="english-text">Tel</div>
        </div>
      ),
      dataIndex: "tel",
    },
    {
      key: "email",
      title: (
        <div >
          <div className="khmer-text">អ៊ីម៉ែល</div>
          <div className="english-text">Email</div>
        </div>
      ),
      dataIndex: "email",
    },
    {
      key: "address",
      title: (
        <div >
          <div className="khmer-text">អាសយដ្ឋាន</div>
          <div className="english-text">Address</div>
        </div>
      ),
      dataIndex: "address",
    },
    {
      key: "website",
      title: (
        <div >
          <div className="khmer-text">គេហទំព័រ</div>
          <div className="english-text">Website</div>
        </div>
      ),
      dataIndex: "website",
    },
    {
      key: "create_at",
      title: (
        <div >
          <div className="khmer-text">កាលបរិច្ឆេទបង្កើត</div>
          <div className="english-text">Created At</div>
        </div>
      ),
      dataIndex: "create_at",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      key: "action",
      title: (
        <div >
          <div className="khmer-text">សកម្មភាព</div>
          <div className="english-text">Action</div>
        </div>
      ),
      render: (value, data) => (
        <Space>
          <Button type="primary" onClick={() => onClickBtnEdit(data)}>
            EDIT
          </Button>
          <Button type="primary" danger onClick={() => onClickBtnDelete(data)}>
            DELETE
          </Button>
        </Space>
      ),
    },
  ]}
/>

    </MainPage>
  );
}

export default SupplierPage;
