import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLoader2 } from 'react-icons/tb'
import { loginUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

export const Login = () => {
  const [userData, setUserData] = useState({});

  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const login = (e) => {
    e.preventDefault();

    const data = {
      email: userData.email,
      password: userData.password,
      googleLogin: false,
    };

    // console.log(data);

    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-custom-color md:px-12 px-4 flex justify-center items-center md:pb-7 pb-24">
      <div className="md:w-1/3 bg-white">
        <div className="py-6 px-7 md:px-8 w-full rounded shadow-sm shadow-gray-500">
          <div className="text-4xl font-semibold text-gray-900">Sign in</div>
          <form onSubmit={login} className="flex flex-col gap-3 mt-8">
            <div className="flex flex-col">
              <div className="flex items-center border border-gray-400 pl-1 py-1">
                <MdOutlineMailOutline className="text-gray-400" size={25} />
                <input
                  type="text"
                  required
                  placeholder="Enter your email"
                  className="px-2 py-1 w-full outline-none"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center border border-gray-400 pl-1 py-1">
                <RiLockPasswordLine className="text-gray-400" size={25} />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="px-2 py-1 w-full outline-none"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="pt-1">
              {!loading ? (
                <button
                  type="submit"
                  className="w-full font-semibold bg-orange-500 hover:bg-orange-600 py-1.5 rounded text-white"
                >
                  Sign in
                </button>
              ) : (
                <button
                  disabled={true}
                  className="w-full font-semibold flex justify-center items-center bg-orange-600 py-1.5 rounded text-white"
                >
                  <span className="animate-spin"><TbLoader2 size={25} /></span>
                </button>
              )}
            </div>
            <div className="text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-blue-600 underline">
                  Sign up
                </Link>{" "}
                now.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
