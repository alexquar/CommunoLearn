import React from 'react'
import Link from 'next/link';

interface ErrorProps {
  statusCode: number;
  errorMessage: string;
  redirectLink: string;
  redirectPlace: string;
}

export default function Error({ statusCode, errorMessage, redirectLink, redirectPlace }: ErrorProps) {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-secondaryBrand">{statusCode}</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-accentBrand sm:text-5xl">Whoops, an Error Occured :(</h1>
      <p className="mt-6 text-base leading-7 text-textBrand">{errorMessage}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href={redirectLink}
          className="rounded-xl bg-primaryBrand px-3.5 py-2.5 text-sm font-semibold hover:text-primaryBrand text-white shadow-sm border hover:bg-backgroundBrand border-primaryBrand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go to {redirectPlace}
        </Link>
      </div>
    </div>
  </main>
  )
}
