import React, { useEffect } from 'react'
// import "./con1.css";
import Button  from 'react-bootstrap/Button';
import h from "./img/herosection.jpeg"
import "./sd.css";
import Aos from 'aos';
import "aos/dist/aos.css"

export default function Con1() {
  useEffect(()=>{
    Aos.init();
  },[])
  
  return (
  
<section id="we">
      <div className='container'>
        <div className='h-25 haa' data-aos="fade-right">
      <h4 className='fs-1'>Savor Every Bite Delivered to Your Doorstep</h4>
      <div className='mb-5'>Experience the joy of delicious meals delivered right to you. Our curated selection of restaurants ensures you’ll find something to satisfy every craving.</div>
      <Button className="btn-success" style={{marginRight:"20px"}}>order now</Button> 
      <Button variant='outline-primary'>learn more</Button>   
      </div>
      <img src={h} data-aos="fade-left" className='k'/>
    </div>
    
    </section>
  )
}
