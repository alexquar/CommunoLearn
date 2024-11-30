"use client"
import { useAuthContext } from '~/context/AuthContext'
import { api } from '~/trpc/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function DeleteCommunity({
    id,
    ownerId
}:{
    id: number,
    ownerId: string
}) {
    const router = useRouter()
    const {user} = useAuthContext()
    const [loading, setLoading] = useState(false); 
    const {mutate:deleteCommunity} = api.communities.deleteCommunity.useMutation({
        onSuccess: () => {
            setLoading(false)
            router.push('/communities')
        },
        onError: (error) => {
            console.error(error)
            setLoading(false)
        }
    });
    const handleDelete = () => {   
        setLoading(true)
        deleteCommunity({
            id
        });
    }

  return (
    <>
{user?.id !== ownerId && (
<button onClick={handleDelete} className='rounded-3xl px-10 py-3 text-white hover:bg-secondaryBrand/75 bg-secondaryBrand'>
  {loading ? 'Deleting...' : 'Delete Community'}
</button>
)}
    </>
  )
}
