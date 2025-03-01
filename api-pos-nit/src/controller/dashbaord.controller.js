const { db, isArray, isEmpty, logError } = require("../util/helper");

exports.getList = async (req, res) => {
  try {
    const [customer] = await db.query("SELECT COUNT(id) AS total FROM customer");
    const [employee] = await db.query("SELECT COUNT(id) AS total FROM employee");
    const [expanse] = await db.query("SELECT "+
    "COALESCE(SUM(amount), 0) AS total, "+
    "COUNT(id) AS total_expense "+
    " FROM expense "+
    " WHERE "+
    "MONTH(expense_date) = MONTH(CURRENT_DATE()) "+
    "AND YEAR(expense_date) = YEAR(CURRENT_DATE());");
    const [sale] = await db.query("SELECT "+
    "CONCAT(COALESCE(SUM(r.total_amount), 0), '$') AS total, "+
    "COUNT(r.id) AS total_order "+
    "FROM `order` r "+
    "WHERE MONTH(r.create_at) = MONTH(CURRENT_DATE()) "+
    "AND YEAR(r.create_at) = YEAR(CURRENT_DATE());");

const [Sale_Summary_By_Month] = await db.query(
        "SELECT "+
    "DATE_FORMAT(r.create_at, '%M') AS title, "+
    "SUM(r.total_amount) AS total "+
    "FROM  "+
    "`order` r "+
    "WHERE  "+
    "YEAR(r.create_at) = YEAR(CURRENT_DATE) "+
    "GROUP BY  "+
    "MONTH(r.create_at)"
);
const [Expense_Summary_By_Month] = await db.query(
  "SELECT "+
"DATE_FORMAT(r.expense_date, '%M') AS title, "+
"SUM(r.amount) AS total "+
"FROM  "+
"`expense` r "+
"WHERE  "+
"YEAR(r.expense_date) = YEAR(CURRENT_DATE) "+
"GROUP BY  "+
"MONTH(r.expense_date)"
);


    let dashboard = [
      { 
        title: "Customer",
        Summary : {
          Total : customer[0].total,
          Male : 1,
          Female : 2
        }
      },
      { 
        title: "Employee",
     
        Summary : {
          Total : employee[0].total,
          Male : 1,
          Female : 2
        }
      },
      {
        title: "Expanse",
        Summary:{
          Expense : "This Month",
          Total: expanse[0].total + "$",
          Total_Expense : expanse[0].total_expense
        }
       
      },
      {

        title: "Sale",
        Summary : {
          Sale : "This Month",
          Total: sale[0].total,
          Total_Order : sale[0].total_order
        }
      
      }
    ];
    
    res.json({
      dashboard,
      Sale_Summary_By_Month,
      Expense_Summary_By_Month
    });
    
  } catch (error) {
    logError("Dashbaord.getList", error, res);
  }
};

