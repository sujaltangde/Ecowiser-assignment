import React from 'react'

export const Contact = () => {
  return (
    <>

<div className="bg-white min-h-screen flex flex-col items-center pt-20 pb-20 md:px-14 px-10">
      <div className='md:mt-16 mt-10 max-w-4xl text-center'>
        <h1 className='md:text-5xl text-4xl font-bold text-orange-500'>Contact Us</h1>
        <p className='md:text-lg text-md mt-5 text-gray-700'>
          We would love to hear from you! Whether you have a question, feedback, or just want to share your cooking experiences, 
          feel free to reach out to us. Your input helps us improve and provide you with the best possible service.
        </p>
        <form className='mt-10'>
          <div className='mb-4'>
            <input 
              type="text" 
              placeholder="Your Name" 
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500'
            />
          </div>
          <div className='mb-4'>
            <input 
              type="email" 
              placeholder="Your Email" 
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500'
            />
          </div>
          <div className='mb-4'>
            <textarea 
              placeholder="Your Message" 
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500' 
              rows="5"
            />
          </div>
          <button type="submit" className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md'>
            Send Message
          </button>
        </form>
      </div>
    </div>

    </>
  )
}
