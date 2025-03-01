const { validate_token } = require("../controller/auth.controller");
const {
  getList,
  create,
  update,
  remove,
} = require("../controller/customer.controller");
module.exports = (app) => {
 // In your backend file (e.g., server.js or routes.js)
app.get("/api/customer/:id",validate_token(),getList);

  app.post("/api/customer", validate_token(), create);
  app.put("/api/customer", validate_token(), update);
  app.delete("/api/customer", validate_token(), remove);
};
