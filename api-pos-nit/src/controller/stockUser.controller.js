const { db, isArray, isEmpty, logError } = require("../util/helper");



exports.getStockByUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const sqlQuery = `
      SELECT 
        us.id, us.user_id, us.product_id, us.category_id, us.qty, us.barcode, 
        us.brand, us.description, us.price, us.discount, us.status, us.image, 
        us.create_by, us.create_at, us.unit, us.unit_price, us.last_updated,
        u.name AS user_name, p.name AS product_name, c.name AS category_name
      FROM user_stock us
      JOIN users u ON us.user_id = u.id
      JOIN product p ON us.product_id = p.id
      JOIN category c ON us.category_id = c.id
      WHERE us.user_id = ?;
    `;

    const [stockList] = await db.query(sqlQuery, [user_id]);

    res.json({ list: stockList });
  } catch (error) {
    logError("user_stock.getStockByUser", error, res);
  }
};



exports.getList = async (req, res) => {
  try {
    const user_id = req.current_id; // Assuming `req.current_id` contains the logged-in user's ID

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const [list] = await db.query(`
      SELECT 
        us.id, 
        us.user_id, 
        us.create_by,  
        us.product_id, 
        p.name AS product_name, 
        us.qty, 
        us.last_updated, 
        us.category_id, 
        us.brand, 
        p.unit_price,
        p.discount,
        p.unit,
        p.barcode,  
        c.name AS category_name,
        (us.qty * p.unit_price) AS total_price
      FROM user_stock us
      JOIN product p ON us.product_id = p.id
      JOIN category c ON us.category_id = c.id
      WHERE us.user_id = :user_id  -- Filter by the logged-in user's ID
      ORDER BY us.id DESC;
    `, { user_id });

    res.json({
      i_know_you_are_id: user_id, // Return the user ID for reference
      list: list,
    });
  } catch (error) {
    logError("user_stock.getList", error, res);
  }
};

// exports.getList = async (req, res) => {
//   try {
//     const user_id = req.current_id; // Assuming this is securely set from authentication middleware

//     if (!user_id) {
//       return res.status(401).json({ error: "Unauthorized: User ID is required" });
//     }

//     const [list] = await db.query(
//       `SELECT 
//         us.id, 
//         us.user_id, 
//         us.create_by,  
//         us.product_id, 
//         p.name AS product_name, 
//         us.qty, 
//         us.last_updated, 
//         us.category_id, 
//         us.brand, 
//         p.unit_price,
//         p.discount,
//         p.unit,
//         p.barcode,  
//         c.name AS category_name,
//         (us.qty * p.unit_price) AS total_price
//       FROM user_stock us
//       JOIN product p ON us.product_id = p.id
//       JOIN category c ON us.category_id = c.id
//       WHERE us.user_id = ?  -- Use positional placeholder
//       ORDER BY us.id DESC;`,
//       [user_id] // Pass parameters as an array
//     );

//     res.json({
//       message: "User stock retrieved successfully",
//       user_id: user_id, // Useful for debugging
//       list: list,
//     });
//   } catch (error) {
//     logError("user_stock.getList", error, res);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.gettotal_due = async (req, res) => {
  try {
    // Fetch total due per customer
    const [list] = await db.query(`
      SELECT 
        o.customer_id, 
        c.name AS customer_name,
        u.branch_name AS branch_name,
        u.tel AS tel,
        r.name AS province_name,
        SUM(o.total_amount - o.paid_amount) AS total_due  -- Sum total_due for each customer
      FROM \`order\` o
      JOIN customer c ON o.customer_id = c.id
      JOIN user u ON o.user_id = u.id
      JOIN role r ON u.role_id = r.id
      WHERE (o.total_amount - o.paid_amount) > 0
      GROUP BY o.customer_id  -- Group by customer ID
      ORDER BY MAX(o.create_at) DESC; -- Order by latest order date
    `);

    res.json({
      i_know_you_are_id: req.current_id || null,
      list: list, // List contains unique customers with total due amount
    });
  } catch (error) {
    logError("user_stock.getList", error, res);
  }
};






