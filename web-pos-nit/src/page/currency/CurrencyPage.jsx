import React, { useEffect, useState } from "react";
import { Table, Tag, Spin, Alert } from "antd";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";

function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
   getList();
  }, []);
  const getList = async()=>{
    const res = await request ("currency","get")
    if(res){
        setCurrencies();
    }
 }
  return (
    <MainPage>
        <Table 
        dataSource={currencies}
        columns={[
            {
                key:"NO",
                title:"No",
                dataIndex:"id"
            },
            {
                key:"code",
                title:"Code",
                dataIndex:"code"
            }
        ]}
        >
        </Table>
    </MainPage>
  );
}

export default CurrencyList;
