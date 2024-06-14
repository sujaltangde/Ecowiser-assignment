import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
   <> 

<footer className="bg-gray-900 py-6 md:px-10 px-8 text-white">
      <div className=" flex md:flex-row flex-col md:justify-between justify-center items-center">
        <div className='md:text-left text-center'>
          <p className="md:text-xl text-2xl font-semibold">MealMatrix</p>
          <p className="md:text-sm text-xs md:px-0 px-12 ">Crafting Culinary Adventures, One Recipe at a Time</p>
        </div>

        <div>
          <ul className="flex  md:gap-10 gap-4 md:mt-0 mt-6">
            <li>
              <Link to="/" className="md:text-base text-sm hover:text-orange-500">Home</Link>
            </li>
            <li>
              <Link to="/about" className="md:text-base text-sm hover:text-orange-500">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="md:text-base text-sm hover:text-orange-500">Contact Us</Link>
            </li>
            <li>
              <Link to="/recipes" className="md:text-base text-sm hover:text-orange-500">Recipes</Link>
            </li>
          </ul>
        </div>

        <p className="md:text-sm text-xs mt-6">&copy; 2024 MealMatrix. All Rights Reserved.</p>
      </div>
    </footer>
   
   </>
  )
}
