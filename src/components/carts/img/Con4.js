import React from 'react'
import Cart from './Cart'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./sd.css";
import s1 from "./appetizing.jpeg"
import s2 from "./Beverages.jpeg"
import s3 from "./Desserts.jpeg"
import s4 from "./Main_Courses.jpeg"
import s5 from "./supe.jpeg"
import s6 from "./spe.jpeg"


export default function Con4() {
  return (
    <section id="can4">
    <div className='s2'>
        <div style={{display:"flex",justifyContent:"space-around",marginLeft:"420px",marginBottom:"50px"}}>
      <h2 style={{textAlign:"center"}}>order now</h2>
      <div className='d-flex'>
      <Form.Control type="search" placeholder="search" readOnly  style={{width:"200px"}}/>
      <Button variant='outline-danger'>Search</Button>
      </div>
      </div>
        <div >
            <div style={{display:'flex',justifyContent:"space-around",marginRight:"50px"}}>
            <Cart name="Appetizers" img={s1}/>
            <Cart name="Soups and Salad" img={s5}/>
            <Cart  name="Main Courses" img={s4}/>
            </div>
            <div style={{display:'flex',justifyContent:"space-around",marginRight:"50px"}}>
            <Cart  name="Desserts" img={s3}/>
            <Cart  name="Beverages" img={s2}/>
            <Cart  name="Special Dietary" img={s6}/>
            </div>
        </div>
    </div>
    </section>
  )
}
/* list 
Appetizers
Soups and Salad
Main Courses
Desserts
Beverages
Special Dietary Options
Kids’ Menu
Vegetarian/Vegan */
