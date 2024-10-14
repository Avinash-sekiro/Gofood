import React from 'react'
import Button  from 'react-bootstrap/Button';
import "./con1.css"
export default function Con3() {
  return (
    <div className='c2'>
        <div>
      <h2>Delicious Meals Delivered to You</h2>
      <p>Join us today for exclusive offers and tasty meals!</p>
      </div>
      <div>
      <Button className="btn-success" style={{marginRight:"20px"}}>order now</Button> 
      <Button variant='outline-primary'>learn more</Button>   
      </div>
    </div>
  )
}
