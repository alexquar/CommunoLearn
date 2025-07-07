'use client'
import Image from 'next/image'
import icon from '../../../public/plan-28.svg'
import { useState } from 'react'
import Link from 'next/link'
import useSignIn from '../hooks/useSignin'
import { useRouter } from 'next/navigation'
import ErrorNotification from '../_components/ErrorNotification'
import useSignInWithGoogle from '../hooks/useSigninWithGoogle'
import useResetPassword from '../hooks/useResetPassword'
import useSignInWithGithub from '../hooks/useSigninWithGithub'
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
      setError('Could not sign in with Google!')
    } else {
      console.log(result)
      router.push('/')
    }
  }

    const handleSigninWithGithub = async (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useSignInWithGithub()
    if (error) {
      console.log(error)
      setError('Could not sign in with Github!')
    } else {
      console.log(result)
      router.push('/')
    }
  }

  const handleResetPassword = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { result, error } = await useResetPassword(email)
    if (error) {
      console.log(error)
      setError('Could not reset password!')
    } else {
      console.log(result)
      window.alert('Password reset for the email you entered has been sent! Please check your inbox before proceeding.')
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
          Sign in to your Account
        </p>
      </div>

      <div className="px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignIn}  className="space-y-6">
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
                <p onClick={handleResetPassword} className="font-semibold hover:underline cursor-pointer text-secondaryBrand hover:text-secondaryBrand/75">
                  Reset password
                </p>
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
              Sign in with Email
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
                  <div>
            <button
              type="button"
              onClick={handleSigninWithGithub}
              className="flex mt-4 w-full align-items-center justify-center rounded-md bg-secondaryBrand px-3 py-1.5 text-sm font-semibold leading-6 text-backgroundBrand shadow-sm hover:bg-backgroundBrand border-secondaryBrand border-2 hover:text-secondaryBrand"
            >
                <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              <span>
              Sign in with Github
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
