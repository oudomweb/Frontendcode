const { db, isArray, isEmpty, logError } = require("../util/helper");
// exports.getOne = async (req, res) => {
//   try {
//     const { id: user_id } = req.params; // Extract user_id from URL

//     if (!user_id) {
//       return res.status(400).json({
//         success: false,
//         message: "user_id is required",
//       });
//     }

//     console.log("Fetching customer for user_id:", user_id);

//     // 🔥 Fetch user role from `user` table
//     const [user] = await db.query("SELECT role_id FROM user WHERE id = :user_id", { user_id });

//     if (!user.length) {
//       console.error("User not found:", user_id);
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const role_id = user[0].role_id;
//     console.log("User role_id:", role_id);

//     // ✅ Fetch customer by user_id (role_id removed for now)
//     const [customer] = await db.query(
//       "SELECT * FROM customer WHERE user_id = :user_id LIMIT 1",
//       { user_id }
//     );

//     if (!customer.length) {
//       console.error("Customer not found for user_id:", user_id);
//       return res.status(404).json({
//         success: false,
//         message: "Customer not found",
//       });
//     }

//     console.log("Customer found:", customer[0]);

//     res.json({
//       success: true,
//       customer: customer[0], // Return the first found customer
//     });
//   } catch (error) {
//     console.error("Error in customer.getOne:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching the customer",
//       error: error.message, // Send the actual error for debugging
//     });
//   }
// };

exports.getList = async (req, res) => {
  try {
    const { txtSearch } = req.query;
    const { id: user_id } = req.params; // Get user_id from URL parameter

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: " b user_id is required",
      });
    }

    // ✅ Get customers only created by this user
    let sql = "SELECT * FROM customer WHERE user_id = :user_id";
    const params = { user_id };
// console.log(user_id);
    if (txtSearch) {
      sql += " AND (name LIKE :txtSearch OR tel LIKE :txtSearch OR email LIKE :txtSearch)";
      params.txtSearch = `%${txtSearch}%`;
    }

    const [list] = await db.query(sql, params);

    res.json({
      success: true,
      list,
    });
  } catch (error) {
    logError("customer.getlist", error, res);
  }
};





// id,name,code,tel,email,address,website,note,create_by,create_at
// id,:name,:code,:tel,:email,:address,:website,:note,:create_by,:create_at
exports.create = async (req, res) => {
  try {
    // Validate required fields
    const { name, tel, email, address, type } = req.body;
    if (!name || !tel || !email || !address || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, tel, email, address, type",
      });
    }

    // Construct SQL query
    const sql = `
      INSERT INTO customer_seller (name, tel, email, address, type, create_by, user_id)
      VALUES (:name, :tel, :email, :address, :type, :create_by, :user_id)
    `;

    // Prepare parameters
    const params = {
      name,
      tel,
      email,
      address,
      type,
      create_by: req.auth?.name || "system", // Default to "system" if create_by is not available
      user_id: req.auth?.id || null, // Ensure user_id is included
    };

    // Execute query
    const [data] = await db.query(sql, params);

    // Send success response
    res.status(201).json({
      success: true,
      data: data,
      message: "Customer created successfully!",
    });
  } catch (error) {
    // Log and handle errors
    console.error("Error in customer.create:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the customer.",
      error: error.message, // Include error message for debugging (remove in production)
    });
  }
};

exports.update = async (req, res) => {
  try {
    var sql =
      "UPDATE  customer set name=:name, code=:code, tel=:tel, email=:email, address=:address, website=:website, note=:note WHERE id=:id ";
    var [data] = await db.query(sql, {
      ...req.body,
    });
    res.json({
      data: data,
      message: "Update success!",
    });
  } catch (error) {
    logError("customer.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    var [data] = await db.query("DELETE FROM customer WHERE id = :id", {
      ...req.body,
    });
    res.json({
      data: data,
      message: "Data delete success!",
    });
  } catch (error) {
    logError("customer.remove", error, res);
  }
};
