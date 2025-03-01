const {
  db,
  isArray,
  isEmpty,
  logError,
  removeFile,
} = require("../util/helper");

// exports.getList = async (req, res) => {
//   try {
//     var { txt_search, category_id, brand, page, is_list_all } = req.query;
//     const pageSize = 2; // fix
//     page = Number(page); // 1,2,3,4 from client
//     const offset = (page - 1) * pageSize; // find
//     var sqlSelect = "SELECT  p.*, c.name AS category_name ";
//     var sqlJoin =
//       " FROM product p INNER JOIN category c ON p.category_id = c.id  ";
//     var sqlWhere = " WHERE true ";
//     if (txt_search) {
//       sqlWhere += " AND (p.name LIKE :txt_search OR p.barcode = :barcode) ";
//     }
//     if (category_id) {
//       sqlWhere += " AND p.category_id = :category_id";
//     }
//     if (brand) {
//       sqlWhere += " AND p.brand = :brand";
//     }
//     var sqlLimit = " LIMIT " + pageSize + " OFFSET " + offset;
//     if (is_list_all) {
//       sqlLimit = "";
//     }
//     var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
//     var sqlparam = {
//       txt_search: "%" + txt_search + "%",
//       barcode: txt_search,
//       category_id,
//       brand,
//     };
//     const [list] = await db.query(sqlList, sqlparam);

//     var dataCount = 0;
//     if (page == 1) {
//       let sqlTotal = " SELECT COUNT(p.id) as total " + sqlJoin + sqlWhere;
//       var [dataCount] = await db.query(sqlTotal, sqlparam);
//       dataCount = dataCount[0].total;
//     }

//     res.json({
//       list: list,
//       total: dataCount,
//     });
//   } catch (error) {
//     logError("product.getList", error, res);
//   }
// };


// exports.getList = async (req, res) => {
//   try {
//     var { txt_search, category_id, brand, page, is_list_all } = req.query;
//     const pageSize = 2; // fix
//     page = Number(page); // 1,2,3,4 from client
//     const offset = (page - 1) * pageSize; // find

//     // Modified SQL query to include the total_price calculation
//     var sqlSelect = "SELECT p.*, c.name AS category_name, (p.qty * p.unit_price) AS total_price ";
//     var sqlJoin = " FROM product p INNER JOIN category c ON p.category_id = c.id  ";
//     var sqlWhere = " WHERE true ";

//     if (txt_search) {
//       sqlWhere += " AND (p.name LIKE :txt_search OR p.barcode = :barcode) ";
//     }
//     if (category_id) {
//       sqlWhere += " AND p.category_id = :category_id";
//     }
//     if (brand) {
//       sqlWhere += " AND p.brand = :brand";
//     }

//     var sqlLimit = " LIMIT " + pageSize + " OFFSET " + offset;
//     if (is_list_all) {
//       sqlLimit = "";
//     }

//     var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
//     var sqlparam = {
//       txt_search: "%" + txt_search + "%",
//       barcode: txt_search,
//       category_id,
//       brand,
//     };

//     const [list] = await db.query(sqlList, sqlparam);

//     var dataCount = 0;
//     if (page == 1) {
//       let sqlTotal = " SELECT COUNT(p.id) as total " + sqlJoin + sqlWhere;
//       var [dataCount] = await db.query(sqlTotal, sqlparam);
//       dataCount = dataCount[0].total;
//     }

//     res.json({
//       list: list,
//       total: dataCount,
//     });
//   } catch (error) {
//     logError("product.getList", error, res);
//   }
// };


// exports.getList = async (req, res) => {
//   try {
//     var { txt_search, category_id, brand, page, is_list_all } = req.query;
//     const pageSize = 2; // fix
//     page = Number(page); // 1,2,3,4 from client
//     const offset = (page - 1) * pageSize; // find

//     // Modified SQL query to include the total_price calculation with discount
//     // var sqlSelect = "SELECT p.*, c.name AS category_name, ";
//     // sqlSelect += "(p.qty * p.unit_price) AS original_price, ";
//     // sqlSelect += "(p.qty * p.unit_price) * (1 - p.discount / 100) AS total_price ";
//     var sqlSelect = "SELECT p.id, p.name, p.category_id, p.barcode, p.brand, p.description, p.qty, p.unit_price, p.discount, p.status, p.image, p.create_by, p.create_at, p.unit, c.name AS category_name, ";
//     sqlSelect += "(p.qty * p.unit_price) AS original_price, ";
//     sqlSelect += "(p.qty * p.unit_price) * (1 - p.discount / 100) AS total_price ";

//     var sqlJoin = " FROM product p INNER JOIN category c ON p.category_id = c.id  ";
//     var sqlWhere = " WHERE true ";

//     if (txt_search) {
//       sqlWhere += " AND (p.name LIKE :txt_search OR p.barcode = :barcode) ";
//     }
//     if (category_id) {
//       sqlWhere += " AND p.category_id = :category_id";
//     }
//     if (brand) {
//       sqlWhere += " AND p.brand = :brand";
//     }

//     var sqlLimit = " LIMIT " + pageSize + " OFFSET " + offset;
//     if (is_list_all) {
//       sqlLimit = "";
//     }

//     var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
//     var sqlparam = {
//       txt_search: "%" + txt_search + "%",
//       barcode: txt_search,
//       category_id,
//       brand,
//     };

//     const [list] = await db.query(sqlList, sqlparam);

//     var dataCount = 0;
//     if (page == 1) {
//       let sqlTotal = " SELECT COUNT(p.id) as total " + sqlJoin + sqlWhere;
//       var [dataCount] = await db.query(sqlTotal, sqlparam);
//       dataCount = dataCount[0].total;
//     }

//     res.json({
//       list: list,
//       total: dataCount,
//     });
//   } catch (error) {
//     logError("product.getList", error, res);
//   }
// };
// exports.getList = async (req, res) => {
//   try {
//     var { txt_search, category_id, brand, page, is_list_all } = req.query;
//     const pageSize = 2; // fix
//     page = Number(page); // 1,2,3,4 from client
//     const offset = (page - 1) * pageSize; // find

//     var sqlSelect = "SELECT p.id, p.name, p.category_id, p.barcode, p.brand, p.company_name, p.description, p.qty, p.unit_price, p.discount, p.status, p.image, p.create_by, p.create_at, p.unit, c.name AS category_name, ";
//     sqlSelect += "(p.qty * p.unit_price) AS original_price, ";
//     sqlSelect += "(p.qty * p.unit_price) * (1 - p.discount / 100) AS total_price ";

//     var sqlJoin = " FROM product p INNER JOIN category c ON p.category_id = c.id  ";
//     var sqlWhere = " WHERE true ";

//     if (txt_search) {
//       sqlWhere += " AND (p.name LIKE :txt_search OR p.barcode = :barcode) ";
//     }
//     if (category_id) {
//       sqlWhere += " AND p.category_id = :category_id";
//     }
//     if (brand) {
//       sqlWhere += " AND p.brand = :brand";
//     }
//     // if (company_name) {
//     //   sqlWhere += " AND p.company_name = :company_name";
//     // }

//     var sqlLimit = " LIMIT " + pageSize + " OFFSET " + offset;
//     if (is_list_all) {
//       sqlLimit = "";
//     }

//     var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
//     var sqlparam = {
//       txt_search: "%" + txt_search + "%",
//       barcode: txt_search,
//       category_id,
//       brand,
//     };

//     const [list] = await db.query(sqlList, sqlparam);

//     var dataCount = 0;
//     if (page == 1) {
//       let sqlTotal = " SELECT COUNT(p.id) as total " + sqlJoin + sqlWhere;
//       var [dataCount] = await db.query(sqlTotal, sqlparam);
//       dataCount = dataCount[0].total;
//     }

//     console.log(list); // Log the response to check if `name` is present

//     res.json({
//       list: list,
//       total: dataCount,
//     });
//   } catch (error) {
//     logError("product.getList", error, res);
//   }
// };


exports.getList = async (req, res) => {
  try {
    var { txt_search, category_id, brand, page, is_list_all, user_id } = req.query;
    const pageSize = 2; // Fixed page size
    page = Number(page); // Convert page to number
    const offset = (page - 1) * pageSize; // Calculate offset for pagination

    var sqlSelect = `
      SELECT 
        p.id, p.name, p.category_id, p.barcode, p.brand, p.company_name, 
        p.description, p.qty, p.unit_price, p.discount, p.status, p.image, 
        p.create_by, p.create_at, p.unit, 
        c.name AS category_name,
        (p.qty * p.unit_price) AS original_price,
        (p.qty * p.unit_price) * (1 - p.discount / 100) AS total_price
    `;

    var sqlJoin = ` FROM product p INNER JOIN category c ON p.category_id = c.id `;
    var sqlWhere = ` WHERE true `;

    // Apply filters based on query parameters
    if (txt_search) {
      sqlWhere += ` AND (p.name LIKE :txt_search OR p.barcode = :barcode) `;
    }
    if (category_id) {
      sqlWhere += ` AND p.category_id = :category_id`;
    }
    if (brand) {
      sqlWhere += ` AND p.brand = :brand`;
    }
    if (user_id) {
      sqlWhere += ` AND p.user_id = :user_id`; // Filter by user ID
    }

    var sqlLimit = ` LIMIT ${pageSize} OFFSET ${offset}`;
    if (is_list_all) {
      sqlLimit = ``;
    }

    var sqlList = sqlSelect + sqlJoin + sqlWhere + sqlLimit;
    var sqlparam = {
      txt_search: `%${txt_search}%`,
      barcode: txt_search,
      category_id,
      brand,
      user_id, // Add user_id to SQL parameters
    };

    const [list] = await db.query(sqlList, sqlparam);

    var dataCount = 0;
    if (page === 1) {
      let sqlTotal = ` SELECT COUNT(p.id) as total ` + sqlJoin + sqlWhere;
      var [dataCount] = await db.query(sqlTotal, sqlparam);
      dataCount = dataCount[0].total;
    }

    res.json({
      list: list,
      total: dataCount,
    });
  } catch (error) {
    logError("product.getList", error, res);
  }
};


// exports.create = async (req, res) => {
//   try {

//     var sql =
//       " INSERT INTO product (name,category_id, barcode,brand,description,qty,unit,unit_price,price,discount,status,create_by ) " +
//       " VALUES (:name,:category_id, :barcode, :brand, :description, :qty,:unit,:unit_price, :price, :discount, :status, :create_by ) ";
//     var [data] = await db.query(sql, {
//       ...req.body,
//       create_by: req.auth?.name,
//     });

//     res.json({
//       data,
//       message: "Insert success!",
//     });
//   } catch (error) {
//     logError("category.create", error, res);
//   }
// };

exports.create = async (req, res) => {
  try {
    // Extract values from request body
    const { name, category_id, barcode, brand,company_name, description, qty, unit, unit_price, discount, status } = req.body;

    // Calculate total price before inserting into the database
    // const price = unit_price * qty; // price = unit_price * quantity

    var sql =
      " INSERT INTO product (name, category_id, barcode, brand,company_name, description, qty, unit, unit_price, discount, status, create_by) " +
      " VALUES (:name, :category_id, :barcode, :brand,:company_name, :description, :qty, :unit, :unit_price, :discount, :status, :create_by) ";

    var [data] = await db.query(sql, {
      name,
      category_id,
      barcode,
      brand,
      company_name,
      description,
      qty,
      unit,
      unit_price,
    
      discount,
      status,
      create_by: req.auth?.name,
    });

    res.json({
      data,
      message: "Insert success!",
    });
  } catch (error) {
    logError("product.create", error, res);
  }
};


exports.update = async (req, res) => {
  try {
    var sql =
      " UPDATE product set " +
      " name = :name, " +
      " category_id = :category_id, " +
      " brand = :brand, " +
      " company_name = :company_name, " +
      " description = :description, " +
      " qty = :qty, " +
      " unit = :unit, " +
      " unit_price = :unit_price, " +
      " price = :price, " +
      " discount = :discount, " +
      " status = :status " +
      " WHERE id = :id";



    var [data] = await db.query(sql, {
      ...req.body,
      create_by: req.auth?.name,
    });

    res.json({
      data: data,
      message: "Data update success!",
    });
  } catch (error) {
    logError("product.update", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id || req.body.id; // Check both params & body
    
    if (!id) {
      return res.status(400).json({ message: "Product ID is required!" });
    }

    var [data] = await db.query("DELETE FROM product WHERE id = :id", { id });

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    logError("remove.product", error, res);
  }
};

exports.newBarcode = async (req, res) => {
  try {
    var sql =
      "SELECT " +
      "CONCAT('P',LPAD((SELECT COALESCE(MAX(id),0) + 1 FROM product), 3, '0')) " +
      "as barcode";
    var [data] = await db.query(sql);
    res.json({
      barcode: data[0].barcode,
    });
  } catch (error) {
    logError("remove.create", error, res);
  }
};

isExistBarcode = async (barcode) => {
  try {
    var sql = "SELECT COUNT(id) as Total FROM product WHERE barcode=:barcode";
    var [data] = await db.query(sql, {
      barcode: barcode,
    });
    if (data.length > 0 && data[0].Total > 0) {
      return true; // ស្ទួន
    }
    return false; // អត់ស្ទួនទេ
  } catch (error) {
    logError("remove.create", error, res);
  }
};

exports.productImage = async (req, res) => {
  try {
    var sql = "SELECT *  FROM product_image WHERE product_id=:product_id";
    var [list] = await db.query(sql, {
      product_id: req.params.product_id,
    });
    res.json({
      list,
    });
  } catch (error) {
    logError("remove.create", error, res);
  }
};
