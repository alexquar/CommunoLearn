import Link from "next/link";
import Image from "next/image";
import { type Community } from "@prisma/client";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-borderBrand bg-white p-5 shadow-sm hover:shadow-md transition min-h-[240px]">
      <div>
        <div className="flex items-center gap-4">
          {community.icon && (
            <Image
              src={community.icon ? String(community.icon) : "/default-community-icon.png"}
              alt={`${community.name} icon`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-gray-100 object-cover"
            />
          )}
          <div className="flex flex-col">
            <h3 className="text-md font-semibold text-textBrand">
              {community.name}
            </h3>
            <p className="text-xs text-accentBrand">
              Members: {community.numberOfMembers}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-textBrand line-clamp-2 break-words">
          {community.aboutCommunity}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          href={`/communities/${community.id}`}
          className="inline-flex items-center rounded-full bg-secondaryBrand px-4 py-2 text-sm text-white hover:bg-secondaryBrand/80 transition"
        >
          Read more
          <svg
            className="ml-2 h-4 w-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
