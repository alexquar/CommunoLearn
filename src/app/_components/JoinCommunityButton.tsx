"use client"
import React from 'react'
import { api } from '~/trpc/react'
import { useState } from 'react'
import { useAuthContext } from '~/context/AuthContext'
import type { MemberOf } from '~/types/userTypes'
export default function JoinCommunityButton({id, members}: {id: number, members: MemberOf[]}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const {user} = useAuthContext();
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
    <>
    {!members.some((member) => member.id === user?.id) &&
    <button 
        onClick={handleClick}
        className="bg-secondaryBrand text-white py-2 px-4 mt-4 sm:mt-0 hover:bg-secondaryBrand/50 rounded-full">
        {error ? error : loading ? 'Joining...' : 'Join Community'}
        </button>
}
        </>
  )
}