//@desc this is the tab containing order details when a vendor clicks view detail {vieworder.jsx}
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from 'react';

import NavPills from "../../components/NavPills/NavPills.jsx";
import ProductDetails from "./productdetails.jsx"
import ShipmentDetails from './shipmentdetails.jsx';
import PaymentDetail from './paymentdetails';

function OrderDetails({...props}){
  return (
    <NavPills 
      color="primary"
      tabs={[
        {
          tabButton: "Product Details",
          tabContent: (
              <ProductDetails />  
          )
        },
        {
          tabButton: "Payment Details",
          tabContent: (
              <PaymentDetail />
          )
        },
        {
          tabButton: "Shipment Details",
          tabContent: (
              <ShipmentDetails />
          )
        }
      ]}
    />
  );
}

export default OrderDetails;