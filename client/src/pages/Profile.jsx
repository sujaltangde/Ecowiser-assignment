import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../actions/userActions';
import { Loader } from '../components/Loader';


export const Profile = () => {
    const { isLogin, user, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate('/login');
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        dispatch(getUser())
    }, [])


    const changeDateFormat = (str) => {
        return str.split("/")[0] + "/" + str.split("/")[1] + "/" + str.split("/")[2];
    };


    return (
        <div className="bg-white min-h-screen flex flex-col items-center pt-20 md:px-14 px-10">
           {loading ? <div className='mt-10'><Loader/></div> : <div className='md:mt-10 mt-10 w-full flex md:flex-row flex-col md:justify-around text-center'>
                <div className="mt-4  text-left">
                    <h1 className='md:text-5xl text-4xl font-bold mb-10 text-orange-500'>Profile</h1>
                    <p className='md:text-2xl text-xl font-semibold text-gray-700'>
                        Name: <span className='text-gray-900'>{user.username || ""}</span>
                    </p>
                    <p className='md:text-2xl text-xl font-semibold text-gray-700 mt-4'>
                        Email: <span className='text-gray-900'>{user.email || ""}</span>
                    </p>
                    <p className='md:text-2xl text-xl font-semibold text-gray-700 mt-4'>
                        Joined on: <span className='text-gray-900'>{user.createdAt ? changeDateFormat(new Date(user.createdAt).toLocaleDateString()) : ""}</span>
                    </p>


                </div>

                <div className='md:mt-6 mt-12 md:px-0 px-8 flex flex-col gap-8'>
                    <Link to="/my-recipes" className='text-lg px-10 py-2 bg-orange-500 text-white font-semibold rounded-md'>My Recipes</Link>
                    <Link to="/add-recipe" className='text-lg px-10 py-2 bg-orange-500 text-white font-semibold rounded-md'>Add Recipe</Link>
                </div>
            </div>}
        </div>
    );
};


