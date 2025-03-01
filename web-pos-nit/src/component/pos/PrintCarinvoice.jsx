import React from "react";

const InvoiceCar = ({ cart_list = [] }) => {
  const formatNumber = (num) => new Intl.NumberFormat().format(num);
  console.log("cart_list:", cart_list);


  if (!Array.isArray(cart_list) || cart_list.length === 0) {
    return <div className="text-center mt-4">No items available.</div>;
  }

  return (
    <div className="container mx-auto mt-4">
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">No / លេខ</th>
            <th className="border p-2">Description / ការពិពណ៌នា</th>
            <th className="border p-2">Quantity / បរិមាណ</th>
            <th className="border p-2">Unit Price / តម្លៃ​រាយ</th>
            <th className="border p-2">Amount / តម្លៃ​សរុប</th>
          </tr>
        </thead>
        <tbody>
          {(cart_list || []).map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.cart_qty} {item.unit}</td>
              <td className="border p-2">$ {formatNumber(item.unit_price)}</td>
              <td className="border p-2 font-bold">$ {formatNumber(item.cart_qty * item.unit_price)}</td>
              <td className="border p-2">hello kon pa pa apap </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-bold">
            <td className="border p-2" colSpan={4}>Total / សរុប</td>
            <td className="border p-2">$ {formatNumber(cart_list.reduce((sum, item) => sum + item.cart_qty * item.unit_price, 0))}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-2 font-bold">ទំនិញត្រូវបានទទួលដោយត្រឹមត្រូវ</div>
    </div>
  );
};

export default InvoiceCar;
