import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Avatar, Menu, MenuItem, Popover } from '@mui/material';
import { toast } from 'react-toastify';
import { IsLogin } from '../actions/userActions';


const avatars = [
  { src: "/assets/peng.png" },
  { src: "/assets/owl.png" },
  { src: "/assets/horse.png" },
  { src: "/assets/fox.png" },
  { src: "/assets/dog.png" }
];



export const Navbar = () => {


  const { user, isLogin } = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [toggle, setToggle] = useState(false);
  const userEmail = user.email || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const simpleHash = (str) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
    }
    return Math.abs(hash);
  };

  const getProfileImageIndex = (userEmail) => {
    const hashedInt = simpleHash(userEmail);
    return hashedInt % avatars.length;
  };

  useEffect(() => {
    if (userEmail) {
      const avatarIndex = getProfileImageIndex(userEmail);
      setUserAvatar(avatars[avatarIndex].src);
    }
  }, [userEmail]);

  const logOut = () => {
    localStorage.removeItem('accesstoken');
    dispatch(IsLogin());
    navigate('/');
    setToggle(false);
    toast.success("LogOut Successful !");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  return (
    <nav className="bg-white z-10 md:py-4 py-3 fixed min-w-full border-b bg-opacity-85 backdrop-filter backdrop-blur-sm">
      <div className=" md:px-12  px-5  flex justify-between items-center">
        <Link to="/" className="text-black md:text-3xl text-2xl font-bold">
          <span className='text-orange-500'>Meal</span>Matrix
        </Link>
        <div className='flex justify-center items-center gap-12'>
          <ul className=" gap-12 justify-center items-center md:flex hidden">

            {isLogin && <Link to="/recipes" className="text-black hover:text-orange-500 text-lg font-semibold">
              Recipes
            </Link>}

            <Link to="/about" className="text-black hover:text-orange-500 text-lg font-semibold">
              About
            </Link>

            <Link to="/contact" className="text-black hover:text-orange-500 text-lg font-semibold">
              Contact
            </Link>
          </ul>




          {isLogin ? <div className=" flex">
            <IconButton sx={{ p: 0 }} onClick={handleMenuOpen}>
              <Avatar alt="Remy Sharp" src={userAvatar} sx={{ width: 35, height: 35 }} />
            </IconButton>
          </div> : <Link to="/auth/login" className="bg-orange-500 md:flex hidden hover:bg-orange-600 text-white md:text-sm text-xs  py-2 px-4 rounded-md font-semibold">
            Sign In
          </Link>}



          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            // disableScrollLock={true}
           
          >

         
            <MenuItem onClick={() => {
              navigate("/profile")
              handleMenuClose()
            }} >


              <p className='font-semibold'>Profile</p>



            </MenuItem>
            <MenuItem onClick={() => {
              logOut()
              handleMenuClose()
            }}  >
              <p className='text-red-600 font-semibold'>Logout</p>
            </MenuItem>
            </Menu>



          <div className='md:hidden flex'>
            <div onClick={() => setToggle(e => !e)}>
              {toggle ? <RxCross2 size={27} /> : <FaBars size={25} />}
            </div>
          </div>

        </div>


      </div>

      <div className={`md:hidden ${toggle ? "flex" : "hidden"} pt-6 pb-3 pl-8 `}>
        <ul className=" gap-5 flex flex-col">

          {isLogin && <Link to="/recipes" onClick={() => setToggle(e => !e)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Recipes
          </Link>}

          <Link to="/about" onClick={() => setToggle(e => !e)} className="text-black hover:text-orange-500 text-lg font-semibold">
            About
          </Link>

          <Link to="/contact" onClick={() => setToggle(e => !e)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Contact
          </Link>

          <Link to="/auth/login" onClick={() => setToggle(e => !e)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Sign in
          </Link>



        </ul>
      </div>



    </nav>

  )
}
