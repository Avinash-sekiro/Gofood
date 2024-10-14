import Home from "./screens/Home";
import Login from "./screens/Login";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Signup from "./screens/Signup";
import Order from "./screens/Order";
import CartProvider from "./components/Contexredux";

function App() {
  return (
    <CartProvider>
    <Router>
    <div>
  <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="login" element={<Login/>} />
    <Route exact path="/signup" element={<Signup/>}/>
    <Route exact path="/order" element={<Order/>}/>
  </Routes>
   </div>
   </Router>
   </CartProvider>
  );
}

export default App;
