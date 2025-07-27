import Navbars from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({}); // Initialize as an object

  const fetchData = async () => {
    console.log(localStorage.getItem("Emails"));
    try {
      const response = await fetch("http://localhost:5000/api/myorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("Emails"),
        }),
      });
      const result = await response.json();
      setOrderData(result); // Set result as object
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbars />
      <div className="container">
        <div className="row">
            <div className="d-flex justify-content-between">
            {console.log(orderData)}
          {orderData && orderData.orderData && orderData.orderData.order_data && orderData.orderData.order_data.length > 0 ? (
            orderData.orderData.order_data.slice(0).reverse().map((item, itemIndex) => (
              <div key={itemIndex}>
                {Array.isArray(item) && item.map((arrayData, arrayIndex) => (
                  <div key={arrayIndex}>
                    {arrayData.order_date ? (
                      <div className="m-auto mt-5">
                        <h5>Order Date: {arrayData.order_date}</h5>
                        <hr />
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                       
                          <img
                            src={arrayData.img}
                            className="card-img-top"
                            alt="..."
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                              <span className="m-1">{arrayData.qty}</span>
                              <span className="m-1">{arrayData.size}</span>
                              <span className="m-1">Order Date: {arrayData.Order_date}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No orders found</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
