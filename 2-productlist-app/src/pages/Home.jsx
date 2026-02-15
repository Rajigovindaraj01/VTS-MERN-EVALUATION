import React, { useState } from 'react'
import './Home.css'
import image1 from '../assets/Images/b2f369286e98dcecedab6988d2a5bda3-removebg-preview.png'
import m1 from '../assets/Images/b2f369286e98dcecedab6988d2a5bda3-removebg-preview.png'
import m2 from '../assets/Images/6ea573a3bab9626a4d209ce71717e763-removebg-preview.png'
import m3 from '../assets/Images/ChatGPT_Image_Feb_11__2026__12_47_26_PM-removebg-preview.png'
import m4 from '../assets/Images/fish.png'
import m5 from '../assets/Images/grill.png'
import m6 from '../assets/Images/egg.png'
import m7 from '../assets/Images/veg.png'
import m8 from '../assets/Images/panee.png'
import m9 from '../assets/Images/tandoori.png'
import m10 from '../assets/Images/shrimp.png'

function Home({search,cart,setCart}) {

  const menu = [
    {
      id: 1,
      name: 'Chicken Briyani',
      rating: 5,
      desc: 'Aromatic basmati rice cooked with tender chicken pieces and traditional spices.',
      price: 325,
      image: m1,
      category:'chicken',
    },
    {
      id: 2,
      name: 'Prawn Briyani',
      rating: 5,
      desc: 'Fresh prawns sautéed in spicy masala layered with fragrant basmati rice.',
      price: 375,
      image: m3,
      category:'prawns'
    },
    {
      id: 3,
      name: 'Mutton Briyani',
      rating: 5,
      desc: 'Slow-cooked juicy mutton blended with premium spices for a royal taste.',
      price: 399,
      image: m2,
      category:'mutton'
    },
    {
      id:4,
      name:'Fish Fry',
      rating:4,
      desc:'Crispy deep fried fish marinated with special South Indian spices.',
      price:450,
      image:m4,
      category:'seafood'
    },
    {
      id:5,
      name:'Grill Chicken',
      rating:5,
      desc:'Perfectly grilled chicken with smoky flavor and juicy texture.',
      price:499,
      category:'chicken',
      image:m5,
    },
    {
      id:6,
      name:'Egg Briyani',
      rating:3.5,
      desc:'Fluffy rice mixed with boiled eggs and flavorful masala.',
      price:220,
      category:'egg',
      image:m6
    },
    {
      id:7,
      name:'veg Meals',
      rating:4,
      desc:'Complete South Indian vegetarian meal with fresh side dishes.',
      price:150,
      category:'veg',
      image:m7
    },
    {
      id:8,
      name:'Paneer Butter Masala',
      rating:5,
      desc:'Soft paneer cubes cooked in creamy butter tomato gravy.',
      price:260,
      category:'veg',
      image:m8
    },
    {
      id:9,
      name:'Tandoori Chicken',
      rating:5,
      desc:'Spicy roasted chicken cooked in traditional clay oven.',
      price:480,
      category:'chicken',
      image:m9
    },
    {
      id:10,
      name:'Shrimp Noodles',
      rating:4,
      desc:'Stir fried noodles mixed with fresh shrimp and Asian sauces.',
      price:340,
      category:'seafood',
      image:m10
    }
  ]

  const [category, setCategory] = useState("All");

  const filterProducts = menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || item.category === category;

    return matchSearch && matchCategory;
  })

   const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className='home-container-1'>
        <div className='hc1-col1'>
          <h2>Delicious Food Is <br /> Waiting For You</h2>

          <p>
            Freshly prepared meals made with love and the finest ingredients.
            Taste the happiness in every bite.
          </p>

          <button>ORDER NOW</button>
        </div>

        <div className='hc1-col2'>
          <img src={image1} alt="Delicious Food" />
        </div>
      </div>

      <div className='menu-section'>
        <h2>Top List</h2>
        <p>Our Signature Menu</p>

        <div>
          <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px" }}
      >
        <option value="All">All</option>
        <option value="chicken">Chicken</option>
        <option value="mutton">Mutton</option>
        <option value="prawns">Prawns</option>
        <option value="veg">Veg</option>
        <option value="egg">Egg</option>
        <option value="seafood">Seafood</option>
      </select>
        </div>
        <div className='menu-grid'>
          {filterProducts.map((item) => (
            <div className='menu-card' key={item.id}>
              <div className='menu-image'>
                <img src={item.image} alt={item.name} />
              </div>

              <h3>{item.name}</h3>

              <p className='desc'>{item.desc}</p>

              <div className='rating'>
                {"⭐".repeat(item.rating)}
              </div>

              <div className='price-cart'>
                <span className='price'>₹{item.price}</span>
                <button className='cart-btn' onClick={()=>addToCart(item)}>Add To Cart</button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home
