


"use client"
import { useState } from "react"
import { api } from "~/trpc/react"




export default function NewCommunity() {
  //might get passed a name we will see
  const {mutate, error} = api.communities.newCommunity.useMutation({
    onSuccess: () => {
      console.log("Community Created")
  },
    onError: (error) => {
      console.error(error)
    }
})

    const [name, setName] = useState("")
    const [aboutCommunity, setAboutCommunity] = useState("")
    const [locationCommunity, setLocationCommunity] = useState("")
    const [email, setEmail] = useState("")
    const [sloganCommunity, setSloganCommunity] = useState("")
    const [communityType, setCommunityType] = useState("")
    const [privateCommunity, setPrivateCommunity ] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleCreate = async (e: React.FormEvent) => {
      e.preventDefault()
      if((password !== confirmPassword) && privateCommunity){
        alert("Passwords do not match")
        //set an error here
        return
      } 

      mutate({
        name,
        aboutCommunity,
        locationCommunity,
        ownerEmail:email,
        sloganCommunity,
        communityType,
        private: privateCommunity,
        password
      })
    }

  return (
   <form className="m-10 md:mx-auto md:w-3/4 lg:w-1/2">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-4xl my-8 font-semibold leading-7 text-primaryBrand">Create a community</h2>
          <p className="mt-1 text-base leading-6 text-textBrand">
            You&apos;ve decided to make a community? That is amazing! Let&apos;s begin by filling out the form below so we can get you some members and get you started.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
            <h1 className="text-lg font-bold leading-7 my-10 text-accentBrand">Basic Info</h1>

              <label htmlFor="username" className="block text-sm font-medium leading-6 text-secondaryBrand">
                Community Name
              </label>
              <div className="mt-2">
                <input
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                  type="text"
                  placeholder="The perfect name"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand outline-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-secondaryBrand">
                About
              </label>
              <div className="mt-2">
                <textarea
                value = {aboutCommunity}
                onChange = {(e) => setAboutCommunity(e.target.value)}
                  rows={3}
                  className="block w-full px-2 rounded-md border-0 py-1.5  text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand outline-accentBrand sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your community.</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Other Info</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Other important information CommunoLearn users should now about your community.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Server Contact Adress
              </label>
              <div className="mt-2">
                <input
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="WhereToContactTheCommunity@gmail.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="col-span-4">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-secondaryBrand">
                Slogan
              </label>
              <div className="mt-2">
                <textarea
                value = {sloganCommunity}
                onChange = {(e) => setSloganCommunity(e.target.value)}
                  rows={2}
                  className="block w-full px-2 rounded-md border-0 py-1.5  text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand outline-accentBrand sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Give your community a memorable sentence.</p>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Community Type
              </label>
              <div className="mt-2">
                <select
                  value = {communityType}
                  onChange = {(e) => setCommunityType(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Class</option>
                  <option>High School Club</option>
                  <option>University Club</option>
                  <option>Workplace</option>
                  <option>Friend Group</option>
                  <option>Event Planning</option>
                  <option>Team</option>
                  <option>Commitee</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  value = {locationCommunity}
                  onChange = {(e) => setLocationCommunity(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
          </div>
          <p className="mt-12 text-base font-bold leading-6 text-primaryBrand">More custom community info coming the future!</p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-lg my-10 font-bold leading-7  text-accentBrand">Privacy</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Would you like your community to be publicly viewable/joinable. (Communities are public by default)
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      checked={privateCommunity}
                      onChange={() => setPrivateCommunity(!privateCommunity)}
                      type="checkbox"
                      className="h-4 w-4 rounded border-accentBrand text-accentBrand focus:ring-accentBrand accent-textBrand"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-secondaryBrand">
                      Private Community?
                    </label>
                    <p className="text-gray-500">Will hide your community and require a password to join</p>
                  </div>
                  
                </div>
            {privateCommunity &&
              <section>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-secondaryBrand">
                Password
              </label>
              <div className="mt-2">
                <input
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="The perfect password"
                  className="block md:w-1/2 w-full px-2 rounded-md border-0 py-1.5 text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand outline-accentBrand sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="username" className="block text-sm font-medium leading-6 text-secondaryBrand">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  value = {confirmPassword}
                  onChange = {(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="The perfect password pt2"
                  className="block md:w-1/2 w-full px-2 rounded-md border-0 py-1.5 text-textBrand shadow-sm ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand outline-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
              </section>
}
      
              </div>
            </fieldset>
            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <span className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </span>
        <button
          onClick={handleCreate}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
