import React from 'react'
import Link from 'next/link'
export default function notFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-secondaryBrand">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-accentBrand sm:text-5xl">Not Found :(</h1>
      <p className="mt-6 text-base leading-7 text-textBrand">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="rounded-xl bg-primaryBrand px-3.5 py-2.5 text-sm font-semibold hover:text-primaryBrand text-white shadow-sm border hover:bg-backgroundBrand border-primaryBrand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
        <a href="#" className="text-sm font-semibold text-textBrand">
          Contact support <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  </main>
  )
}
