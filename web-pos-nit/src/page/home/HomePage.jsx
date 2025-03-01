import { useEffect, useState } from "react";
import { request } from "../../util/helper";
import HomeGrid from "../../component/home/HomeGrid";
import HomeSaleChart from "../../component/home/HomeSaleChart";
import HomePurchaseChart from "../../component/home/HomePurchaseChart";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [dashboard, setDashboard] = useState([]);
  const [saleBymonth, setSalebyMonth] = useState([]);
  const [expenseBymonth, setExpensByMonth] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
        getList();
 
  }, []);

  const getList = async () => {
    const res = await request("dashbaord", "get");
    if (res && !res.error) {
      setDashboard(res.dashboard);
      if (res.Sale_Summary_By_Month) {
        let dataTmp = [["Month", "Sale"]];

        res.Sale_Summary_By_Month.forEach((item) => {
          dataTmp.push([item.title + "", Number(item.total) || 0]);
        });
        setSalebyMonth(dataTmp);
      }
      if (res.Expense_Summary_By_Month) {
        let dataTmp = [["Month", "Sale"]];

        res.Expense_Summary_By_Month.forEach((item) => {
          dataTmp.push([item.title + "", Number(item.total) || 0]);
        });
        setExpensByMonth(dataTmp);
      }
    }
  };
  return (
    <div>
      <HomeGrid data={dashboard} />
      <HomeSaleChart data={saleBymonth} />
      <HomePurchaseChart data={expenseBymonth} />
    </div>
  );
}
export default HomePage;




