import { type } from "@testing-library/user-event/dist/type";
import { useCart, useDispatchCart } from "../components/Contexredux";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Card() {
    const data = useCart();
    const dispatch = useDispatchCart();
   console.log()
    console.log(data)
    // Fix typo in 'length'
    if (data.length === 0) {
        return (
            <div>
                The cart is empty
            </div>
        );
    }


const Checkout = async() =>{
    let response = await fetch("http://localhost:5000/api/orderData",
        {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                order_data:data,
                email:localStorage.getItem("Emails"),
                order_date:new Date().toDateString
            })
           
        }
    )
    console.log("JSON respond:",response.status)
    if(response.status === 200){
        dispatch({type:"DROP"})
    }
}
    // Use 'data' instead of 'food' for total calculation
    let Total = data.reduce((total, food) => total + food.price * food.qty, 0);

    return (
        <div>
            {console.log(data)}
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.option}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className="btn p-0">
                                        <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Move the total and checkout button outside the table */}
                <div>
                    <h2 className="fs-2">Total price: ${Total}</h2>
                </div>
                <div>
                    <button className="btn mt-5" type="button" onClick={Checkout}>Check Out</button>
                </div>
            </div>
        </div>
    );
}
