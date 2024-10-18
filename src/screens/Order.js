import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Navbars from '../components/Navbar';
import Cards from '../components/Cards';

export default function Order() {
  const [search, setSearch] = useState(' '); // State variable for search input
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loads = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodata", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setfoodcat(data[0]);
      setfooditem(data[1]);
    } catch (err) {
      console.error(err);
      // Implement error handling for the user (e.g., display an error message)
    }
  };

  useEffect(() => {
    loads();
  }, []);

  console.log(foodcat)

  const handleSelect = (selectedIndex) => {
    // Assuming you have a state variable for the current slide index (index)
    
  };

  return (
    <div>
      <Navbars />
      <section>
        
      </section>
      <section>
        <div className='container'>
          {foodcat && foodcat.length > 0 ? (
            foodcat.map((data) => (
              <div key={data._id} className='row mb-3'>
                <div className='fs-3 m-3'>{data.categoryname}</div>
                {console.log(data.cateragyname)}
                <hr />
                {fooditem && fooditem.length > 0 ? (
                  fooditem
                    .filter(
                      (items) =>
                        items.categoryname === data.categoryname &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                      
                    )
                    .map((filterItems) => (
                     
                     <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        {/* Check if logging is needed here */}
                        <div style={{marginRight:"20px"}} className=''>
                        <Cards
                          _id={filterItems._id}
                          foodName={filterItems.name}
                          item={filterItems}
                          options={filterItems.option}
                          ImgSrc={filterItems.image}
                        />
                  </div>
                      </div>
                    ))
                ) : (
                  <div key={data._id}>No items found yet</div>
                )}
              </div>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
      </section>
    </div>

  );
}