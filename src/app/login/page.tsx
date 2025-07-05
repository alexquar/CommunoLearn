'use client'
import Image from 'next/image'
import icon from '../../../public/plan-28.svg'
import { useState } from 'react'
import Link from 'next/link'
import useSignIn from '../hooks/useSignin'
import { useRouter } from 'next/navigation'
import ErrorNotification from '../_components/ErrorNotification'
import useSignInWithGoogle from '../hooks/useSigninWithGoogle'
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useSignIn(email, password)
    if (error) {
      console.log(error)
      setError('Invalid email or password')
      setPassword('')
    } else {
      console.log(result)
      router.push('/')
    }
  }

  const handleSignInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useSignInWithGoogle()
    if (error) {
      console.log(error)
      setError('Invalid email or password')
      setPassword('')
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
                <a href="https://u-passwords.web.app/login" className="font-semibold text-secondaryBrand hover:text-secondaryBrand/75">
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
                className={`block w-full rounded-md border-0 py-1.5 px-1 outline-accentBrand text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand ${error && "ring-red-500 outline-red-500"} sm:text-sm sm:leading-6`}
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
        <div>
            <button
              type="button"
              onClick={handleSignInWithGoogle}
              className="flex mt-4 w-full align-items-center justify-center rounded-md bg-secondaryBrand px-3 py-1.5 text-sm font-semibold leading-6 text-backgroundBrand shadow-sm hover:bg-backgroundBrand border-secondaryBrand border-2 hover:text-secondaryBrand"
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span>
              Sign in with Google
              </span>
            </button>
          </div>

        {
          error && (
            <div className="mt-4">
            <ErrorNotification
              message={error}
              />
              </  div>
          )
        }

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
