"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import ErrorNotification from "~/app/_components/ErrorNotification";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingNotification from "~/app/_components/LoadingNotification";
import { useAuthContext } from "~/context/AuthContext";
import Loading from "~/app/loading";

export default function NewCommunity() {
  const { user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingCommunityId = searchParams.get("existing");

  const { mutate: create } = api.communities.newCommunity.useMutation({
    onSuccess: () => {
      setError(null);
      setLoading(false);
      router.push("/communities"); // Navigate to the communities page on success
    },
    onError: (error) => {
      console.error(error);
      setError("Community could not be created!");
      setLoading(false);
    },
  });

  const { mutate: update } = api.communities.updateCommunityById.useMutation({
    onSuccess: () => {
      setError(null);
      setLoading(false);
      router.push(`/communities/${existingCommunityId}`); // Navigate to the communities page on success
    },
    onError: (error) => {
      console.error(error);
      setError("Community could not be updated!");
      setLoading(false);
    },
  });

  const [name, setName] = useState("");
  const [aboutCommunity, setAboutCommunity] = useState("");
  const [locationCommunity, setLocationCommunity] = useState("");
  const [email, setEmail] = useState("");
  const [sloganCommunity, setSloganCommunity] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [privateCommunity, setPrivateCommunity] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing community data if `existingCommunityId` is present
  const { data, isLoading: isFetching } =
    api.communities.getCommunityWithRelations.useQuery(
      { id: Number(existingCommunityId) },
      { enabled: !!existingCommunityId }, // Only fetch if `existingCommunityId` is truthy
    );

  useEffect(() => {
    if (data) {
      setName(data.name ?? "");
      setAboutCommunity(data.aboutCommunity ?? "");
      setLocationCommunity(data.locationCommunity ?? "");
      setEmail(data.ownerEmail ?? "");
      setSloganCommunity(data.sloganCommunity ?? "");
      setCommunityType(data.communityType ?? "");
      setPrivateCommunity(data.private ?? false);
      setPassword(data.password ?? "");
      setConfirmPassword(data.password ?? "");
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic form validation
    if (!name) {
      setError("Community name is required");
      setLoading(false);
      return;
    }
    if (!aboutCommunity) {
      setError("About section is required");
      setLoading(false);
      return;
    }
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    if (!communityType) {
      setError("Community type is required");
      setLoading(false);
      return;
    }
    if (!locationCommunity) {
      setError("Location is required");
      setLoading(false);
      return;
    }
    if (privateCommunity && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (existingCommunityId) {
      update({
        id: Number(existingCommunityId),
        name,
        aboutCommunity,
        locationCommunity,
        ownerEmail: email,
        sloganCommunity,
        communityType,
        private: privateCommunity,
        password,
      });
    } else {
      create({
        name,
        aboutCommunity,
        locationCommunity,
        ownerEmail: email,
        sloganCommunity,
        communityType,
        private: privateCommunity,
        password,
        createdById: user?.id ?? "",
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <form className="m-10 md:mx-auto md:my-24 md:w-3/4 lg:w-1/2">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          {existingCommunityId ? (
            <h2 className="my-8 text-4xl font-semibold leading-7 text-primaryBrand">
              Update your community
            </h2>
          ) : (
            <h2 className="my-8 text-4xl font-semibold leading-7 text-primaryBrand">
              Create a community
            </h2>
          )}
          <p className="mt-1 text-base leading-6 text-textBrand">
            {existingCommunityId
              ? "Please edit your communities exisiting information here. You will be returned to your communities page upon completion"
              : "You've decided to make a community? That is amazing! Let's begin by filling out the form below so we can get you some members and get you started."}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <h1 className="my-10 text-lg font-bold leading-7 text-accentBrand">
                Basic Info
              </h1>

              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                Community Name
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="The perfect name"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                About
              </label>
              <div className="mt-2">
                <textarea
                  placeholder="What is your community about?"
                  value={aboutCommunity}
                  onChange={(e) => setAboutCommunity(e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
              {!existingCommunityId && (
                <p className="mt-3 text-sm leading-6 text-textBrand">
                  Write a few sentences about your community.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-accentBrand">
            Other Info
          </h2>
          {!existingCommunityId && (
            <p className="mt-1 text-sm leading-6 text-textBrand">
              Other important information CommunoLearn users should now about
              your community.
            </p>
          )}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-4">
              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                Server Contact Adress
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="WhereToContactTheCommunity@gmail.com"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-4">
              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                Slogan
              </label>
              <div className="mt-2">
                <textarea
                  value={sloganCommunity}
                  onChange={(e) => setSloganCommunity(e.target.value)}
                  rows={2}
                  placeholder="Here at CommunoLearn our's is: Do It Together "
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6"
                />
              </div>
              {!existingCommunityId && (
                <p className="mt-3 text-sm leading-6 text-textBrand">
                  Give your community a memorable sentence.
                </p>
              )}
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                Community Type
              </label>
              <div className="mt-2">
                <select
                  value={communityType}
                  onChange={(e) => setCommunityType(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option className="">Class</option>
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

            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                {!existingCommunityId && (
                  <span className="pe-1 text-red-800">*</span>
                )}
                Country
              </label>
              <div className="mt-2">
                <select
                  value={locationCommunity}
                  onChange={(e) => setLocationCommunity(e.target.value)}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>Australia</option>
                  <option>New Zealand</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                  <option>Ireland</option>
                  <option>Finland</option>
                  <option>Sweden</option>
                  <option>Germany</option>
                  <option>Norway</option>
                  <option>Other Country</option>
                </select>
                {!existingCommunityId && (
                  <p className="mt-2 flex px-1 text-xs text-textBrand sm:max-w-xs">
                    <span className="pe-1 text-red-800">*</span>
                    Your country isn&apos;t represented? Let us know!
                    CommunoLearn is always growing and we&apos;d be happy to add
                    your country to the list!
                  </p>
                )}
              </div>
            </div>
          </div>
          {!existingCommunityId && (
            <p className="mt-12 text-base font-bold leading-6 text-primaryBrand">
              More custom community info coming in the future!
            </p>
          )}
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="my-10 text-lg font-bold leading-7 text-accentBrand">
            Privacy
          </h1>
          {existingCommunityId ? (
            <p className="mt-1 leading-6 text-textBrand">
              Choose wisely as this will change the visibility of your
              community.
            </p>
          ) : (
            <p className="mt-1 text-sm leading-6 text-textBrand">
              Would you like your community to be publicly viewable/joinable.
              (Communities are public by default)
            </p>
          )}

          <div className="mt-10 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      checked={privateCommunity}
                      onChange={() => setPrivateCommunity(!privateCommunity)}
                      type="checkbox"
                      className="h-4 w-4 rounded border-accentBrand text-accentBrand accent-textBrand focus:ring-accentBrand"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label className="font-medium text-secondaryBrand">
                      Private Community?
                    </label>

                    <p className="text-textBrand">
                      Will hide your community and require a password to join
                    </p>
                  </div>
                </div>
                {privateCommunity && (
                  <section>
                    <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                      Password
                    </label>
                    <div className="my-2">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="The perfect password"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6 md:w-1/2"
                      />
                    </div>

                    <label className="block text-sm font-medium leading-6 text-secondaryBrand">
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="The perfect password pt2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-textBrand shadow-sm outline-accentBrand ring-1 ring-inset ring-accentBrand placeholder:text-textBrand focus:ring-2 focus:ring-inset focus:ring-accentBrand sm:text-sm sm:leading-6 md:w-1/2"
                      />
                    </div>
                  </section>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       
        {error && <ErrorNotification message={error} />}
        <span
          onClick={() => router.push("/communities")}
          className="cursor-pointer text-sm font-bold leading-6 text-accentBrand hover:underline"
        >
          Cancel
        </span>
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-3xl border border-primaryBrand bg-primaryBrand px-10 py-3 text-base font-semibold text-white shadow-sm hover:bg-backgroundBrand hover:text-primaryBrand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {existingCommunityId ? loading? "Updating...":"Update Community" : loading? "Creationg":"Create Community"}
        </button>
      </div>
    </form>
  );
}
