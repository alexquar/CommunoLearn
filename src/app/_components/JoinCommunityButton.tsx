"use client"
import React from 'react'
import { api } from '~/trpc/react'
import { useState } from 'react'



export default function JoinCommunityButton({id}: {id: number}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { mutate } = api.communities.addUserToCommunity.useMutation({
    onSuccess: () => {
      setError("");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setError("Error Occured!");
      setLoading(false);
    },
  })
  


    const handleClick = async () => {
      setLoading(true);
      setError("");
      mutate({
        communityId: id,
        userId: "cm2avbnnf0000buxc4t44yo3p"
      });
    }

  return (
    <button 
        onClick={handleClick}
        className="bg-secondaryBrand text-white py-2 px-4 mt-4 sm:mt-0 hover:bg-secondaryBrand/50 rounded-full">
        {error ? error : loading ? 'Joining...' : 'Join Community'}
        </button>
  )
}