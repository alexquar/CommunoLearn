'use client'

import React, { useState } from 'react'
import { api } from '~/trpc/react'
import { useAuthContext } from '~/context/AuthContext'
import type { MemberOf } from '~/types/userTypes'
import { useRouter } from 'next/navigation'
import ErrorNotification from '../_general/ErrorNotification'

export default function JoinCommunityButton({
  id,
  members,
}: {
  id: number
  members: MemberOf[]
}) {
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()
  const [error, setError] = useState('')
  const router = useRouter()

  const { mutate } = api.communities.addUserToCommunity.useMutation({
    onSuccess: () => {
      setError('')
      setLoading(false)
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      setError('An error occurred while joining the community.')
      setLoading(false)
    },
  })

  const handleClick = () => {
    setLoading(true)
    setError('')
    mutate({
      communityId: id,
      userId: user?.id ?? '',
    })
  }

  const isMember = members.some((member) => member.id === user?.id)

  return (
    <div className="flex flex-col">
      {!isMember && (
        <>
          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-secondaryBrand text-white py-2 px-4 mt-4 sm:mt-0 hover:bg-secondaryBrand/50 rounded-full disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join Community'}
          </button>

          {error && (
            <div className="mt-2">
              <ErrorNotification message={error} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
