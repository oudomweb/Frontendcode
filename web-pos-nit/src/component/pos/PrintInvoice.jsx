import React from "react";
import logo from "../../assets/petronas.png";
import "./fonts.css";
import { getProfile } from "../../store/profile.store";
const PrintInvoice = React.forwardRef((props, ref) => {
  const profile = getProfile();
  const { 
    objSummary = {
      sub_total: 0,
      total_qty: 0,
      save_discount: 0,
      tax: 10,
      total: 0,
      total_paid: 0,
      customer_id: null,
      user_id: null,
      payment_method: null,
      remark: null,
      order_no: null,
      order_date: null,
    }, 
    cart_list = [] 
  } = props;

  const formatNumber = (value) => {
    const number = parseFloat(value) || 0;
    return number.toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateTax = () => {
    const subtotal = parseFloat(objSummary.sub_total) || 0;
    const taxRate = parseFloat(objSummary.tax) || 0;
    return (subtotal * taxRate / 100);
  };

  return (
    <div ref={ref} className="p-8 max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
       <div>
       <span className="text-xl font-bold font-sans">PETRONAS</span>  <br />
       <span className="text-sm px-11"> CAMBODIA</span>
       </div>
        <img src={logo} alt="Company Logo" className="w-16 h-16 object-contain" />
      </div>
      <div className="text-center flex-1">
        <h2 className="text-2xl font-bold khmer-text">វិក្កយបត្រ</h2>
        <h2 className="text-xl khmer-text">INVOICE</h2>
      </div>
      <div className="w-16 h-16"></div>
    </div>
  
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div>
        <p className="khmer-text">ឈ្មោះអតិថិជន: {profile?.branch_name || 'N/A'}</p>
        <p className="khmer-text">អាសយដ្ឋាន: {profile?.address || 'N/A'}</p>
        <p className="khmer-text">លេខទូរស័ព្ទ: {profile?.tel || 'N/A'}</p>
        <p className="khmer-text">គោលដៅ: {objSummary.user_name || 'N/A'}</p>
      </div>
      <div className="text-right">
        <p className="khmer-text">លេខវិក្កយបត្រ: {objSummary.order_no}</p>
        <p className="khmer-text">ថ្ងៃបញ្ជាទិញ: {formatDate(objSummary.order_date)}</p>
        <p className="khmer-text">ថ្ងៃប្រគល់ទំនិញ:</p>
        <p className="khmer-text">លេខបញ្ជាទិញ:</p>
        <p className="khmer-text">លេខបណ្ណបញ្ចេញទំនិញ:</p>
      </div>
    </div>
  
    <div className="w-full mb-8 overflow-x-auto">
      <table  className="w-full border-collapse  border-2 border-black">
        <thead className="border-2 border-black text-black">
          <tr >
            <th className="border-2  border-black p-2 w-1/12 text-left khmer-text">No / លេខ</th>
            <th className="border-2  border-black p-2 w-5/12 text-left khmer-text">Description / ការពិពណ៌នា</th>
            <th className="border-2  border-black p-2 w-2/12 text-center khmer-text">Quantity / បរិមាណ</th>
            <th className="border-2  border-black p-2 w-2/12 text-right khmer-text">Unit Price / តម្លៃរាយ</th>
            <th className="border-2  border-black p-2 w-2/12 text-right khmer-text">Amount / តម្លៃសរុប</th>
          </tr>
        </thead>
        <tbody className="border-2 border-black" >
          {cart_list.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-2  border-black p-2 text-center khmer-text">{index + 1}</td>
              <td className="border-2  border-black p-2 khmer-text">{item.name}</td>
              <td className="border-2  border-black p-2 text-center khmer-text">
                {item.cart_qty} <span className=" text-sm">{item.unit}</span>
              </td>
              <td className="border-2  border-black p-2 text-right khmer-text">$ {formatNumber(item.unit_price)}</td>
              <td className="border-2  border-black p-2 text-right font-bold khmer-text">
                $ {formatNumber(item.cart_qty * item.unit_price)}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border-2  border-black  p-2 text-right khmer-text" colSpan={4}>Total / សរុប</td>
            <td className="border-2  border-black  p-2 text-right khmer-text">
              $ {formatNumber(cart_list.reduce((sum, item) => sum + item.cart_qty * item.unit_price, 0))}
            </td>
          </tr>
          <tr>
            <td className="border-0 border-black p-2 text-center khmer-text" colSpan={5}>
              ទំនិញត្រូវបានទទួលនៅក្នុងលក្ខខណ្ឌល្អ /{' '}
              <span className="italic">Product Received in Good Order</span>
            </td>
          </tr>
          <tr>
            <td className=" text-center khmer-text" colSpan={5}>
            <div className="grid grid-cols-2   text-center khmer-text  gap-4  ">
      <div className="mt-20 mb-10">
        <p className="font-bold mb-4 khmer-text">អតិថិជន</p>
        <p className="mb-8 khmer-text">Customer:</p>
        <p className="mt-32 mb-6 khmer-text">ហត្ថលេខា</p>
        <p className="mt-4 khmer-text">Date: ....../....../.....</p>
      </div>
      <div className="text-right mt-20 mb-10 khmer-text px-32">
        <p className="font-bold mb-4 khmer-text">គណនេយ្យករ</p>
        <p className="mb-8 khmer-text">Accountant:</p>
        <p className="mt-32 mb-6 khmer-text">ហត្ថលេខា</p>
        <p className="khmer-text">Date: {formatDate(objSummary.order_date)}</p>
      </div>
           </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="text-center  khmer-text">
      <p>ទំនាក់ទំនងផ្នែកបច្ចេកទេស: +855 67 733 335 / +855 76 5555 713</p>
    </div>
  </div>
  );
});

export default PrintInvoice;
