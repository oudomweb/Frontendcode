import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { RiCodeView } from "react-icons/ri";
import { formatDateClient, formatDateServer, request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import Style from "../../page/orderPage/OrderPage.module.css"
import { Config } from "../../util/config";
import dayjs from "dayjs";
// import { formartDateClient } from "../../../../api-pos-nit/src/util/helper";
function List_StockOut() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);

  const [orderDetail, seOrderDetail] = useState([]);

  const [summary, setSummary] = useState({ total_amount: 0, total_order: 0 });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    name: "",
    descriptoin: "",
    status: "",
    parentId: null,
    txtSearch: "",

  });

  const [filter, setFilter] = useState({
    from_date: dayjs(),  // Default to the current date (you can adjust this)
    to_date: dayjs(),    // Default to the current date (you can adjust this)
  });

  useEffect(() => {
    getList();
  }, []);



  const getList = async () => {
    setLoading(true);  // Start the loading indicator
  
    try {
      // Prepare the parameters for the request
      const param = {
        txtSearch: state.txtSearch,
        from_date: formatDateServer(filter.from_date),  // Ensure the date is in the correct format
        to_date: formatDateServer(filter.to_date),      // Ensure the date is in the correct format
      };
  
      // Send the request and wait for the response
      const res = await request("order", "get", param);
  
      if (res) {
        // If response is valid, update the state with the list and summary
        setList(res.list);
        setSummary(res.summary || { total_amount: 0, total_order: 0 });
      }
    } catch (error) {
      // If there's an error, you can handle it here (e.g., showing an error message)
      console.error("Error fetching list: ", error);
      // Optionally, show some error state or message
    } finally {
      setLoading(false);  // Always stop the loading indicator, regardless of success or failure
    }
  };
  
  const getOderdetail = async (data) => {
    setLoading(true);
    const res = await request("order_detail/" + data.id, "get");
    setLoading(false);
    if (res) {
      seOrderDetail(res.list);
      setState({
        ...state,
        visibleModal: true,
      });
    }
    // setState({
    //   ...state,
    //   visibleModal: true,
    // });
    // formRef.setFieldsValue({
    //   id: data.id, // hiden id (save? | update?)
    //   name: data.name,
    //   description: data.description,
    //   status: data.status,
    // });
    //
    // formRef.getFieldValue("id")
  };
  // const onClickDelete = async (data) => {
  //   Modal.confirm({
  //     title: "លុ​ប",
  //     descriptoin: "Are you sure to remove?",
  //     okText: "យល់ព្រម",
  //     onOk: async () => {
  //       const res = await request("order", "delete", {
  //         id: data.id,
  //       });
  //       if (res && !res.error) {
  //         // getList(); // request to api response
  //         // remove in local
  //         message.success(res.message);
  //         const newList = list.filter((item) => item.id != data.id);
  //         setList(newList);
  //       }
  //     },
  //   });
  // };
  const onClickAddBtn = () => {
    setState({
      ...state,
      visibleModal: true,
    });
  };
  const onCloseModal = () => {
    formRef.resetFields();
    setState({
      ...state,
      visibleModal: false,
      id: null,
    });
  };

  const onFinish = async (items) => {
    var data = {
      id: formRef.getFieldValue("id"),
      name: items.name,
      description: items.description,
      status: items.status,
      parent_id: 0,
    };
    var method = "post";
    if (formRef.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("order", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>
            <div style={{ fontWeight: "bold" }}>Order</div>
            <div >Total:
              <Tag color="green">
                {summary?.total_amount ?? 0} order
              </Tag>

              <Tag color="blue">
                {summary?.total_order ?? 0}$
              </Tag>
            </div>
            <div></div>
          </div>




          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"

            

          />
          <DatePicker.RangePicker
            allowClear
            defaultValue={[
              dayjs(filter.from_date, "DD/MM/YYYY"),  // Convert from_date to dayjs format
              dayjs(filter.to_date, "DD/MM/YYYY")     // Convert to_date to dayjs format
            ]}
            format={"DD/MM/YYYY"}  // Set the date format for display
            onChange={(value) => {
              setFilter((prev) => ({
                ...prev,
                from_date: value[0] , // Update from_date in the filter
                to_date: value[1]    // Update to_date in the filter
               
              }));
              
            }}

            
          />
          
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={formRef.getFieldValue("id") ? "Edit order" : "New order"}
        footer={null}
        onCancel={onCloseModal}
        width={800}
        centered={true}
      >
        <Table
          dataSource={orderDetail}
          columns={[
            {
              key: "p_name",
              title: "Product",
              dataIndex: "p_name",
              render: (text, data) => (
                <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                  {/* Product Name in Bold */}
                  <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
                    {data.p_name}
                  </div>

                  {/* Product Category & Brand */}
                  <div style={{ color: "#777" }}>
                    {data.p_category_name} | {data.p_brand}
                  </div>

                  {/* Description with Line Breaks */}
                  <div
                    className="truncate-text"
                    title={text}
                    style={{ whiteSpace: "pre-line", color: "#666" }}
                  >
                    {data.p_des}
                    | {text}
                  </div>
                </div>
              )
            },
            {
              key: "qty",
              title: "Qty",
              dataIndex: "qty",
              render: (text) => <div style={{ textAlign: "center", fontWeight: "bold" }}>

                <Tag color="green">{text}</Tag>
              </div>,
            },
            {
              key: "price",
              title: "Price",
              dataIndex: "price",
              render: (text) => <div style={{ textAlign: "right", fontWeight: "bold" }}><Tag color="pink">${text}</Tag></div>,
            },
            {
              key: "discount",
              title: "Discount",
              dataIndex: "discount",
              render: (text) => <div style={{ textAlign: "right" }}><Tag color="red">{text}%</Tag></div>,
            },
            {
              key: "total",
              title: "Total",
              dataIndex: "total",
              render: (text) => <div style={{ textAlign: "right", fontWeight: "bold", color: "#333" }}><Tag color="blue">${text}</Tag></div>,
            },
            {
              key: "p_image",
              title: "Image",
              dataIndex: "p_image",
              render: (img) => (
                <Image
                  src={Config.image_path + img}
                  alt="Product Image"
                  style={{
                    width: 60, // Increased size for better visibility
                    height: 60,
                    borderRadius: "8px", // Adds smooth corners
                    objectFit: "cover", // Ensures proper aspect ratio
                    border: "1px solid #ddd", // Subtle border
                    padding: "3px", // Adds spacing inside the border
                    backgroundColor: "#f9f9f9", // Light background
                    transition: "transform 0.2s ease-in-out", // Smooth hover effect
                  }}
                  preview={true} // Enables image preview on click
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} // Hover zoom-in effect
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Reset on hover out
                />
              ),
            }
          ]}
          pagination={{ pageSize: 5 }}
          rowKey="id"
          style={{ marginTop: "20px" }} // Adds space between the table and modal form
          rowClassName="table-row-hover"
          onRow={(record, rowIndex) => ({
            onMouseEnter: () => {
              // Optionally, you can style the row on hover
            },
          })}
          bordered // Adds a border around the table
          scroll={{ x: 'max-content' }} // Allows horizontal scrolling for large content
        />

      </Modal>
      <div>
        <Tag className={Style.Tag_Style}>
          <Table
            dataSource={list}
            columns={[

              {
                key: "order_no",
                title: "Order_no",
                dataIndex: "order_no",

                render: (value) => (
                  <div>
                    <Tag color="blue">
                      {value}
                    </Tag>
                  </div>
                )
              },
              {
                key: "customer",
                title: "customer",
                dataIndex: "customer_name",

                render: (value, data) => (
                  <>
                    <div style={{ fontWeight: "bold" }}>{data.customer_name}</div>
                    <div>{data.customer_tel}</div>
                    <div>{data.customer_address}</div>
                  </>
                )


              },
              {
                key: "Total",
                title: "Total",
                dataIndex: "total_amount",
              },
              {
                key: "Paid",
                title: "Paid",
                dataIndex: "paid_amount",
                render: (value) => (

                  <div style={{ color: "green", fontWeight: "bold" }}>
                    {value}
                  </div>
                )
              },
              {
                key: "Due",
                title: "Due",
                dataIndex: "Due",
                render: (value, data) => (
                  <Tag color="red">{(Number(data.total_amount) - Number(data.paid_amount)).toFixed(2)}</Tag>
                )
              },

              {
                key: "PaymentMethod",
                title: "Payment Method",
                dataIndex: "payment_method",
                render: (value) => (
                  <div style={{ textAlign: "center" }}>
                    <Tag color="green">{value}</Tag>
                  </div>
                )

              },
              {
                key: "Remark",
                title: "Remark",
                dataIndex: "remark",
              },
              {
                key: "User",
                title: "User",
                dataIndex: "create_by",
                render: (value) => (
                  <div>
                    <Tag color="pink">
                      {value}
                    </Tag>
                  </div>
                )
              },
              {
                key: "Order_Date",
                title: "Order Date",
                dataIndex: "create_at",

                render: (value) => formatDateClient(value, "DD/MM/YYYY H:m A")
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
                      icon={<RiCodeView />}
                      onClick={() => getOderdetail(data, index)}
                    />
                    {/* <Button
                  type="primary"
                  danger
                  icon={<MdDelete />}
                  onClick={() => onClickDelete(data, index)}
                /> */}
                  </Space>
                ),
              },
            ]}
          />
        </Tag>
      </div>

    </MainPage>
  );
}

export default List_StockOut;
