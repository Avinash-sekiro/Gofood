import React from 'react'
import Card from 'react-bootstrap/Card';
import "./con1.css"
import f1 from "./img/f1.jpeg"
import f2 from "./img/f2.jpeg"
import f3 from "./img/f3.jpeg"
export default function Con2() {
  return (
    <div className='c1'>
    <div className='s1' >
      <h1 style={{marginLeft:"10px"}}>Unique Features of Our Food Restaurant</h1>

    </div>
    <div className='op'>
      <Card className="m-3" style={{ width: '18rem' }}>
        <Card.Img variant="top"  style={{ height: "120px", objectFit: "fill" }} src={f1}/>
        <Card.Body>
          <Card.Title style={{fontWeight:"bold"}}>Locally Sourced Ingredients</Card.Title>
          <Card.Text>
          We prioritize fresh, seasonal produce from local farms, ensuring that every dish is as flavorful as possible while supporting our community.
          </Card.Text>
   
        </Card.Body>
      </Card>
      `<Card className="m-3" style={{ width: '18rem' }}>
        <Card.Img variant="top"  style={{ height: "120px", objectFit: "fill" }} src={f2} />
        <Card.Body>
          <Card.Title style={{fontWeight:"bold"}}>Signature Dishes</Card.Title>
          <Card.Text>
          Our chefs have crafted exclusive recipes that showcase unique flavor combinations, giving our customers something special to look forward to.
          </Card.Text>
     
        </Card.Body>
      </Card>
      `<Card className="m-3" style={{ width: '18rem' }}>
        <Card.Img variant="top"  style={{ height: "120px", objectFit: "fill" }} src={f3}/>
        <Card.Body>
          <Card.Title style={{fontWeight:"bold"}}>Warm and Inviting Atmosphere</Card.Title>
          <Card.Text>
          Our restaurant boasts a cozy interior designed for comfort, making it an ideal spot for families, friends, and special occasions.
          </Card.Text>
         
        </Card.Body>
      </Card>
    </div>`
</div>
  )
}
