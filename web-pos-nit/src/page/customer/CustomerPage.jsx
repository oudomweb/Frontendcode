import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Table,
} from "antd";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import { getProfile} from "../../store/profile.store";

function CustomerPage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    txtSearch: "",
    user_id: null, 
  });
  useEffect(() => {
    const userId = getProfile();
    console.log("Fetched User ID from localStorage:", userId);
    if (userId) {
      setState((prev) => ({ ...prev, user_id: userId }));
    } else {
      message.error("No user ID found. Please log in again.");
    }
  }, []);
  useEffect(() => {
    if (state.user_id) {
      
      getList();
    }
  }, [state.user_id]);

  const getList = async () => {
    if (!state.user_id) {
      message.error("User ID is required!");
      return;
    }
    const param = {
      txtSearch: state.txtSearch || "",
    };
  
    try {
      const {id} = getProfile();
      if(!id) {
        return 
        }
      const res = await request(`customer/${id}`, "get", param);
     
   console.log(state.id)
      setLoading(false);
  
      if (res?.success) {   
        setList(res.list || []);
      } else {
        message.error(res?.message || "Failed to fetch customer list");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching customer list:", error);
      message.error("Failed to fetch customer list");
    }
  };
  const onClickAddBtn = () =>{
  }
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Customer Management</div>
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
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={list}
        columns={[
          {
            key: "no",
            title: "No",
            render: (_, __, index) => index + 1,
            width: 60,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
        ]}
      />
    </MainPage>
  );
}
export default CustomerPage;