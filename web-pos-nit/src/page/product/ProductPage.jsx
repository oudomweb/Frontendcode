// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Form,
//   Image,
//   Input,
//   InputNumber,
//   message,
//   Modal,
//   Row,
//   Select,
//   Space,
//   Table,
//   Tag,
//   Upload,
// } from "antd";
// import { isPermission, request } from "../../util/helper";
// import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
// import MainPage from "../../component/layout/MainPage";
// import { configStore } from "../../store/configStore";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// function ProductPage() {
//   const { config } = configStore();
//   const [form] = Form.useForm();
//   const [state, setState] = useState({
//     list: [],
//     total: 0,
//     loading: false,
//     visibleModal: false,
//   });

//   const refPage = React.useRef(1);

//   const [filter, setFilter] = useState({
//     txt_search: "",
//     category_id: "",
//     brand: "",
//   });

//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [imageDefault, setImageDefault] = useState([]);
//   const [imageOptional, setImageOptional] = useState([]);
//   const [imageOptional_Old, setImageOptional_Old] = useState([]);

//   useEffect(() => {
//     getList();
//   }, []);

//   const getList = async () => {
//     var param = {
//       ...filter,
//       page: refPage.current, // get value
//       // txt_search: filter.txt_search,
//       // category_id: filter.category_id,
//       // brand: filter.brand,
//       // page: filter.page,
//     };
//     setState((pre) => ({ ...pre, loading: true }));
//     const res = await request("product", "get", param);
//     if (res && !res.error) {
//       setState((pre) => ({
//         ...pre,
//         list: res.list,
//         total: refPage.current == 1 ? res.total : pre.total,
//         loading: false,
//       }));
//     }
//   };

//   const onCloseModal = () => {
//     setState((p) => ({
//       ...p,
//       visibleModal: false,
//     }));
//     // setImageDefault([]);
//     // setImageOptional([]);
//     form.resetFields();
//   };
//   const onValuesChange = (changedValues, allValues) => {
//     if (changedValues.qty || changedValues.unit_price) {
//       const totalPrice = allValues.qty * allValues.unit_price;
//       form.setFieldsValue({ price: totalPrice });
//     }
//   };
//   const onFinish = async (items) => {
//     const totalPrice = items.qty * items.unit_price;

//     // Add total price to the form items
//     items.price = totalPrice;

//     // Submit the form data
//     if (items.id) {
//       // Update existing product
//       updateProduct(items);
//     } else {
//       // Create new product
//       createProduct(items);
//     }
//     // aaaa
//     // console.log("imageProductOptional", imageOptional_Old);
//     // console.log(items);
//     // var imageOptional = [];
//     // if (imageOptional_Old.length > 0 && items.image_optional) {
//     //   imageOptional_Old.map((item1, index1) => {
//     //     var isFound = false;
//     //     if (items.image_optional) {
//     //       items.image_optional.fileList?.map((item2, index2) => {
//     //         if (item1.name === item2.name) {
//     //           isFound = true;
//     //         }
//     //       });
//     //     }
//     //     if (isFound == false) {
//     //       imageOptional.push(item1.name);
//     //     }
//     //   });
//     // }

//     var params = new FormData();
//     // id	category_id	barcode	name	brand	description	qty	price	discount	status	image
//     // params.append("name", items.name);
//     params.append("category_id", items.category_id);
//     params.append("barcode", items.barcode); //
//     params.append("brand", items.brand);
//     params.append("description", items.description);
//     params.append("qty", items.qty);
//     params.append("price", items.price);
//     params.append("discount", items.discount);
//     params.append("status", items.status);

//     // when update this two more key
//     // params.append("image", form.getFieldValue("image")); // just name image

//     // if (imageOptional && imageOptional.length > 0) {
//     //   // image for remove
//     //   imageOptional.map((item) => {
//     //     params.append("image_optional", item); // just name image
//     //   });
//     // }

//     // params.append("id", form.getFieldValue("id"));

//     // if (items.image_default) {
//     //   if (items.image_default.file.status === "removed") {
//     //     params.append("image_remove", "1");
//     //   } else {
//     //     params.append(
//     //       "upload_image",
//     //       items.image_default.file.originFileObj,
//     //       items.image_default.file.name
//     //     );
//     //   }
//     // }

//     // if (items.image_optional) {
//     //   items.image_optional.fileList?.map((item, index) => {
//     //     // multiple image
//     //     if (item?.originFileObj) {
//     //       params.append("upload_image_optional", item.originFileObj, item.name);
//     //     }
//     //   });
//     // }

//     var method = "post";
//     if (form.getFieldValue("id")) {
//       method = "put";
//     }
//     const res = await request("product", method, params);
//     if (res && !res.error) {
//       message.success(res.message);
//       onCloseModal();
//       getList();
//     } else {
//       res.error?.barcode && message.error(res.error?.barcode);
//     }
//   };
//   const onBtnNew = async () => {
//     const res = await request("new_barcode", "post");
//     if (res && !res.error) {
//       form.setFieldValue("barcode", res.barcode);
//       setState((p) => ({
//         ...p,
//         visibleModal: true,
//       }));
//     }
//   };

//   // const handlePreview = async (file) => {
//   //   if (!file.url && !file.preview) {
//   //     file.preview = await getBase64(file.originFileObj);
//   //   }
//   //   setPreviewImage(file.url || file.preview);
//   //   setPreviewOpen(true);
//   // };

//   // const handleChangeImageDefault = ({ fileList: newFileList }) =>
//   //   setImageDefault(newFileList);
//   // const handleChangeImageOptional = ({ fileList: newFileList }) =>
//   //   setImageOptional(newFileList);

//   const onFilter = () => {
//     getList();
//   };

//   const onClickEdit = async (item, index) => {
//     form.setFieldsValue({
//       ...item,
//     });
//     // form.getFieldValue("id")
//     setState((pre) => ({ ...pre, visibleModal: true }));
//   };
//   const onClickDelete = (item, index) => {
//     Modal.confirm({
//       title: "Remove data",
//       content: "Are you to remove this porduct?",
//       onOk: async () => {
//         if (form.getFieldValue("id")) {
//           const res = await request("product", "delete", item);
//           if (res && !res.error) {
//             message.success(res.message);
//             getList();

//           }

//         }

//       },
//     });
//   };
//   const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
//   };

//   return (
//     <MainPage loading={state.loading}>
//       <div className="pageHeader">
//         <Space>
//           <div>Product {state.total}</div>
//           <Input.Search
//             onChange={(event) =>
//               setFilter((p) => ({ ...p, txt_search: event.target.value }))
//             }
//             allowClear
//             placeholder="Search"
//           />
//           <Select
//             allowClear
//             style={{ width: 130 }}
//             placeholder="Category"
//             options={config.category}
//             onChange={(id) => {
//               setFilter((pre) => ({ ...pre, category_id: id }));
//             }}
//           />
//           <Select
//             allowClear
//             style={{ width: 130 }}
//             placeholder="Brand"
//             options={config.brand}
//             onChange={(id) => {
//               setFilter((pre) => ({ ...pre, brand: id }));
//             }}
//           />
//           <Button onClick={onFilter} type="primary">
//             Filter
//           </Button>
//         </Space>
//         <Button type="primary" onClick={onBtnNew}>
//           NEW
//         </Button>
//       </div>

//       <Modal
//         open={state.visibleModal}
//         title={form.getFieldValue("id") ? "Edit Product" : "New Product"}
//         footer={null}
//         onCancel={onCloseModal}
//         width={700}
//       >
//         <Form layout="vertical" onFinish={onFinish} form={form}>
//           <Row gutter={8}>
//             <Col span={12}>
//             <Form.Item name={"name"} label="Product Name">
//                 <Input
//                   placeholder="Product Name"
//                   style={{ width: "100%" }}

//                 />
//               </Form.Item>
//               <Form.Item
//                 name={"brand"}
//                 label="Brand"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill in product brand",
//                   },
//                 ]}
//               >
//                 <Select
//                   placeholder="Select brand"
//                   options={config.brand?.map((item) => ({
//                     label: item.label + " (" + item.country + ")",
//                     value: item.value,
//                   }))}
//                 />
//               </Form.Item>
//               <Form.Item name={"barcode"} label="Barcode">
//                 <Input disabled placeholder="Barcode" style={{ width: "100%" }} />
//               </Form.Item>
//               <Form.Item name={"qty"} label="Quantity">
//                 <InputNumber
//                   placeholder="Quantity"
//                   style={{ width: "100%" }}

//                 />
//               </Form.Item>
//               <Form.Item name={"discount"} label="Discount (%)">
//                 <InputNumber
//                   placeholder="Discount"
//                   style={{ width: "100%" }}

//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name={"category_id"}
//                 label="Category"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill in product category",
//                   },
//                 ]}
//               >
//                 <Select placeholder="Select category" options={config.category} />
//               </Form.Item>

//               <Form.Item name={"unit_price"} label="Unit Price">
//                 <InputNumber
//                   placeholder="Unit Price"
//                   style={{ width: "100%" }}

//                 />
//               </Form.Item>

//               <Form.Item name={"status"} label="Status">
//                 <Select
//                   placeholder="Select status"
//                   options={[
//                     {
//                       label: "Active",
//                       value: 1,
//                     },
//                     {
//                       label: "Inactive",
//                       value: 0,
//                     },
//                   ]}
//                 />
//               </Form.Item>
//               <Form layout="vertical" onFinish={onFinish} form={form} onValuesChange={onValuesChange}>
//                 {/* Other form items */}
//                 <Form.Item name={"price"} label="Total Price">
//                   <InputNumber disabled style={{ width: "100%" }} />
//                 </Form.Item>
//               </Form>

//               {/* <Form.Item name={"total_price"} label="Total Price">
//               <InputNumber
//                 disabled
//                 value={form.getFieldValue("total_price")}
//                 style={{ width: "100%" }}
//               />
//             </Form.Item> */}

//               <Form.Item name={"description"} label="Description">
//                 <Input.TextArea placeholder="Description" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <div style={{ textAlign: "right" }}>
//             <Space>
//               <Button onClick={onCloseModal}>Cancel</Button>
//               <Button type="primary" htmlType="submit">
//                 {form.getFieldValue("id") ? "Update" : "Save"}
//               </Button>
//             </Space>
//           </div>
//         </Form>
//       </Modal>
//       <Table
//         dataSource={state.list}
//         pagination={{
//           pageSize: 2,
//           total: state.total,
//           onChange: (page) => {
//             // setFilter((pre) => ({ ...pre, page: page }));
//             refPage.current = page;
//             getList();
//           },
//         }}

//         columns={[

//           {
//             key: "name",
//             title: "Name",
//             dataIndex: "name",
//             render: (text) => (
//               <div className="truncate-text" title={text} style={{ whiteSpace: "pre-line" }}>
//                 {text}
//               </div>
//             ),
//           },
//           {
//             key: "barcode",
//             title: "Barcode",
//             dataIndex: "barcode",
//             render: (value) => (
//               <Tag color="blue">
//                 {value}
//               </Tag>
//             )
//           },
//           {
//             key: "description",
//             title: "Description",
//             dataIndex: "description",
//             render: (text) => (
//               <div className="truncate-text" title={text} style={{ whiteSpace: "pre-line" }}>
//                 {text}
//               </div>
//             ),
//           },


//           {
//             key: "category_name",
//             title: "Category_name",
//             dataIndex: "category_name",
//           },
//           {
//             key: "brand",
//             title: "Brand",
//             dataIndex: "brand",
//           },
//           {
//             key: "qty",
//             title: "Qty",
//             dataIndex: "qty",
//             render: (value) => (
//               <div>
//                 <Tag
//                   color={value > 10 ? "green" : "red"} // Set color based on value
//                   style={{ fontSize: "14px" }}
//                   onClick={() => {
//                     if (value <= 5) {
//                       alert("Low Stock");
//                     }
//                   }}
//                 >
//                   {value}
//                 </Tag>
//               </div>
//             )

//           },
//           {
//             key: "unit",
//             title: "Unit",
//             dataIndex: "unit",
//             render: (value) => (
//               <div>
//                 <Tag
//                   color="green"  // Set color based on value


//                 >
//                   {value}
//                 </Tag>
//               </div>
//             )

//           },
//           {
//             key: "unit_price",
//             title: "Unit Price",
//             dataIndex: "unit_price",
//             render: (value, text) => {
//               // Conditional color based on value
//               let tagColor = value > 20 ? "green" : "volcano"; // Example logic

//               return (
//                 <div>
//                   <Tag color={tagColor}>
//                     {formatCurrency(value)} {/* Display formatted price */}
//                   </Tag>

//                 </div>
//               );
//             },
//           },

//           {
//             key: "price",
//             title: "Price",
//             dataIndex: "total_price",
//             render: (text) => formatCurrency(text),
//           },
//           {
//             key: "discount",
//             title: "Discount",
//             dataIndex: "discount",
//           },
//           {
//             key: "status",
//             title: "Status",
//             dataIndex: "status",
//             render: (status) =>
//               status == 1 ? (
//                 <Tag color="green">Active</Tag>
//               ) : (
//                 <Tag color="red">InActive</Tag>
//               ),
//           },
//           // {
//           //   key: "image",
//           //   title: "Image",
//           //   dataIndex: "image",
//           //   // render: (value) =>
//           //   //   "http://localhost:81/fullstack/image_pos/" + value,
//           //   render: (value) =>
//           //     value ? (
//           //       <Image
//           //         src={"http://localhost:/fullstack/" + value}
//           //         style={{ width: 60 }}
//           //       />
//           //     ) : (
//           //       <div
//           //         style={{ backgroundColor: "#EEE", width: 40, height: 40 }}
//           //       />
//           //     ),
//           // },
//           {
//             key: "Action",
//             title: "Action",
//             align: "center",
//             render: (item, data, index) => (
//               <Space>
//                 <Button
//                   type="primary"
//                   icon={<MdEdit />}
//                   onClick={() => onClickEdit(data, index)}
//                 />
//                 {/* {isPermission("product.remove") && ( */}
//                 <Button
//                   type="primary"
//                   danger
//                   icon={<MdDelete />}
//                   onClick={() => onClickDelete(data, index)}
//                 />

//                 {/* )} */}

//               </Space>
//             ),
//           },
//         ]}
//       />
//     </MainPage>
//   );
// }

// export default ProductPage;


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
import { formatDateClient, isPermission, request } from "../../util/helper";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { configStore } from "../../store/configStore";
import * as XLSX from 'xlsx/xlsx.mjs';



function ProductPage() {
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
      // is_list_all: 1
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
    form.resetFields();
  };

  // const onValuesChange = (changedValues, allValues) => {
  //   if (changedValues.qty || changedValues.unit_price) {
  //     const totalPrice = allValues.qty * allValues.unit_price;
  //     form.setFieldsValue({ price: totalPrice });
  //   }
  // };

  const onFinish = async (items) => {
    var data = {
      id: form.getFieldValue("id"),
      name: items.name,
      category_id: items.category_id,
      barcode: items.barcode,
      brand: items.brand,
      company_name: items.company_name,
      qty: items.qty,
      unit: items.unit,
      unit_price: items.unit_price,
      discount: items.discount,
      description: items.description,
      status: items.status,

    };
    var method = "post";
    if (form.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("product", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };




  // Example: Assuming items.category_id contains the selected category ID.
  // const onFinish = async (items) => {
  //   // Check if category_id exists before making the request
  //   console.log('Received category_id:', items.category_id); // Debugging line
  //   const originalPrice = items.qty * items.unit_price; // Original price
  //   const totalPrice = originalPrice * (1 - items.discount / 100); // Apply discount

  //   var params = new FormData();
  //   params.append("name", items.name);
  //   params.append("unit", items.unit);
  //   params.append("unit_price", items.unit_price);
  //   params.append("category_id", items.category_id); // Ensure category_id is passed
  //   params.append("barcode", items.barcode);
  //   params.append("brand", items.brand);
  //   params.append("description", items.description);
  //   params.append("qty", items.qty);
  //   params.append("price", totalPrice); // Use the discounted price
  //   params.append("discount", items.discount);
  //   params.append("status", items.status);

  //   var method = form.getFieldValue("id") ? "put" : "post";
  //   const res = await request("product", method, params);
  //   if (res && !res.error) {
  //     message.success(res.message);
  //     onCloseModal();
  //     getList();
  //   } else {
  //     res.error?.barcode && message.error(res.error?.barcode);
  //   }
  // };



  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.qty || changedValues.unit_price || changedValues.discount) {
      const originalPrice = allValues.qty * allValues.unit_price; // Original price
      const totalPrice = originalPrice * (1 - (allValues.discount || 0) / 100); // Apply discount
      form.setFieldsValue({ price: totalPrice }); // Update the total price field
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

  const onFilter = () => {
    getList();
  };

  const onClickEdit = (data, index) => {
    setState({
      ...state,
      visibleModal: true,
    });
    form.setFieldsValue({
      id: data.id, // hiden id (save? | update?)
      name: data.name,
      category_id: data.category_id,
      brand: data.brand,
      company_name: data.company_name,
      qty: data.qty,
      unit: data.unit,
      unit_price: data.unit_price,
      discount: data.discount,
      description: data.description,
      status: data.status,
    });
    //
    // formRef.getFieldValue("id")
  };
  const onClickDelete = (item, index) => {
    if (!item.id) {
      message.error("Product ID is missing!");
      return;
    }

    Modal.confirm({
      title: "Remove Product",
      content: "Are you sure you want to remove this product?",
      onOk: async () => {
        try {
          const res = await request(`product/${item.id}`, "delete"); // Adjust based on API
          if (res && !res.error) {
            message.success(res.message);
            getList(); // Refresh product list
          } else {
            message.error(res.message || "Failed to delete product!");
          }
        } catch (error) {
          console.error("Delete Error:", error);
          message.error("An error occurred while deleting the product.");
        }
      },
    });
  };



  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
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
        {/* <Button onClick={ExportToExcel} type="primary">Export to Exel</Button> */}
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
        {/* <Form layout="vertical" onFinish={onFinish} form={form} onValuesChange={onValuesChange}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name={"name"} label="Product Name">
                <Input placeholder="Product Name" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name={"brand"}
                label="Brand"
                rules={[
                  {
                    required: true,
                    message: "Please fill in product brand",
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
                <Input disabled placeholder="Barcode" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"qty"} label="Quantity">
                <InputNumber placeholder="Quantity" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"discount"} label="Discount (%)">
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
                    message: "Please fill in product category",
                  },
                ]}
              >
                <Select placeholder="Select category" options={config.category} />
              </Form.Item>
              <Form.Item name={"unit"} label="Unit">
                <Select placeholder=" Select Unit" options={config?.unit} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"unit_price"} label="Unit Price">
                <InputNumber placeholder="Unit Price" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"status"} label="Status">
                <Select
                  placeholder="Select status"
                  options={[
                    {
                      label: "Active",
                      value: 1,
                    },
                    {
                      label: "Inactive",
                      value: 0,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name={"price"} label="Total Price">
                <InputNumber disabled style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={"description"} label="Description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {form.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </Space>
          </div>
        </Form> */}

        <Form layout="vertical" onFinish={onFinish} form={form} onValuesChange={onValuesChange}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name={"name"} label={
                <div>
                  <div className="khmer-text">ឈ្មោះផលិតផល</div>
                  <div className="english-text">Product Name</div>
                </div>
              }>
                <Input placeholder="Product Name" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name={"brand"}
                label={
                  <div>
                    <div className="khmer-text">ម៉ាក</div>
                    <div className="english-text">Brand</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please fill in product brand",
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

              <Form.Item name={"barcode"} label={
                <div>
                  <div className="khmer-text">លេខបាកូដ</div>
                  <div className="english-text">Barcode</div>
                </div>
              }>
                <Input disabled placeholder="Barcode" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name={"qty"} label={
                <div>
                  <div className="khmer-text">បរិមាណ</div>
                  <div className="english-text">Quantity</div>
                </div>
              }>
                <InputNumber placeholder="Quantity" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name={"discount"} label={
                <div>
                  <div className="khmer-text">បញ្ចុះតម្លៃ (%)</div>
                  <div className="english-text">Discount (%)</div>
                </div>
              }>
                <InputNumber placeholder="Discount" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name={"company_name"}
                label={
                  <div>
                    <div className="khmer-text">ក្រុមហ៊ុន</div>
                    <div className="english-text">Company</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Select Company Name",
                  },
                ]}
              >
                <Select placeholder="Select Company" options={config?.company_name} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={"category_id"}
                label={
                  <div>
                    <div className="khmer-text">ប្រភេទផលិតផល</div>
                    <div className="english-text">Category</div>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please fill in product category",
                  },
                ]}
              >
                <Select placeholder="Select category" options={config.category} />
              </Form.Item>

              <Form.Item name={"unit"} label={
                <div>
                  <div className="khmer-text">ឯកតា</div>
                  <div className="english-text">Unit</div>
                </div>
              }>
                <Select placeholder="Select Unit" options={config?.unit} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name={"unit_price"} label={
                <div>
                  <div className="khmer-text">តម្លៃឯកតា</div>
                  <div className="english-text">Unit Price</div>
                </div>
              }>
                <InputNumber
                  placeholder="Unit Price"
                  style={{ width: "100%" }}
                  formatter={(value) => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item name={"status"} label={
                <div>
                  <div className="khmer-text">ស្ថានភាព</div>
                  <div className="english-text">Status</div>
                </div>
              }>
                <Select
                  placeholder="Select status"
                  options={[
                    {
                      label: "Active",
                      value: 1,
                    },
                    {
                      label: "Inactive",
                      value: 0,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item name={"price"} label={
                <div>
                  <div className="khmer-text">តម្លៃសរុប</div>
                  <div className="english-text">Total Price</div>
                </div>
              }>
                <InputNumber
                  disabled
                  style={{ width: "100%" }}
                  formatter={(value) => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item name={"description"} label={
                <div>
                  <div className="khmer-text">ការពិពណ៌នា</div>
                  <div className="english-text">Description</div>
                </div>
              }>
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>

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
            dataIndex: "name",
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
            key: "company_name",
            title: (
              <div className="table-header">
                <div className="khmer-text">ឈ្មោះក្រុមហ៊ុន</div>
                <div className="english-text">Company Name</div>
              </div>
            ),
            dataIndex: "company_name",
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
            dataIndex: "create_at",
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

export default ProductPage;