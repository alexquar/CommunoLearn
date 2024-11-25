'use client'
import Image from 'next/image'
import icon from '../../../public/plan-28.svg'
import { useState } from 'react'
import Link from 'next/link'
import useSignIn from '../hooks/useSignin'
import { useRouter } from 'next/navigation'
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useSignIn(email, password)
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      router.push('/')
    }
  }
  return (
    <>

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Image
          alt="communolearn logo"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={icon}
          className="mx-auto h-16 sm:h-20 w-auto"
        />
        <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryBrand">
          Sign in with your email
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-textBrand">
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='identifier'
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
  </>
  )
}
