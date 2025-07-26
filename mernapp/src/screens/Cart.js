import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (!data || data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Order placed successfully!");
        dispatch({ type: "DROP" });
      } else {
        alert("Order failed. Server response not OK.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong during checkout.");
    }
  };

  const totalPrice = data.reduce((total, food) => {
    return total + (food?.price || 0);
  }, 0);

  return (
    <div>
      {console.log("Cart Data:", data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{food?.name || 'Unknown'}</td>
                <td>{food?.qty || '-'}</td>
                <td>{food?.size || '-'}</td>
                <td>{food?.price || 0}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
