"use server"
import React from 'react'

export default async function ButtonClient(props: {title: string, funcOnClick: ()=>void}) {
    const {title, funcOnClick} = props;
  return (
    <span 
        role="button"
        //fix
        className="bg-secondaryBrand text-white py-2 px-4 mt-4 sm:mt-0 hover:bg-secondaryBrand/50 rounded-full">
        {title}
        </span>
  )
}