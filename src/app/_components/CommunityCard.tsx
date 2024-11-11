import Link from 'next/link';
import { type Community } from '@prisma/client'
export default function CommunityCard(props: {community: Community}) {
const {community} = props;
  return (
    <div className="max-w-sm p-8 bg-white border border-primaryBrand rounded-3xl shadow-sm shadow-primaryBrand ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-accentBrand">{community.name}</h5>
    <p className="mb-3 font-normal text-wrap break-words text-textBrand ">
    {community.aboutCommunity.length > 34 ? community.aboutCommunity.substring(0, 34) + '...' : community.aboutCommunity}
    </p>
    <div className="flex justify-between items-center">
    <Link href={`/communities/${community.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondaryBrand hover:bg-secondaryBrand/50  rounded-full focus:ring-4 focus:outline-none focus:ring-secondaryBrand/50">
        Read more
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
    <p className='text-textBrand'>
    Members: {community.numberOfMembers}
    </p>
    </div>
</div>
  )
}
