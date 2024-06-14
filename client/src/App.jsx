
import { useEffect, useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IsLogin, getUser } from './actions/userActions'
import { ToastContainer } from 'react-toastify'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import 'react-toastify/dist/ReactToastify.css';
import { Profile } from './pages/Profile'
import { MyRecipes } from './pages/MyRecipes'
import { AddRecipe } from './pages/AddRecipe'
import { Recipes } from './pages/Recipes'
import { Recipe } from './pages/Recipe'
import { EditRecipe } from './pages/EditRecipe'




const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector(state => state.user);
  let location = useLocation();

  if (!isLogin) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }
  return children

};



function App() {



  const { isLogin } = useSelector(state => state.user);


  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUser());

  }, [dispatch, isLogin]);

  useEffect(() => {
    const LogOrNot = () => {
      dispatch(IsLogin());
    }
    LogOrNot()
  }, []);








  return (
    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />



        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
        <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
        <Route path="/recipe/:recipeId" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
        <Route path="/edit-recipe/:recipeId" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />





      </Routes>

      <Footer />


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-14 font-bold  "

      />








    </>
  )
}

export default App
