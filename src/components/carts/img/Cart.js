import React from 'react'
import Card from 'react-bootstrap/Card';
import "./sd.css";
export default function Cart(props) {

  return (
    <section id="ca6">
    <div className='zoom'>
       <Card className="m-3" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.img} style={{ height: "120px", objectFit: "fill" }} className='q'/>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
    </section>
  )
}
