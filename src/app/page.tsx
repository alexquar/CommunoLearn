import { HydrateClient } from "~/trpc/server";
export const dynamic = "force-dynamic";

import Link from "next/link";
import HomePageSearch from "./_components/HomePageSearch";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-sm font-semibold text-primaryBrand tracking-wide uppercase">
              Do It Together
            </h2>
            <p className="mt-4 text-4xl font-extrabold text-accentBrand sm:text-5xl">
              Collaborate with Purpose
            </p>
            <p className="mt-6 text-lg text-textBrand leading-8">
              At CommunoLearn, we provide the perfect space for teams, study
              groups, startups, and even travel buddies to plan, collaborate,
              and stay productive. From syncing calendars to sharing tasks —
              everything gets done together.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-4xl grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                title: "Schedule tasks together",
                desc: "Create shared goals and timelines with your group to ensure you're aligned and on track.",
                icon: "📅",
              },
              {
                title: "Plan your action items",
                desc: "Organize tasks into actionable steps and assign responsibilities.",
                icon: "📝",
              },
              {
                title: "Message community members",
                desc: "Communicate in real-time or asynchronously to keep the momentum going.",
                icon: "💬",
              },
              {
                title: "Tight-knit communities",
                desc: "Keep your group connected with private spaces designed for focus and collaboration.",
                icon: "👥",
              },
            ].map((feature, index) => (
              <div key={index} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBrand text-white text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-accentBrand">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-textBrand">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-backgroundBrand py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid max-w-4xl mx-auto lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primaryBrand sm:text-4xl">
                Get Started
              </h2>
              <p className="mt-4 text-lg leading-8 text-textBrand">
                Communities are where work gets done in CommunoLearn. Join a
                public space, create your own, or begin in your private zone.
              </p>
              <div className="mt-6">
                <HomePageSearch />
              </div>
            </div>

            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
              <div>
                <dt className="text-lg font-medium text-secondaryBrand">
                  Create a community
                </dt>
                <dd className="mt-2 text-textBrand">
                  <Link
                    className="inline-block text-sm text-primaryBrand hover:text-primaryBrand/80 underline"
                    href="/communities/new"
                  >
                    Visit this page
                  </Link>{" "}
                  to start your own CommunoLearn space.
                </dd>
              </div>

              <div>
                <dt className="text-lg font-medium text-secondaryBrand">
                  Your personal zone
                </dt>
                <dd className="mt-2 text-textBrand">
                  <Link
                    className="inline-block text-sm text-primaryBrand hover:text-primaryBrand/80 underline"
                    href="/myzone"
                  >
                    Visit this page
                  </Link>{" "}
                  to work solo in your private productivity space.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
