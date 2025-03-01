import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { isPermission, request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function StockInPage() {
  const { config } = configStore();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    list: [],
    total: 0,
    loading: false,
    visibleModal: false,
  });

  const refPage = React.useRef(1);

  const [filter, setFilter] = useState({
    txt_search: "",
    category_id: "",
    brand: "",
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageDefault, setImageDefault] = useState([]);
  const [imageOptional, setImageOptional] = useState([]);
  const [imageOptional_Old, setImageOptional_Old] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    var param = {
      ...filter,
      page: refPage.current, // get value
      // txt_search: filter.txt_search,
      // category_id: filter.category_id,
      // brand: filter.brand,
      // page: filter.page,
    };
    setState((pre) => ({ ...pre, loading: true }));
    const res = await request("product", "get", param);
    if (res && !res.error) {
      setState((pre) => ({
        ...pre,
        list: res.list,
        total: refPage.current == 1 ? res.total : pre.total,
        loading: false,
      }));
    }
  };

  const onCloseModal = () => {
    setState((p) => ({
      ...p,
      visibleModal: false,
    }));
    setImageDefault([]);
    setImageOptional([]);
    form.resetFields();
  };
  const onFinish = async (items) => {
    // aaaa
    // console.log("imageProductOptional", imageOptional_Old);
    // console.log(items);
    var imageOptional = [];
    if (imageOptional_Old.length > 0 && items.image_optional) {
      imageOptional_Old.map((item1, index1) => {
        var isFound = false;
        if (items.image_optional) {
          items.image_optional.fileList?.map((item2, index2) => {
            if (item1.name === item2.name) {
              isFound = true;
            }
          });
        }
        if (isFound == false) {
          imageOptional.push(item1.name);
        }
      });
    }

    var params = new FormData();
    // id	category_id	barcode	name	brand	description	qty	price	discount	status	image
    params.append("name", items.name);
    params.append("category_id", items.category_id);
    params.append("barcode", items.barcode); //
    params.append("brand", items.brand);
    params.append("description", items.description);
    params.append("qty", items.qty);
    params.append("price", items.price);
    params.append("discount", items.discount);
    params.append("status", items.status);

    // when update this two more key
    params.append("image", form.getFieldValue("image")); // just name image

    if (imageOptional && imageOptional.length > 0) {
      // image for remove
      imageOptional.map((item) => {
        params.append("image_optional", item); // just name image
      });
    }

    params.append("id", form.getFieldValue("id"));

    if (items.image_default) {
      if (items.image_default.file.status === "removed") {
        params.append("image_remove", "1");
      } else {
        params.append(
          "upload_image",
          items.image_default.file.originFileObj,
          items.image_default.file.name
        );
      }
    }

    if (items.image_optional) {
      items.image_optional.fileList?.map((item, index) => {
        // multiple image
        if (item?.originFileObj) {
          params.append("upload_image_optional", item.originFileObj, item.name);
        }
      });
    }

    var method = "post";
    if (form.getFieldValue("id")) {
      method = "put";
    }
    const res = await request("product", method, params);
    if (res && !res.error) {
      message.success(res.message);
      onCloseModal();
      getList();
    } else {
      res.error?.barcode && message.error(res.error?.barcode);
    }
  };
  const onBtnNew = async () => {
    const res = await request("new_barcode", "post");
    if (res && !res.error) {
      form.setFieldValue("barcode", res.barcode);
      setState((p) => ({
        ...p,
        visibleModal: true,
      }));
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeImageDefault = ({ fileList: newFileList }) =>
    setImageDefault(newFileList);
  const handleChangeImageOptional = ({ fileList: newFileList }) =>
    setImageOptional(newFileList);

  const onFilter = () => {
    getList();
  };

  const onClickEdit = async (item, index) => {
    form.setFieldsValue({
      ...item,
    });
    setState((pre) => ({ ...pre, visibleModal: true }));
    if (item.image != "" && item.image != null) {
      const imageProduct = [
        {
          uid: "-1",
          name: item.image,
          status: "done",
          url: "http://localhost:/fullstack/" + item.image,
        },
      ];
      setImageDefault(imageProduct);
    }
    //
    // product_image
    const res_image = await request("product_image/" + item.id, "get");
    if (res_image && !res_image.error) {
      if (res_image.list) {
        var imageProductOptional = [];
        res_image.list.map((item, index) => {
          imageProductOptional.push({
            uid: index,
            name: item.image,
            status: "done",
            url: "http://localhost:/fullstack/" + item.image,
          });
        });
        setImageOptional(imageProductOptional);
        setImageOptional_Old(imageProductOptional);
      }
    }
  };
  const onClickDelete = (item, index) => {
    Modal.confirm({
      title: "Remove data",
      content: "Are you to remove this porduct?",
      onOk: async () => {
        const res = await request("product", "delete", item);
        if (res && !res.error) {
          message.success(res.message);
          getList();
        }
      },
    });
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
            style={{ width: 130 }}
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
        <Button type="primary" onClick={onBtnNew}>
        NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={form.getFieldValue("id") ? "Edit Product" : "New Product"}
        footer={null}
        onCancel={onCloseModal}
        width={700}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name={"name"}
                label="Product name"
                rules={[
                  {
                    required: true,
                    message: "Please fill in product name",
                  },
                ]}
              >
                <Input placeholder="Product name" />
              </Form.Item>
              <Form.Item
                name={"brand"}
                label="Brand"
                rules={[
                  {
                    required: true,
                    message: "Please fill in product name",
                  },
                ]}
              >
                <Select
                  placeholder="Select brand"
                  options={config.brand?.map((item) => ({
                    label: item.label + " (" + item.country + ")",
                    value: item.value,
                  }))}
                />
              </Form.Item>
              <Form.Item name={"barcode"} label="Barcode">
                <Input
                  disabled
                  placeholder="Barcode"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item name={"qty"} label="Quantity">
                <InputNumber placeholder="Quantity" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"discount"} label="Discount">
                <InputNumber placeholder="Discount" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"category_id"}
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please fill in product name",
                  },
                ]}
              >
                <Select
                  placeholder="Select category"
                  options={config.category}
                />
              </Form.Item>

              <Form.Item name={"price"} label="Price">
                <InputNumber placeholder="Price" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"status"} label="status">
                <Select
                  placeholder="Select status"
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
                />
              </Form.Item>
              <Form.Item name={"description"} label="description">
                <Input.TextArea placeholder="description" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name={"image_default"} label="Image">
            <Upload
              customRequest={(options) => {
                options.onSuccess();
                // options.onProgress({ percent: 0 });
                // options.onProgress({ percent: 100 });
              }}
              // accept=""
              maxCount={1}
              listType="picture-card"
              fileList={imageDefault}
              onPreview={handlePreview}
              onChange={handleChangeImageDefault}
            >
              <div>+Upload</div>
            </Upload>
          </Form.Item>

          <Form.Item name={"image_optional"} label="Image (Optional)">
            <Upload
              customRequest={(options) => {
                options.onSuccess();
              }}
              listType="picture-card"
              multiple={true}
              maxCount={4}
              fileList={imageOptional}
              onPreview={handlePreview}
              onChange={handleChangeImageOptional}
            >
              <div>+Upload</div>
            </Upload>
          </Form.Item>

          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
      <Table
        dataSource={state.list}
        pagination={{
          pageSize: 2,
          total: state.total,
          onChange: (page) => {
            // setFilter((pre) => ({ ...pre, page: page }));
            refPage.current = page;
            getList();
          },
        }}
        columns={[
          
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
            render: (text) => (
              <div className="truncate-text" title={text} style={{whiteSpace: "pre-line"}}>
                {text}
              </div>
            ),
          },
          {
            key: "barcode",
            title: "Barcode",
            dataIndex: "barcode",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
            render: (text) => (
              <div className="truncate-text" title={text} style={{ whiteSpace: "pre-line" }}>
                {text}
              </div>
            ),
          },
          

          {
            key: "category_name",
            title: "Category_name",
            dataIndex: "category_name",
          },
          {
            key: "brand",
            title: "Brand",
            dataIndex: "brand",
          },
          {
            key: "qty",
            title: "Qty",
            dataIndex: "qty",
            render: (value) => (
              <div>
                <Tag
                  color={value > 10 ? "green" : "red"} // Set color based on value
                  style={{ fontSize: "14px" }}
                  onClick={() => {
                    if (value <= 5) {
                      alert("Low Stock");
                    }
                  }}
                >
                  {value}
                </Tag>
              </div>
            )
            
          },
         
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status == 1 ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">InActive</Tag>
              ),
          },
          {
            key: "image",
            title: "Image",
            dataIndex: "image",
            // render: (value) =>
            //   "http://localhost:81/fullstack/image_pos/" + value,
            render: (value) =>
              value ? (
                <Image
                  src={"http://localhost:/fullstack/" + value}
                  style={{ width: 60 }}
                />
              ) : (
                <div
                  style={{ backgroundColor: "#EEE", width: 40, height: 40 }}
                />
              ),
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render: (item, data, index) => (
              <Space>
                <Button
                  type="primary"
                  icon={<MdEdit />}
                  onClick={() => onClickEdit(data, index)}
                />
                {isPermission("product.remove") && (
                   <Button
                   type="primary"
                   danger
                   icon={<MdDelete />}
                   onClick={() => onClickDelete(data, index)}
                 />

                )}
               
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}

export default StockInPage;
