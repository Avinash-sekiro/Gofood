import React from 'react'
import "./con1.css";
import Button  from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import h from "./img/herosection.jpeg"

export default function Con1() {
  return (
  
    <div>

    <div className='con1'>
      <h4 className='q'>Savor Every Bite Delivered to Your Doorstep</h4>
      <p>Experience the joy of delicious meals delivered right to you. Our curated selection of restaurants ensures you’ll find something to satisfy every craving.</p>
      <Button className="btn-success" style={{marginRight:"20px"}}>order now</Button> 
      <Button variant='outline-primary'>learn more</Button>   
    </div>
    <img src={h} className='k'/>
    </div>
  )
}
