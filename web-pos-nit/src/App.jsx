import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import LogingPage from "./page/auth/LogingPage";
import RegisterPage from "./page/auth/RegisterPage";
import MainLayout from "./component/layout/MainLayout";
import MainLayoutAuth from "./component/layout/MainLayoutAuth";
import EmployeePage from "./page/employee/EmployeePage";
import CustomerPage from "./page/customer/CustomerPage";
import CategoryPage from "./page/category/CategoryPage";
import UserPage from "./page/user/UserPage";
import RolePage from "./page/role/RolePage";
import SupplierPage from "./page/purchase/SupplierPage";
import ProductPage from "./page/product/ProductPage";
import ExpanseTypePage from "./page/expanse/ExpanseTypePage";
import ExpansePage from "./page/expanse/ExpansePage";
import PosPage from "./page/pos/PosPage";
import OrderPage from "./page/orderPage/OrderPage";
import ReportSale_Summary from "./page/report/ReportSale_Summary";
import ReportExpense_Summary from "./page/report/ReportExpense_Summary";
import ReportCustomer_Summary from "./page/report/ReportCustomer_Summary";
import ReportPurchase_Summary from "./page/report/ReportPurchase_Summary";
import CurrencyList from "./page/currency/CurrencyPage";
import Top_Sales from "./page/top_sale/Top_Sales";
import StockInPage from "./page/stock/InStock";
// import List_StockOut from "./page/stock/List_StockOut";
import StockOutPage from "./page/stock/StockOutPage";
import AdminStockTransfer from "./page/admin/admin_stock_transfer";
import Stock_UserPage from "./page/product/Stock_User";
import Total_DuePage from "./page/total_due/Total_DuePage";
import Bighome from "./page/home/Bighome";
import InvoiceCar from "./component/pos/PrintCarinvoice";


function App() {
  const MainLayoutWrapper = () => (
  <MainLayoutAuth>
    <Outlet />
  </MainLayoutAuth>
);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Bighome/>}> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/customer" element={<CustomerPage />} />
          {/* <Route path="/invoices" element={<InvoicesPage />} /> */}
          <Route path="/invoices" element={<PosPage />} />
          <Route path="/invoicecar" element={<InvoiceCar />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/stockUser" element={<Stock_UserPage />} />
          <Route path="/role" element={<RolePage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/total_due" element={<Total_DuePage />} />
          
          <Route path="/expanse_type" element={<ExpanseTypePage />} />
          <Route path="/expanse" element={<ExpansePage />} />
          <Route path="/report_Sale_Summary" element={<ReportSale_Summary />} />
          <Route path="/report_Expense_Summary" element={<ReportExpense_Summary/>} />
          <Route path="/report_Customer" element={<ReportCustomer_Summary/>} />
          <Route path="/purchase_Summary" element={<ReportPurchase_Summary/>} />
          <Route path="/Currency" element={<CurrencyList/>} />
          <Route path="/Top_Sale" element={<Top_Sales/>} />
          <Route path="/adminStockTransfer" element={<AdminStockTransfer/>} />
          {/* <Route path="/List_stock" element={<List_StockOut/>} /> */}
          <Route path="/stock_in" element={<StockInPage/>} />
          <Route path="/stock_out" element={<StockOutPage/>} />
          

          <Route path="*" element={<h1>404-Route Not Found!</h1>} />
        </Route>
        {/* </Route> */}
     

        <Route element={<MainLayoutAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// import { Routes, Route } from "react-router-dom";
// import MainLayoutAuth from "./MainLayoutAuth";
// import HomePage from "./HomePage";
// import LogingPage from "./LogingPage"; // Assuming this is a typo, should be "LoginPage"
// import RegisterPage from "./RegisterPage";
// import { Outlet } from "react-router-dom"; 

// const MainLayoutWrapper = () => (
//   <MainLayoutAuth>
//     <Outlet />
//   </MainLayoutAuth>
// );

// function App() {
//   return (
//     <Routes>
//       <Route element={<MainLayoutWrapper />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LogingPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

