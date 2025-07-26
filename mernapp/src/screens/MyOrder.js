import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const response = await res.json();
            // Flatten the nested data for easier rendering
            setOrderData(response.orderData.order_data || []);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData.length > 0 ? (
                        orderData
                            .slice(0)
                            .reverse()
                            .map((orderGroup, index) => {
                                const [items, date] = orderGroup;

                                return (
                                    <div key={index} className="w-100 m-auto mt-3">
                                        <h5 className="text-center">Order Date: {new Date(date).toLocaleString()}</h5>
                                        <hr />
                                        <div className="row">
                                            {items.map((item, idx) => (
                                                <div key={idx} className="col-12 col-md-6 col-lg-3 mb-4">
                                                    <div className="card" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img
                                                            src={item.img}
                                                            className="card-img-top"
                                                            alt={item.name}
                                                            style={{ height: "120px", objectFit: "cover" }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className="container w-100 p-0">
                                                                <span className="m-1">Qty: {item.qty}</span>
                                                                <span className="m-1">Size: {item.size}</span>
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                    ₹{item.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <p className="text-center mt-5 fs-4">No Orders Found</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
