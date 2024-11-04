import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatchCart } from './Contexredux';
import { useCart } from './Contexredux';

function Cards(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");  // Re-enable size state
  const [price, setPrice] = useState(props.options ? props.options[Object.keys(props.options)[0]] : 0); 
  let cartData = useCart();  // Assuming useCart() returns an array or iterable object
  let sid = props._id;

  let option = props.options;
  let priceOptions = Object.keys(option);
  const totalPrice = qty * price;
  const dispatch = useDispatchCart();  // Setup dispatch for Redux actions

  const handleCart = async () => {
    let food = cartData.find((item) => item.id === sid) || {};  // Cleaner lookup
    console.log(food);
    console.log(new Date());

    const finalPrice = totalPrice; // Define finalPrice here

    if (Object.keys(food).length !== 0) {
      // If the food item exists in the cart
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: food._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ 
          type: "ADD", 
          id: food._id, 
          name: food.name, 
          price: finalPrice, 
          qty: qty, 
          size: size, 
          img: props.ImgSrc 
        });
        console.log("Size different, adding another item to the list");
        return;
      }
    }

    // If the food item is not in the cart
    await dispatch({ 
      type: "ADD", 
      id: props._id, 
      name: props.foodName, 
      price: finalPrice, 
      qty: qty, 
      size: size, 
      img: props.ImgSrc 
    });
  };

  return (
    <div className='card-container'>
      <Card style={{ width: '18rem', margin: "20px" }}>
        <Card.Img 
          variant="top" 
          src={props.ImgSrc} 
          style={{ height: "120px", objectFit: "fill" }} 
        />
        <Card.Body>
          <Card.Title>{props.foodName}</Card.Title>
          <div className='container w-100 sm'>
            <Form.Select 
              size="sm" 
              style={{ width: '60px' }} 
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Form.Select>
            <Form.Select 
              size="sm" 
              style={{ width: '80px' }} 
              onChange={(e) => setPrice(option[e.target.value])}
            >
              {priceOptions.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </Form.Select>
          </div>
          <div className='d-inline h-100 fs-5' style={{ color: "red" }}>
            Total Price: ${totalPrice}
          </div>
          <hr />
          <Button variant="primary" onClick={handleCart}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
