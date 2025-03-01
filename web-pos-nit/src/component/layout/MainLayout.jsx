import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu, Tag, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import logo from "../../assets/petronas.png";
import ImgUser from "../../assets/profile.png";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import {
  getPermission,
  getProfile,
  setAcccessToken,
  setProfile,
} from "../../store/profile.store";
import { request } from "../../util/helper";
import { configStore } from "../../store/configStore";
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  ShopOutlined,
  FileProtectOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  CreditCardOutlined,
  SmileOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
<div>
<Tag>V 1.0.1</Tag>
</div>


const items_menu = [
  {
    key: "version",
    label: <Tag color="green">V 1.0.1</Tag>,
    disabled: true,
    className: "version-item",
  },
  {
    key: "",
    label: "Dashboard",
    icon: <PieChartOutlined/>,
    className: "dashboard-item",
  },
  {
    key: "invoices",
    label: "Invoices",
    icon: <DesktopOutlined />,
    className: "invoices-item",
  },
  {
    key: "order",
    label: "Invoices Detail",
    icon: <FileOutlined />,
    className: "invoices-detail-item",
  },
  {
    key: "total_due",
    label: "Total Due",
    icon: <CreditCardOutlined />,
    className: "invoices-detail-item",
  },
  {
    label: "Product",
    icon: <ShopOutlined />,
    className: "product-menu",
    children: [
      {
        key: "product",
        label: "Warehouse",
        icon: <FileProtectOutlined />,
        className: "list-product-item",
      },
      {
        key: "stockUser",
        label: "User Stock",
        icon: <FileProtectOutlined />,
        className: "list-product-item",
      },
      {
        key: "category",
        label: "Category",
        icon: <SolutionOutlined />,
        className: "category-item",
      },
    ],
  },
  {
    label: "Purchase",
    icon: <ShoppingCartOutlined />,
    className: "purchase-menu",
    children: [
      {
        key: "supplier",
        label: "Supplier",
        icon: <UsergroupAddOutlined />,
        className: "supplier-item",
      },
    ],
  },
  {
    key: "customer",
    label: "Customer",
    icon: <UserOutlined />,
    className: "list-Customer-item", 
  },
  {
    label: "Expense",
    icon: <DollarOutlined />,
    className: "expense-menu",
    children: [
      {
        key: "expanse_type",
        label: "Expense Type",
        icon: <FileOutlined />,
        className: "expense-type-item", 
      },
      {
        key: "expanse",
        label: "Expense",
        icon: <DollarOutlined />,
        className: "expense-item", 
      },
    ],
  },
  {
    label: "Employee",
    icon: <UserOutlined />,
    className: "employee-menu",
    children: [
      {
        key: "employee",
        label: "Employee",
        icon: <UserOutlined />,
        className: "employee-item", 
      },
    ],
  },
  {
    label: "User",
    icon: <SolutionOutlined />,
    className: "user-menu", 
    children: [
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
        className: "user-item",
      },
      {
        key: "role",
        label: "Role",
        icon: <SafetyCertificateOutlined />,
        className: "role-item",
      },
    ],
  },
  {
    label: "Report",
    icon: <FileOutlined />,
    className: "report-menu",
    children: [
      {
        key: "report_Sale_Summary",
        label: "Sale Summary",
        icon: <PieChartOutlined />,
        className: "sale-summary-item", 
      },
      {
        key: "report_Expense_Summary",
        label: "Expense Summary",
        icon: <DollarOutlined />,
        className: "expense-summary-item", 
      },
      {
        key: "purchase_Summary",
        label: "Purchase Summary",
        icon: <ShoppingCartOutlined />,
        className: "purchase-summary-item", 
      },
      {
        key: "report_Customer",
        label: "New Customer Summary",
        icon: <UserOutlined />,
        className: "new-customer-summary-item", 
      },
      {
        key: "Top_Sale",
        label: "Top Sale",
        icon: <TrophyOutlined />,
        className: "top-sale-item", 
      },
    ],
  },
];
const MainLayout = () => {
  const permision = getPermission();
  const { setConfig } = configStore();
  const [items,setItems] = useState(items_menu);
  const profile = getProfile();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    checkISnotPermissionViewPage();
    getConfig();
    if (!profile) {
      navigate("/login");
    }
  }, []);
  const checkISnotPermissionViewPage =()=>{
    let findIndex = permision?.findIndex(
      (item) =>item.web_route_key == location.pathname
    );
    if (findIndex == -1) {
      for (let i = 0; i < permision.length; i++) {
       navigate(permision[i].web_route_key);
       break;
        
      }
    }
  }

  const getMenuByUser =() =>{
    let new_items_menu = [];
    items_menu?.map((item1)=>{
      const p1 = permision?.findIndex(
        (data1) => data1.web_route_key == "/"+item1.key
      );
      if (p1 != -1){
        new_items_menu.push(item1);
      }
      if (item1?.children && item1?.children.length > 0) {
        let childTmp = [];
        item1?.children.map((data1)=>{
          permision?.map((data2) =>{
            if (data2.web_route_key == "/" + data1.key) {
              childTmp.push(data1);
            }
          });
        });
        if(childTmp.length > 0){
          item1.children = childTmp;
          new_items_menu.push(item1);
        }
      }
    })
    setItems(new_items_menu)
  }

  const getConfig = async () => {
    const res = await request("config", "get");
    if (res) {
      setConfig(res);
    }
  };

  const onClickMenu = (item) => {
    navigate(item.key);
  };
  const onLoginOut = () => {
    setProfile("");
    setAcccessToken("");
    navigate("/login");
  };

  if (!profile) {
    return null;
  }

  const itemsDropdown = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          changs your password
        </a>
      ),
      icon: <SmileOutlined/>,
      disabled: true,
    },
    {
      key: "logout",
      danger: true,
      label: "Logout",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      
      <Sider


        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
  theme="dark"
  defaultSelectedKeys={["1"]}
  mode="inline"
  items={items}
  onClick={onClickMenu}
/>

      </Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            
          <div className="flex flex-col items-start space-y-1">
  <div className="flex items-center gap-2">
    <img
      src={logo}
      alt="Company Logo"
      className="w-50 h-12 object-contain filter brightness-0 invert"
    />
   <h1 className="text-2xl font-bold text-white font-sans text-left">
  PETRONAS CAMBODIA CO., LTD
</h1>

  </div>
  <div className="text-white text-sm">
    <div className="khmer-text font-semibold text-white">
      សាខា: {profile?.branch_name}
    </div>
    <div className="khmer-text text-white">
      អាសយដ្ឋាន: {profile?.address}
    </div>
  </div>
</div>
          </div>
          <div className="admin-header-g2">
            <MdOutlineMarkEmailUnread className="icon-email" />
            <div>
              <div className="txt-username">{profile?.name}</div>
              <div>{profile?.role_name}</div>
            </div>
            <Dropdown
              menu={{
                items: itemsDropdown,
                onClick: (event) => {
                  if (event.key == "logout") {
                    onLoginOut();
                  }
                },
              }}
            >
              <img className="img-user" src={ImgUser} alt="Logo" />
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            className="admin-body"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;