import React from 'react'
import Navbars from '../components/Navbar'
import Con1 from '../components/Con1'
import Con2 from '../components/Con2'
import Con3 from '../components/Con3'
import Con4 from '../components/carts/img/Con4'
import Footer from '../components/Footer'
import "./st.css";
import Pop from '../components/Pop'
export default function Home() {
  return (
    <div className='wq'>
   <Navbars/>
   <Con1/>
   <Con2/>
   <Con3/>
   <Con4/>
   <Footer/>
   </div>
  )
}
