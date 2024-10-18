import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const error = true;
  void api.post.getLatest.prefetch();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <HydrateClient>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primaryBrand">
              Learn Together
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-accentBrand sm:text-4xl">
              Your Ideal Environment for Group Progess
            </p>
            <p className="mt-6 text-lg leading-8 text-textBrand">
              Here at CommunoLearn we strive to give you the best possible
              environment to work on as a group. Whether you&apos;re a design
              team, study group, startup or just planning a vacation with
              friends. We make it easy to schedule meetings, compare schedules,
              share todos and get stuff done.{" "}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-accentBrand">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBrand">
                    <svg
                      width="100px"
                      height="100px"
                      viewBox="0 0 1024 1024"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M224.3 251.4h556.2c14.3 0 25.9 11.6 25.9 25.9v501.8c0 14.3-11.6 25.9-25.9 25.9H224.3c-14.3 0-25.9-11.6-25.9-25.9V277.3c0-14.3 11.6-25.9 25.9-25.9z"
                          fill="#f6f6f6"
                        ></path>
                        <path
                          d="M780.5 830.8H224.3c-28.5 0-51.7-23.2-51.7-51.7V277.3c0-28.5 23.2-51.7 51.7-51.7h556.2c28.5 0 51.7 23.2 51.7 51.7v501.8c0 28.5-23.2 51.7-51.7 51.7zM224.3 277.3v501.8h556.2V277.3H224.3z"
                          fill="#777b83"
                        ></path>
                        <path
                          d="M224.3 277h568.5v152.1H224.3z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M198.4 399.5h633.8v51.8H198.4zM495.6 638.8l101-101c11.8-11.8 30.9-11.8 42.7 0l0.1 0.1c11.8 11.8 11.8 30.9 0 42.7L518.7 701.2c-6.3 6.3-14.8 9.3-23.1 8.8-8.3 0.5-16.7-2.5-23.1-8.8l-76-76c-11.8-11.8-11.8-30.9 0-42.7l0.1-0.1c11.8-11.8 30.9-11.8 42.7 0l56.3 56.4z"
                          fill="#777b83"
                        ></path>
                        <path
                          d="M327.7 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c0-14.4 11.6-25.9 25.8-25.9zM664.1 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c-0.1-14.4 11.5-25.9 25.8-25.9z"
                          fill="#777b83"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  Schedule tasks together
                </dt>
                <dd className="mt-2 text-base leading-7 text-textBrand">
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-accentBrand">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBrand">
                    <svg
                      viewBox="0 0 1024 1024"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M379.733333 386.133333l-157.866666 155.733334-89.6-87.466667L85.333333 501.333333l136.533334 136.533334 204.8-204.8zM379.733333 108.8l-157.866666 155.733333-89.6-87.466666L85.333333 224l136.533334 136.533333L426.666667 155.733333zM379.733333 663.466667l-157.866666 155.733333-89.6-87.466667L85.333333 778.666667l136.533334 136.533333 204.8-204.8z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M512 469.333333h426.666667v85.333334H512zM512 192h426.666667v85.333333H512zM512 746.666667h426.666667v85.333333H512z"
                          fill="#f6f6f6"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  Plan your action items
                </dt>
                <dd className="mt-2 text-base leading-7 text-textBrand">
                  Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
                  eget. Sem sodales gravida quam turpis enim lacus amet.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-accentBrand">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBrand">
                    <svg
                      width="102px"
                      height="102px"
                      viewBox="-307.2 -307.2 1638.40 1638.40"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                          fill="#e6e6e6"
                        ></path>
                        <path
                          d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                          fill="#e6e6e6"
                        ></path>
                        <path
                          d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                          fill="#e6e6e6"
                        ></path>
                      </g>
                    </svg>{" "}
                  </div>
                  Message community members
                </dt>
                <dd className="mt-2 text-base leading-7 text-textBrand">
                  Quisque est vel vulputate cursus. Risus proin diam nunc
                  commodo. Lobortis auctor congue commodo diam neque.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-accentBrand">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primaryBrand">
                    <svg
                      width="102px"
                      height="102px"
                      viewBox="-163.84 -163.84 1351.68 1351.68"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M388.9 597.4c-135.2 0-245.3-110-245.3-245.3s110-245.3 245.3-245.3 245.3 110 245.3 245.3-110.1 245.3-245.3 245.3z m0-405.3c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160-71.8-160-160-160z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M591.3 981.3H186.5c-76.6 0-138.8-62.3-138.8-138.8V749c0-130.6 106.2-236.9 236.9-236.9h208.8c130.6 0 236.9 106.3 236.9 236.9v93.5c-0.2 76.5-62.4 138.8-139 138.8zM284.5 597.4c-83.6 0-151.5 68-151.5 151.5v93.5c0 29.5 24 53.5 53.5 53.5h404.8c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5H284.5z"
                          fill="#ee6605"
                        ></path>
                        <path
                          d="M847.2 938.6c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5h-14.3c-19.8 0-37-13.6-41.5-32.9-4.5-19.3 4.8-39.1 22.5-48 54.8-27.3 88.9-82.1 88.9-143.1 0-88.2-71.8-160-160-160-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c135.2 0 245.3 110 245.3 245.3 0 57.8-19.9 111.9-54.9 154.8 88.3 34.6 151 120.6 151 220.9v93.5c0 76.6-62.3 138.8-138.9 138.8z"
                          fill="#f6f6f6"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  Tight-knit communities
                </dt>
                <dd className="mt-2 text-base leading-7 text-textBrand">
                  Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt
                  mattis aliquet hac quis. Id hac maecenas ac donec pharetra
                  eget.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
