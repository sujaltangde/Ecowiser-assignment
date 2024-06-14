import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';


export const Home = () => {

  
  const { user, isLogin } = useSelector(state => state.user);

  const navigate = useNavigate();
  


  const handleExplore = ()=>{
    if(isLogin){
      navigate("/recipes");
    }else{
      navigate("/auth/login");
      toast.info("Please login to view recipes!")
    }
  }

  return (
    <>

      <div className="bg-white min-h-screen items-center flex flex-col pt-20 md:px-14 px-10">
        <div className=' md:mt-16 mt-10'>
          <p className=' md:text-5xl  text-4xl font-bold text-center '>Experience the Joy of </p><p className=' md:text-5xl  text-4xl font-bold text-center md:pt-2' > <span className='text-orange-500'>Cooking</span> with <span className='text-orange-500'>MealMatrix</span> </p>
          <p className='md:text-sm  text-xs mt-5 text-gray-700 font-semibold text-center'>Explore a World of Delicious Recipes and Culinary Creations with MealMatrix.</p>
        </div>
        <div className='md:mt-8 mt-10'>
          <button onClick={handleExplore}  className='bg-orange-500 hover:bg-orange-600 font-semibold rounded-md text-white md:text-xl text-lg py-1.5 px-10'>Explore Recipes</button>
        </div>
      </div>


    </>
  )
}
