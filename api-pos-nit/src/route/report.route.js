const { validate_token } = require("../controller/auth.controller");
const report = require("../controller/report.controller");
module.exports = (app) => {
  app.get("/api/report_Sale_Sammary", validate_token(),report.report_Sale_Summary);
  app.get("/api/report_Expense_Summary", validate_token(),report.report_Expense_Summary);
  app.get("/api/report_Customer", validate_token(),report.report_Customer);
  app.get("/api/report_Purchase_Summary", validate_token(),report.report_Purchase_Summary);
  app.get("/api/top_sales", validate_token(),report.top_sale);
  

  
 
};
  