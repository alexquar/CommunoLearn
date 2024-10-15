import React from 'react'
import Image from 'next/image'
import icon from '../../../public/plan-28.svg'
import Link from 'next/link'
export default function login() {
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="communolearn logo"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={icon}
          className="mx-auto h-16 sm:h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryBrand">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-textBrand">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-1 outline-accentBrand text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-textBrand">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-secondaryBrand hover:text-secondaryBrand/75">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-1 outline-accentBrand text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primaryBrand px-3 py-1.5 text-sm font-semibold leading-6 text-backgroundBrand shadow-sm hover:bg-backgroundBrand border-primaryBrand border-2 hover:text-primaryBrand"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link href="/signup" className="font-semibold leading-6 text-secondaryBrand hover:text-secondaryBrand/75">
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}
