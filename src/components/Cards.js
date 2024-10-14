import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import  Form  from 'react-bootstrap/Form';
import "./con1.css";
import { useCart } from './Contexredux';

function Cards(props) {
  console.log(props.name);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(props.options ? props.options[Object.keys(props.options)[0]] : 0); // Set initial price from default option
  let data = useCart()
  let sid = props._id

  let option = props.options;
  let priceOptions = Object.keys(option);
  const totalPrice = qty * price;

  const handleCart = () => {
   let food = [];
   for ( const item of data ){
    if(item.id == sid){
      food =  item;

      break

    }
   }
   console.log(food)
   console.log(new Date())

  };

  return (
    <div className='m'>
      <Card style={{ width: '18rem' ,margin:"20px"}}>
  
        <Card.Img variant="top" src={props.ImgSrc} style={{ height: "120px",objectFit: "fill" }} />
        <Card.Body>
          <Card.Title>{props.foodName}</Card.Title>
          <div className='container w-100 sm'>
            <Form.Select size="sm" style={{ width: '60px' }} onChange={(e) => setQty(parseInt(e.target.value))}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Form.Select>
            <Form.Select size="sm" style={{ width: '80px' }} onChange={(e) => setPrice(option[e.target.value])}>
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

export default Cards