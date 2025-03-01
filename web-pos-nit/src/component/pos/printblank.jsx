import React from "react";
import logo from "../../assets/petronas.png";
import "./fonts.css"; 

const ProductDeliveryNote = React.forwardRef((props, ref) => {
  const { 
    deliveryData = {
      depot: "SAMRONG THOM",
      pdn_no: "000000",
      date: new Date(),
      customer_requisition_ref: "",
      release_order_no: "",
      phone_number: "",
      customer_name: "",
      delivery_address: "",
      products: [],
      total_amount: 0,
      payment_method: "CREDIT / CASH",
      remarks: "",
      transportation: {
        type: "PETRONAS / CONTRACTOR / CONSUMER",
        seal_no: "",
        vehicle_no: "",
        time_in: "",
        time_out: "",
        time_back: ""
      },
      prepared_by: "",
      delivered_by: "",
      filled_by: "",
      security_checked: false,
      approved_by: ""
    }
  } = props;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).replace(/,/g, '');
  };

  return (
    <div ref={ref} className="p-8 max-w-4xl mx-auto bg-white">
      <div className="flex justify-between mb-6">
        <div></div>
        <div className="text-right">
          <img
            src={logo}
            alt="PETRONAS Cambodia Logo"
            className="w-32 h-auto object-contain ml-auto"
          />
        </div>
      </div>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold underline">PRODUCT DELIVERY NOTE</h1>
      </div>
      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black">
          <tbody>
            <tr>
              <td className="border border-black p-2 w-1/2">
                <strong>DEPOT : </strong>{deliveryData.depot}
              </td>
              <td className="border border-black p-2">
                <strong>P.D.N NO : </strong>{deliveryData.pdn_no}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2">
                <strong>DATE : </strong>{formatDate(deliveryData.date)}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                <strong>CUSTOMER REQUISITION REF</strong>
                <div>{deliveryData.customer_requisition_ref}</div>
                <div><strong>Phone Number : </strong>{deliveryData.phone_number}</div>
              </td>
              <td className="border border-black p-2">
                <strong>RELEASE ORDER NO : </strong>{deliveryData.release_order_no}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">
                <strong>CUSTOMER'S NAME AND ADDRESS</strong>
              </td>
              <td className="border border-black p-2 text-center">
                <strong>DELIVERY ADDRESS</strong>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-16 align-top">
                <div className="khmer-text">{deliveryData.customer_name}</div>
              </td>
              <td className="border border-black p-2 h-16 align-top">
                <div className="khmer-text">{deliveryData.delivery_address}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">PRODUCT CODE</th>
              <th className="border border-black p-2">PRODUCT DESCRIPTION</th>
              <th className="border border-black p-2">PACK</th>
              <th className="border border-black p-2">UNIT</th>
              <th className="border border-black p-2">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {deliveryData.products.map((product, index) => (
              <tr key={index}>
                <td className="border border-black p-2">{product.code}</td>
                <td className="border border-black p-2">{product.description}</td>
                <td className="border border-black p-2">{product.pack}</td>
                <td className="border border-black p-2">{product.unit}</td>
                <td className="border border-black p-2">
                  {product.quantity}
                  {product.quantity_text && <div>({product.quantity_text})</div>}
                </td>
              </tr>
            ))}
            {(!deliveryData.products || deliveryData.products.length === 0) && (
              <tr>
                <td className="border border-black p-2">02</td>
                <td className="border border-black p-2">Gasoline</td>
                <td className="border border-black p-2">Bulk</td>
                <td className="border border-black p-2">Litre</td>
                <td className="border border-black p-2">
                  16,000L
                  <div>(Sixteen Thousand Litres Only)</div>
                </td>
              </tr>
            )}
            <tr>
              <td className="border border-black p-2 h-16" colSpan="5"></td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-right" colSpan="4">TOTAL AMOUNT (USD)</td>
              <td className="border border-black p-2">{deliveryData.total_amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black">
          <tbody>
            <tr>
              <td className="border border-black p-2 w-1/2">
                <strong>PRODUCTS / ITEMS RECEIVED IN GOOD ORDER</strong>
              </td>
              <td className="border border-black p-2">
                <strong>{deliveryData.payment_method}</strong>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2" rowSpan="2">
                <div className="h-24 flex items-center justify-center">
                  <div className="text-center">
                    <strong>SINGNATURE / STAMP / DATE</strong>
                  </div>
                </div>
              </td>
              <td className="border border-black p-2 h-12">
                <strong>REMARK'S</strong>
                <div>{deliveryData.remarks}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full mb-4">
        <table className="w-full border-collapse border border-black">
          <tbody>
            <tr>
              <td className="border border-black p-2 text-center" colSpan="2">
                <strong>TRANSPORTATION DESCRIPTION</strong>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">
                <strong>TYPE : </strong>{deliveryData.transportation.type}
              </td>
              <td className="border border-black p-2">
                <strong>SEAL NO : </strong>{deliveryData.transportation.seal_no}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2" colSpan="2">
                <div>
                  <strong>VEHICLE NO.</strong>
                  <span className="ml-8">_________</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span><strong>TIME IN</strong></span>
                  <span><strong>TIMEOUT</strong></span>
                  <span><strong>TIME BACK</strong></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full">
        <table className="w-full border-collapse border border-black">
          <tbody>
            <tr>
              <td className="border border-black p-2">
                <strong>PREPARED BY : </strong>
              </td>
              <td className="border border-black p-2">
                <strong>DELIVERED BY : </strong>
              </td>
              <td className="border border-black p-2">
                <strong>FILLED BY : </strong>
              </td>
              <td className="border border-black p-2">
                <strong>SECURITY CHECKED</strong>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 h-16" colSpan="4">
                <div className="h-16 mt-8">
                  <strong>APPROVED BY : </strong>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center text-sm" colSpan="4">
                TRANSPORTATION COPY
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ProductDeliveryNote;