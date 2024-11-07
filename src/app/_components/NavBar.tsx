/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import logo from "../../../public/plan-28.svg"

export default function NavBar(){
    const [dropdown, setDropdown] = useState(false)
  return (
    <nav className="bg-backgroundBrand md:shadow-lg p-10 flex justify-between flex-row border-gray-200">
    <div className="flex ">
    <span>
        <Image src={logo} width={32} className="h-8 hidden md:block" alt="Flowbite Logo" />
        </span>
        <Link href="/" className="text-2xl md:ms-5 font-semibold hover:cursor-pointer whitespace-nowrap text-textBrand">CommunoLearn</Link>
    </div>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
        <li>
          <Link href="#" className="block py-2 px-3 text-secondaryBrand hover:text-secondaryBrand/75 0 rounded md:bg-transparent md:p-0" aria-current="page">Home</Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-3 text-textBrand hover:underline rounded md:hover:bg-transparent md:p-0 ">About</Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-3 text-textBrand hover:underline rounded md:hover:bg-transparent md:p-0 ">Services</Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-3 text-textBrand hover:underline rounded md:hover:bg-transparent md:p-0 ">Pricing</Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-3 text-textBrand hover:text-accentBrand hover:font-bold underline rounded md:hover:bg-transparent md:p-0 ">Sign Out</Link>
        </li>
        <li>
          
        </li>
      </ul>
    </div> 


    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
      <li>
        
      </li>
      <li>
        <Link href="/signup" className="block py-2 px-3 text-textBrand hover:underline rounded md:hover:bg-transparent md:p-0 ">Signup</Link>
      </li>
      <li>
        <Link href="/login" className="block py-2 px-3 text-textBrand hover:underline rounded md:hover:bg-transparent md:p-0 ">Login</Link>
      </li>
    </ul>
  </div>

    <div className="block md:hidden">
    <button onClick={()=>setDropdown(!dropdown)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-secondaryBrand border border-backgroundBrand hover:text-secondaryBrand hover:border-secondaryBrand hover:bg-backgroundBrand outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Options<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>
</div>
{dropdown &&
<>
    <div id="dropdownNavbar" className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100 ">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100 ">Settings</Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</Link>
                </div>
            </div>
        <div id="dropdownNavbar" className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
          <li>
            <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Signup</Link>
          </li>
          <li>
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
          </li>
          
        </ul>
  
    </div>
    </> 
}

</nav>
  )
}