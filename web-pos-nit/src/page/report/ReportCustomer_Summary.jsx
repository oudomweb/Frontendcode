import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { request } from "../../util/helper";
import { Button, DatePicker, Flex, Select, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { configStore } from "../../store/configStore";
// import Styles from "../../page/report/ReportSale_module.css"

export const options = {
  curveType: "function",
  legend: { position: "bottom" },
};

function ReportCustomer_Summary() {
  const { config } = configStore();
  const [loading, setLoading] = useState(false);
  const [filter,setFilter]=useState({
    from_date:dayjs().subtract(29,"d"),
    to_date:dayjs(),
  
  })
  const [state, setState] = useState({
    Data_Chat: [],
    list: [],
  });

  useEffect(() => {
    getList();
  }, []);

  // const getList = async () => {
  //   let param = {
  //     from_date :dayjs(filter.from_date).format("YYYY-MM-DD"),
  //     to_date :dayjs(filter.to_date).format("YYYY-MM-DD"),
  //     category_id:filter.category_id,
  //     brand_id:filter.brand_id,

  //   }
  // const getList = async () => {
  //   try {
  //     setLoading(true);
  //     try {
  //       // API Call
  //     } finally {
  //       setLoading(false);
  //     }
    
  //     const param = {
  //       from_date: dayjs(filter.from_date).format("YYYY-MM-DD"),
  //       to_date: dayjs(filter.to_date).format("YYYY-MM-DD"),
  //       category_id: filter.category_id,
  //       brand_id: filter.brand_id,
  //     };
  //     const res = await request("report_Sale_Sammary", "get", param);
  //     if (res) {
  //       const listTMP = [["Day", "Sale"]];
  //       res.list?.forEach((item) => {
  //         listTMP.push([item.order_date, Number(item.total_amount)]);
  //       });
  //       setState({ Data_Chat: listTMP, list: res.list });
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch sales summary:", error);
  //   }
  
  
  //   const res = await request("report_Sale_Sammary", "get",param);
  //   if (res) {
  //     // Prepare chart data
  //     const listTMP = [["Day", "Sale"]];
  //     res.list?.forEach((item) => {
  //       listTMP.push([item.order_date, Number(item.total_amount)]);
  //     });

  //     // Update the state with the table and chart data
  //     setState({
  //       Data_Chat: listTMP,
  //       list: res.list,
  //     });
  //   }
  // };
  // const onreset =()=>{
  //   setFilter((p)=>({
  //     ...p,
  //    category_id:[],
  //    brand_id:[],
  //    loading:true
  //   }))
   
  //   getList();
  // }


  const onreset = () => {
    setFilter({
      from_date: dayjs().subtract(29, "d"), // Default from_date (last 30 days)
      to_date: dayjs(), // Default to_date (today)
      
    });
  
    // Reload default data after resetting filters
    getList({
      from_date: dayjs().subtract(29, "d").format("YYYY-MM-DD"),
      to_date: dayjs().format("YYYY-MM-DD"),
    
    });
  };
  
  const getList = async (customFilter = null) => {
    try {
      setLoading(true);
      const param = customFilter || {
        from_date: dayjs(filter.from_date).format("YYYY-MM-DD"),
        to_date: dayjs(filter.to_date).format("YYYY-MM-DD"),
      
      };
  
      const res = await request("report_Customer", "get", param);
      if (res) {
        const listTMP = [["Day", "Sale"]];
        res.list?.forEach((item) => {
          listTMP.push([item.title, Number(item.total_amount)]);
        });
  
        // Update the state with chart and table data
        setState({
          Data_Chat: listTMP,
          list: res.list,
        });
      } else {
        // Clear data if no results are returned
        setState({
          Data_Chat: [["Day", "Sale"]],
          list: [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch sales summary:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div style={{ display: "flex", color: "#333", marginBottom: "10px", marginRight:"10px"}}>
  <h1 style={{marginRight:"20px" , fontWeight:"bold"}}> Customer Performance Chart</h1>
  {/* <span>Subtitle or Other Content</span> */}

     <Space>

      <DatePicker.RangePicker
            value={[filter.from_date,filter.to_date]}
            loading={true}
            allowClear={false}
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
          <Select
          allowClear
          placeholder="Select Category"
          value={filter.category_id}
          options={config?.category}
          onChange={(value) => {
            setFilter((prev) => ({
              ...prev,
              category_id : value
              // Update to_date in the filter
             
            }));
            
          }}
          
          />
           
          <Button onClick={onreset}>
  Reset Filters
</Button>

          <Button type="primary" onClick={()=>getList()}>Filter</Button>
           </Space>
        </div>
    {state.Data_Chat.length > 1 ? (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={state.Data_Chat}
      options={options}
      legendToggle
    />
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
      No data available for the selected filters.
    </div>
  )}
       

      <div style={{ width: "100%", marginTop: "20px" }}>
      <Table 
      
  style={{
    width: "100vw", // Full viewport width
    height: "100vh", // Full viewport height
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    boxSizing: "border-box",
  }}
  dataSource={state.list}
  columns={[
    {
      key: "title",
      title: "Customer Date",
      dataIndex: "title",
      render: (value) => (
        <Tag color="blue" style={{ fontSize: "14px" }}>
          {value}
        </Tag>
      ),
    },
   
    {
      key: "totalamount",
      title: "Total Amount",
      dataIndex: "total_amount",
      render: (value) => (
        <div>
        <Tag
        color={value > 10 ? "green"  : "pink"}
        style={{ fontSize: "14px" }}
      >
        {value} Pcs
      </Tag>
      </div>
      
      ),
    },
  ]}
  pagination={false}
 
/>


      </div>
    </div>
  );
}

export default ReportCustomer_Summary;
