import React, { useState } from 'react';
import "./st.css";

export default function Admin() {
    const initial = { name: "", img: "", cats: "", price: "" };
    const [credential, setCredential] = useState(initial);

    const changer = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    };

    const Done = async (e) => {
        e.preventDefault();
        try {
            let half = String(credential.price / 2);
            const response = await fetch("http://localhost:5000/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    categoryname: credential.cats,
                    name: credential.name,
                    image: credential.img,
                    option: { "half": half, "full": credential.price }
                })
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }

            const data = await response.json();
            console.log("Send complete:", data);

            setCredential({ ...initial });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
            <form className='border border-1 border-solid rounded' onSubmit={Done}>
                <div className='form-group'>
                    <div className='container mt-5 d-flex justify-content-center align-items-center flex-column'>
                        <select
                            className="form-select w-75 mb-3"
                            aria-label="Default select example"
                            value={credential.cats}
                            name='cats'
                            onChange={changer}
                        >
                            <option value="Appetizers">Appetizers</option>
                            <option value="Soups and Salad">Soups and Salad</option>
                            <option value="Main Courses">Main Courses</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Special Dietary">Special Dietary</option>
                        </select>

                        <input
                            type="text"
                            className='form-control-lg mb-3'
                            placeholder="name"
                            value={credential.name}
                            name='name'
                            onChange={changer}
                        />
                        <input
                            type="text"
                            className='form-control-lg mb-3'
                            placeholder="img"
                            value={credential.img}
                            name='img'
                            onChange={changer}
                        />
                        <input
                            type="text"
                            className='form-control-lg mb-3'
                            placeholder="price"
                            value={credential.price}
                            name='price'
                            onChange={changer}
                        />
                        <input type="submit" className='form-control mb-3' />
                    </div>
                </div>
            </form>
        </div>
    );
}
