import React from 'react'

export const About = () => {
    return (
        <>

            <div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-10">
                <div className='md:mt-16 mt-10 max-w-4xl text-center'>
                    <h1 className='md:text-5xl text-4xl font-bold text-orange-500'>About MealMatrix</h1>
                    <p className='md:text-lg text-md mt-5 text-gray-700'>
                        MealMatrix is your ultimate destination for exploring delicious recipes and culinary creations.
                        Our mission is to bring joy to your kitchen and make cooking an enjoyable experience for everyone.
                        Whether you are a seasoned chef or a beginner, we have something for you.
                        Join us on a flavorful journey and discover the art of cooking with MealMatrix.
                    </p>
                    <p className='md:text-lg text-md mt-5 text-gray-700'>
                        At MealMatrix, we believe that cooking should be fun, creative, and accessible to all.
                        Our curated collection of recipes spans various cuisines and dietary preferences, ensuring that there is something for everyone.
                        From quick weeknight dinners to elaborate gourmet dishes, you'll find it all here.
                    </p>
                </div>
            </div>

        </>
    )
}
