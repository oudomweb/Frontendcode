const { db, isArray, isEmpty, logError } = require("../util/helper");



// exports.getList = async (req, res) => {
//   try {

//     var from_date = req.query.from_date;
//     var to_date = req.query.to_date;
//     var txtSearch = req.query.txtSearch;
//     var sqlSelect = "SELECT o.*, c.name AS customer_name, c.tel AS customer_tel, c.address AS customer_address ";
//     var sqlJoin = " FROM `order` o LEFT JOIN customer c ON o.customer_id = c.id ";
//     var sqlWhere = " WHERE true "; // Ensure spacing

//     if (!isEmpty(from_date) && isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') >= :from_date `;
//     } else if (!isEmpty(from_date) && !isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') BETWEEN :from_date AND :to_date `;
//     } else if (isEmpty(from_date) && !isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') <= :to_date `;
//     }


//     const sqlParams = {
//       txtSearch: "%" + txtSearch + "%",
//       from_date: from_date,
//       to_date: to_date
//     };
//     if (!isEmpty(txtSearch)) {
//       sqlWhere += " AND o.order_no LIKE :txtSearch "; // Use `?` for parameterized queries


//     }

//     var sqlList = sqlSelect + sqlJoin + sqlWhere;
//     var sqlSummary = "SELECT COUNT(o.id) AS total_order, COALESCE(SUM(o.total_amount), 0) AS total_amount " + sqlJoin + sqlWhere;

//     // Execute queries
//     const [list] = await db.query(sqlList, sqlParams);
//     const [summaryArray] = await db.query(sqlSummary, sqlParams);

//     // Extract first item from summary array
//     const summary = summaryArray?.[0] || { total_order: 0, total_amount: 0 };

//     // Return JSON response
//     res.json({
//       list: list,
//       summary: summary, // Ensure summary is an object, not an array
//     });
//   } catch (error) {
//     logError("order.getList", error, res);
//   }
// };
// exports.getList = async (req, res) => {
//   try {
//     var from_date = req.query.from_date;
//     var to_date = req.query.to_date;
//     var txtSearch = req.query.txtSearch;
    
//     var sqlSelect = "SELECT o.*, c.name AS customer_name, c.tel AS customer_tel, c.address AS customer_address ";
//     var sqlJoin = " FROM `order` o LEFT JOIN customer c ON o.customer_id = c.id ";
//     var sqlWhere = " WHERE true "; // Ensure spacing

//     if (!isEmpty(from_date) && isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') >= :from_date `;
//     } else if (!isEmpty(from_date) && !isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') BETWEEN :from_date AND :to_date `;
//     } else if (isEmpty(from_date) && !isEmpty(to_date)) {
//       sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') <= :to_date `;
//     }

//     const sqlParams = {
//       txtSearch: "%" + txtSearch + "%",
//       from_date: from_date,
//       to_date: to_date
//     };

//     if (!isEmpty(txtSearch)) {
//       sqlWhere += " AND o.order_no LIKE :txtSearch ";
//     }

//     // Append ORDER BY to sort by create_at in descending order
//     var sqlList = sqlSelect + sqlJoin + sqlWhere + " ORDER BY o.create_at DESC";
//     var sqlSummary = "SELECT COUNT(o.id) AS total_order, COALESCE(SUM(o.total_amount), 0) AS total_amount " 
//       + sqlJoin + sqlWhere; // No need for ORDER BY in summary queries

//     // Execute queries
//     const [list] = await db.query(sqlList, sqlParams);
//     const [summaryArray] = await db.query(sqlSummary, sqlParams);

//     // Extract first item from summary array
//     const summary = summaryArray?.[0] || { total_order: 0, total_amount: 0 };

//     // Return JSON response
//     res.json({
//       list: list,
//       summary: summary, // Ensure summary is an object, not an array
//     });
//   } catch (error) {
//     logError("order.getList", error, res);
//   }
// };
exports.getList = async (req, res) => {
  try {
    var from_date = req.query.from_date;
    var to_date = req.query.to_date;
    var txtSearch = req.query.txtSearch;
    var user_id = req.query.user_id;

    var sqlSelect = `
      SELECT o.*, c.name AS customer_name, c.tel AS customer_tel, c.address AS customer_address 
    `;
    var sqlJoin = `
      FROM \`order\` o 
      LEFT JOIN customer c ON o.customer_id = c.id 
    `;
    var sqlWhere = " WHERE true "; // Ensure spacing

    if (!isEmpty(from_date) && isEmpty(to_date)) {
      sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') >= :from_date `;
    } else if (!isEmpty(from_date) && !isEmpty(to_date)) {
      sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') BETWEEN :from_date AND :to_date `;
    } else if (isEmpty(from_date) && !isEmpty(to_date)) {
      sqlWhere += ` AND DATE_FORMAT(o.create_at, '%Y-%m-%d') <= :to_date `;
    }

    if (!isEmpty(txtSearch)) {
      sqlWhere += " AND o.order_no LIKE :txtSearch ";
    }

    if (!isEmpty(user_id)) {
      sqlWhere += " AND o.user_id = :user_id ";
    }

    const sqlParams = {
      txtSearch: "%" + txtSearch + "%",
      from_date: from_date,
      to_date: to_date,
      user_id: user_id,
    };

    var sqlList = sqlSelect + sqlJoin + sqlWhere + " ORDER BY o.create_at DESC";
    var sqlSummary = `
      SELECT COUNT(o.id) AS total_order, COALESCE(SUM(o.total_amount), 0) AS total_amount 
      ${sqlJoin} ${sqlWhere}
    `;

    const [list] = await db.query(sqlList, sqlParams);
    const [summaryArray] = await db.query(sqlSummary, sqlParams);

    const summary = summaryArray?.[0] || { total_order: 0, total_amount: 0 };

    res.json({
      list: list,
      summary: summary,
    });
  } catch (error) {
    logError("order.getList", error, res);
  }
};


exports.getone = async (req, res) => {
  try {

    var sql = `
      SELECT 
        od.*, 
        p.name AS p_name, 
        p.brand AS p_brand, 
        p.description AS p_des, 
        p.image AS p_image,
        c.name AS p_category_name 
      FROM order_detail od
      INNER JOIN product p ON od.product_id = p.id  -- Ensure 'product_id' exists in 'order_detail'
      INNER JOIN category c ON p.category_id = c.id 
      WHERE od.order_id = ?`;

    const [list] = await db.query(sql, [req.params.id]); // Fixed parameter handling
    res.json({ list });
  } catch (error) {
    logError("order.getone", error, res);
  }
};




// exports.create = async (req, res) => {
//   try {
//     var { order, order_details = [] } = req.body;
//     // validate data
//     order = {
//       ...order,
//       order_no: await newOrderNo(), // gener order_no
//       user_id: req.auth?.id, // currect access
//       create_by: req.auth?.name, // currect access
//     };
//     var sqlOrder =
//       "INSERT INTO `order` (order_no,total_amount,remark,user_id,create_by) VALUES (:order_no,:total_amount,,:remark,:user_id,:create_by) ";
//     var [data] = await db.query(sqlOrder, order);

//     order_details.map(async (item, index) => {
//       // order product
//       var sqlOrderDetails =
//         "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total) VALUES (:order_id,:proudct_id,:qty,:price,:discount,:total) ";
//       var [dataOrderProduct] = await db.query(sqlOrderDetails, {
//         ...item,
//         order_id: data.insertId, // overrid key order_id
//       });

//       // re stock
//       var sqlReStock =
//         "UPDATE product SET qty = (qty-:order_qty) WHERE id = :proudct_id ";
//       var [dataRestock] = await db.query(sqlReStock, {
//         order_qty: item.qty,
//         proudct_id: item.proudct_id,
//       });
//     });
//     const [currentOrder] = await db.query(
//       "select * from `order` where id=:id",
//       {
//         id: data.insertId,
//       }
//     );
//     res.json({
//       order: currentOrder.length > 0 ? currentOrder[0] : null,
//       order_details: order_details,
//       message: "Insert success!",
//     });
//   } catch (error) {
//     logError("order.create", error, res);
//   }
// };






// exports.create = async (req, res) => {
//   try {
//     var { order, order_details = [] } = req.body;
//     // validate data
//     order = {
//       ...order,
//       order_no: await newOrderNo(), // gener order_no
//       user_id: req.auth?.id, // currect access
//       create_by: req.auth?.name, // currect access
//     };
//     var sqlOrder =
//       "INSERT INTO `order` (order_no,customer_id,total_amount,paid_amount,payment_method,remark,user_id,create_by) VALUES (:order_no,:customer_id,:paid_amount,:payment_method,:total_amount,:remark,:user_id,:create_by) ";
//     var [data] = await db.query(sqlOrder, order);

//     order_details.map(async (item, index) => {
//       // // order product
//       var sqlOrderDetails =
//         "INSERT INTO order_detail (order_id,product_id,qty,price,discount,total) VALUES (:order_id,:proudct_id,:qty,:price,:discount,:total) ";
//       var [dataOrderProduct] = await db.query(sqlOrderDetails, {
//         ...item,
//         order_id: data.insertId, // overrid key order_id
//       });

//       // re stock
//       var sqlReStock =
//         "UPDATE product SET qty = (qty-:order_qty) WHERE id = :proudct_id ";
//       var [dataRestock] = await db.query(sqlReStock, {
//         order_qty: item.qty,
//         proudct_id: item.proudct_id,
//       });
//     });
//     const [currentOrder] = await db.query(
//       "select * from `order` where id=:id",
//       {
//         id: data.insertId,
//       }
//     );
//     res.json({
//       order: currentOrder.length > 0 ? currentOrder[0] : null,
//       order_details: order_details,
//       message: "Insert success!",
//     });
//   } catch (error) {
//     logError("order.create", error, res);
//   }
// };


// const db = require("./db"); // Ensure you have the correct database module

// exports.create = async (req, res) => {
//   try {
//     const { order, order_details = [] } = req.body;

//     // Validate required fields
//     if (!order.customer_id || !order.total_amount || !order.paid_amount || !order.payment_method) {
//       return res.status(400).json({ error: "Missing required fields in order" });
//     }

//     if (!order_details.length) {
//       return res.status(400).json({ error: "Order details cannot be empty" });
//     }

//     // Insert order into the `order` table
//     const sqlOrder = `
//       INSERT INTO \`order\` 
//         (customer_id, total_amount, paid_amount, payment_method, remark, user_id, create_by) 
//       VALUES 
//         (:customer_id, :total_amount, :paid_amount, :payment_method, :remark, :user_id, :create_by)
//     `;
//     const [orderResult] = await db.query(sqlOrder, {
//       ...order,
//        order_no: await newOrderNo(),
//       user_id: req.auth?.id || null, // Add user_id if available
//       create_by: req.auth?.name || "System", // Add create_by if available
//     });

//     // Insert order details into the `order_detail` table
//     const sqlOrderDetails = `
//       INSERT INTO order_detail 
//         (order_id, product_id, qty, price, discount, total) 
//       VALUES 
//         (:order_id, :product_id, :qty, :price, :discount, :total)
//     `;
//     await Promise.all(
//       order_details.map(async (item) => {
//         await db.query(sqlOrderDetails, {
//           ...item,
//           order_id: orderResult.insertId, // Link to the newly created order
//         });

//         // Update product stock (if applicable)
//         const sqlUpdateStock = `
//           UPDATE product 
//           SET qty = qty - :qty 
//           WHERE id = :product_id
//         `;
//         await db.query(sqlUpdateStock, {
//           qty: item.qty,
//           product_id: item.product_id,
//         });
//       })
//     );

//     // Fetch the newly created order
//     const [currentOrder] = await db.query(
//       "SELECT * FROM `order` WHERE id = :id",
//       { id: orderResult.insertId }
//     );

//     // Return success response
//     res.json({
//       order: currentOrder.length > 0 ? currentOrder[0] : null,
//       order_details: order_details,
//       message: "Order created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// };


// exports.create = async (req, res) => {
//   try {
//     const { order, order_details = [] } = req.body;

//     // Validate required fields
//     if (!order.customer_id || !order.total_amount || !order.paid_amount || !order.payment_method) {
//       return res.status(400).json({ error: "Missing required fields in order" });
//     }

//     if (!order_details.length) {
//       return res.status(400).json({ error: "Order details cannot be empty" });
//     }

//     // Generate order number
//     const order_no = await newOrderNo();

//     // Insert order into the `order` table
//     const sqlOrder = `
//       INSERT INTO \`order\` 
//         (order_no, customer_id, total_amount, paid_amount, payment_method, remark, user_id, create_by) 
//       VALUES 
//         (:order_no, :customer_id, :total_amount, :paid_amount, :payment_method, :remark, :user_id, :create_by)
//     `;
//     const [orderResult] = await db.query(sqlOrder, {
//       ...order,
//       order_no: order_no, // Include the generated order number
//       user_id: req.auth?.id || null, // Add user_id if available
//       create_by: req.auth?.name || "System", // Add create_by if available
//     });

//     // Insert order details into the `order_detail` table
//     const sqlOrderDetails = `
//       INSERT INTO order_detail 
//         (order_id, product_id, qty, price, discount, total) 
//       VALUES 
//         (:order_id, :product_id, :qty, :price, :discount, :total)
//     `;
//     await Promise.all(
//       order_details.map(async (item) => {
//         await db.query(sqlOrderDetails, {
//           ...item,
//           order_id: orderResult.insertId, // Link to the newly created order
//         });

//         // Update product stock (if applicable)
//         const sqlUpdateStock = `
//           UPDATE product 
//           SET qty = qty - :qty 
//           WHERE id = :product_id
//         `;
//         await db.query(sqlUpdateStock, {
//           qty: item.qty,
//           product_id: item.product_id,
//         });
//       })
//     );

//     // Fetch the newly created order
//     const [currentOrder] = await db.query(
//       "SELECT * FROM `order` WHERE id = :id",
//       { id: orderResult.insertId }
//     );

//     // Return success response
//     res.json({
//       order: currentOrder.length > 0 ? currentOrder[0] : null,
//       order_details: order_details,
//       message: "Order created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// };
exports.create = async (req, res) => {
  try {
    const { order, order_details = [] } = req.body;

    // Validate required fields
    if (!order.customer_id || !order.total_amount || !order.paid_amount || !order.payment_method) {
      return res.status(400).json({ error: "Missing required fields in order" });
    }

    if (!order_details.length) {
      return res.status(400).json({ error: "Order details cannot be empty" });
    }

    // Generate order number
    const order_no = await newOrderNo();

    // Insert order into the `order` table
    const sqlOrder = `
      INSERT INTO \`order\` 
        (order_no, customer_id, total_amount, paid_amount, payment_method, remark, user_id, create_by) 
      VALUES 
        (:order_no, :customer_id, :total_amount, :paid_amount, :payment_method, :remark, :user_id, :create_by)
    `;
    const [orderResult] = await db.query(sqlOrder, {
      ...order,
      order_no: order_no, // Include the generated order number
      user_id: req.auth?.id || null, // Add user_id if available
      create_by: req.auth?.name || "System", // Add create_by if available
    });

    // Insert order details into the `order_detail` table
    const sqlOrderDetails = `
      INSERT INTO order_detail 
        (order_id, product_id, qty, price, discount, total) 
      VALUES 
        (:order_id, :product_id, :qty, :price, :discount, :total)
    `;
    
    await Promise.all(
      order_details.map(async (item) => {
        // Insert order detail
        await db.query(sqlOrderDetails, {
          ...item,
          order_id: orderResult.insertId, // Link to the newly created order
        });

        // Get product data before updating stock and user_stock
        const [productData] = await db.query(
          "SELECT * FROM product WHERE id = :product_id",
          { product_id: item.product_id }
        );
        
        if (productData.length === 0) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
        
        const product = productData[0];

        // Update product stock
        const sqlUpdateStock = `
          UPDATE product 
          SET qty = qty - :qty 
          WHERE id = :product_id
        `;
        await db.query(sqlUpdateStock, {
          qty: item.qty,
          product_id: item.product_id
        });

        // Update user_stock table with complete product information
        const sqlUpdateUserStock = `
          INSERT INTO user_stock (
            user_id, 
            product_id, 
            category_id, 
            qty, 
            barcode, 
            brand, 
            description, 
            price, 
            discount, 
            status, 
            image, 
            create_by, 
            create_at, 
            unit, 
            unit_price, 
            last_updated
          )
          VALUES (
            :user_id, 
            :product_id, 
            :category_id, 
            :qty, 
            :barcode, 
            :brand, 
            :description, 
            :price, 
            :discount, 
            :status, 
            :image, 
            :create_by, 
            NOW(), 
            :unit, 
            :unit_price, 
            NOW()
          )
          ON DUPLICATE KEY UPDATE 
            qty = qty + :qty, 
            last_updated = NOW(),
            barcode = :barcode,
            brand = :brand,
            description = :description,
            price = :price,
            discount = :discount,
            status = :status,
            image = :image,
            create_by = :create_by,
            create_at = NOW(),
            unit = :unit,
            unit_price = :unit_price;
        `;
        
        await db.query(sqlUpdateUserStock, {
          user_id: req.auth?.id || null,
          product_id: item.product_id,
          category_id: product.category_id, // Using category_id from product data
          qty: item.qty,
          barcode: product.barcode || "",
          brand: product.brand || "",
          description: product.description || "",
          price: item.price || product.price,
          discount: item.discount || product.discount || 0,
          status: product.status || "active",
          image: product.image || "",
          create_by: req.auth?.name || "System",
          unit: product.unit || "",
          unit_price: product.unit_price || 0
        });
      })
    );

    // Fetch the newly created order
    const [currentOrder] = await db.query(
      "SELECT * FROM `order` WHERE id = :id",
      { id: orderResult.insertId }
    );

    // Return success response
    res.json({
      order: currentOrder.length > 0 ? currentOrder[0] : null,
      order_details: order_details,
      message: "Order created successfully",
    });
  } catch (error) {
    logError("order.create", error, res);
  }
};




const newOrderNo = async (req, res) => {
  try {
    var sql =
      "SELECT " +
      "CONCAT('INV',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM `order`), 3, '0')) " +
      "as order_no";
    var [data] = await db.query(sql);
    return data[0].order_no;
  } catch (error) {
    logError("newOrderNo.create", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    var sql =
      "UPDATE  order set name=:name, code=:code, tel=:tel, email=:email, address=:address, website=:website, note=:note WHERE id=:id ";
    var [data] = await db.query(sql, {
      ...req.body,
    });
    res.json({
      data: data,
      message: "Update success!",
    });
  } catch (error) {
    logError("order.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    var [data] = await db.query("DELETE FROM order WHERE id = :id", {
      ...req.body,
    });
    res.json({
      data: data,
      message: "Data delete success!",
    });
  } catch (error) {
    logError("order.remove", error, res);
  }
};
