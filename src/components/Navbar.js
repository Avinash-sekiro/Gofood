import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navsstyle.css"
import { Link, useNavigate } from 'react-router-dom';
import Pop from './Pop';

export default function Navbars() {
const navs=useNavigate()

  const logout = () =>{
    localStorage.removeItem("authToken")
    navs('/login')
  }

  return (
    <>
    <Navbar className='py-0'>
        <Container className=''>
          <Navbar.Brand style={{fontSize:"30px"}}href="#home">Navbar</Navbar.Brand>
          <Nav className="mx-auto" style={{display:"flex",justifyContent:"space-between",fontSize:"15px"}}>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Menu</Nav.Link>
            <Nav.Link href="#pricing">Order now</Nav.Link>
            <Nav.Link href="#pricing">more info</Nav.Link>
          </Nav>
          <div>
          {!localStorage.getItem("authToken") ? (
                <div>
                  <Link to="/login" className='btn bg-white text-success mx-2'>Login</Link>
                  <Link to="/createuser" className='btn bg-white text-success mx-2'>Signup</Link>
                </div>
              ) : (

                <div className='d-flex'>
                  <div>
                  <Pop/>
                  </div>
                  {/* <button className="btn bg-white text-success mx-2" onClick={loadCart}>
                    <Badge variant="secondary">
                      <CiShoppingCart />
                    </Badge>
                    Cart
                  </button> */}
                  {/* {cartView && <Modal onClose={() => setCartView(false)}><Cart/></Modal>} */}
                  <div className='btn bg-white text-success mx-2' onClick={logout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
        </Container>
        </Navbar>
        <hr className='we'></hr>
    </>
  );
}

