import React from 'react'
import { FaFacebook, FaLinkedinIn, FaTwitter, FaX, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-center text-teal-600">
                 <Link to={'/'}>
                    <img src="/logo.png" width={100} height={70} className='rounded'/>
                 </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
                The planet's most trusted car dealer, your plug for any type or model of car, new or old, electric, fuel, or diesel car. 
            </p>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
                <Link to={'/about'} className="text-gray-700 transition hover:text-gray-700/75"> About </Link>
            </li>

            <li>
                <Link to={'/careers'} className="text-gray-700 transition hover:text-gray-700/75"> Careers </Link>
            </li>

            <li>
                <Link to={'/history'} className="text-gray-700 transition hover:text-gray-700/75"> History </Link>
            </li>

            <li>
                <Link to={'/service'} className="text-gray-700 transition hover:text-gray-700/75"> Services </Link>
            </li>

            <li>
                <Link to={'/projects'} className="text-gray-700 transition hover:text-gray-700/75"> Projects </Link>
            </li>

            </ul>

            <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                <li>
                    <Link to={""}> 
                        <FaFacebook/>
                    </Link>
                </li>
                 <li>
                    <Link to={""}> 
                        <FaLinkedinIn/>
                    </Link>
                </li>
                 <li>
                    <Link to={""}> 
                        <FaXTwitter/>
                    </Link>
                </li>
            </ul>
        </div>
        </footer>
    </div>
  )
}

export default Footer
