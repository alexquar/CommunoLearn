import React from 'react'

export default function Blob({title, color = "primaryBrand"}: {title: string, color?: string}) {
  return (
    <span
                className={`relative z-10 rounded-full bg-${color} px-3 py-1.5 font-medium text-white hover:bg-${color}/50`}
              >
                {title}
              </span>
  )
}
