const { validate_token } = require("../controller/auth.controller");
const {
  getStockByUser,
  gettotal_due,
 
} = require("../controller/stockUser.controller");
module.exports = (app) => {
  app.get("/api/stockUser", validate_token(), getStockByUser);
  app.get("/api/gettotal_due", validate_token(), gettotal_due);

};
