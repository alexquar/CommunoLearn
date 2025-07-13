"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import ErrorNotification from "~/app/_components/ErrorNotification";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "~/context/AuthContext";
import Loading from "~/app/loading";
import GenerateCommunityModal from "~/app/_components/GenerateCommunityModal";
import Image from "next/image";

export default function NewCommunity() {
  const { user } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingCommunityId = searchParams.get("existing");

  const { mutate: create } = api.communities.newCommunity.useMutation({
    onSuccess: (data) => {
      setError(null);
      setLoading(false);
      router.push(`/communities/${data.id}`);
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
  const [file, setFile] = useState<File | null>(null);
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
  const [open, setOpen] = useState(false);
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
    if(!file && !existingCommunityId) {
      setError("Community icon is required");
      setLoading(false);
      return;
    }
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1]; // strip the `data:*/*;base64,` prefix
      if (base64String) {
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
            icon: base64String,
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
            icon: base64String,
            createdById: user?.id ?? "",
          });
        }
      }
    };
    reader.readAsDataURL(file); // triggers `onloadend`
    return 
  } else {
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
    }
  }
    
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
   <div className="mx-auto max-w-4xl px-4 py-16">
  <div className="space-y-10">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primaryBrand">
        {existingCommunityId ? "Update your community" : "Create a community"}
      </h1>
      <p className="mt-4 text-base text-textBrand max-w-xl mx-auto">
        {existingCommunityId
          ? "Please edit your community’s existing information here. You'll return to the community page when finished."
          : "You've decided to start a community? That’s amazing! Fill out the form below to get started."}
      </p>
      {!existingCommunityId && (
        <p className="mt-3 text-sm text-textBrand">
          Need help crafting your community?{" "}
          <span
            onClick={() => setOpen(true)}
            className="cursor-pointer font-medium text-secondaryBrand hover:underline"
          >
            Generate Community
          </span>
        </p>
      )}
    </div>

    <GenerateCommunityModal open={open} setOpen={setOpen} />

    {/* --- BASIC INFO --- */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-accentBrand mb-6">Basic Info</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            Community Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="The perfect name"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            About
          </label>
          <textarea
            value={aboutCommunity}
            onChange={(e) => setAboutCommunity(e.target.value)}
            rows={4}
            placeholder="What is your community about?"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
          />
          {!existingCommunityId && (
            <p className="mt-1 text-xs text-textBrand">
              Write a few sentences about your community.
            </p>
          )}
        </div>
      </div>
    </div>

    {/* --- OTHER INFO --- */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-accentBrand mb-6">Other Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            Contact Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="community@email.com"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            Slogan
          </label>
          <textarea
            value={sloganCommunity}
            onChange={(e) => setSloganCommunity(e.target.value)}
            rows={2}
            placeholder="Here at CommunoLearn our's is: Do It Together"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            Community Type
          </label>
          <select
            value={communityType}
            onChange={(e) => setCommunityType(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
          >
            <option>Class</option>
            <option>High School Club</option>
            <option>University Club</option>
            <option>Workplace</option>
            <option>Friend Group</option>
            <option>Event Planning</option>
            <option>Team</option>
            <option>Committee</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondaryBrand">
            Country <span className="text-red-600">*</span>
          </label>
          <select
            value={locationCommunity}
            onChange={(e) => setLocationCommunity(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
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
            <p className="mt-1 text-xs text-textBrand">
              Don’t see your country? Let us know — we’re always expanding!
            </p>
          )}
        </div>
      </div>
    </div>

    {/* --- PRIVACY --- */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-accentBrand mb-4">Privacy</h2>
      <p className="text-sm text-textBrand">
        {existingCommunityId
          ? "Changing this will update visibility settings."
          : "Would you like your community to be private? (Public by default)"}
      </p>

      <div className="mt-4 flex items-center space-x-3">
        <input
          checked={privateCommunity}
          onChange={() => setPrivateCommunity(!privateCommunity)}
          type="checkbox"
          className="h-4 w-4 checked:bg-primaryBrand accent-primaryBrand checked:text-primaryBrand rounded text-primaryBrand focus:ring-primaryBrand"
        />
        <label className="text-sm font-medium text-secondaryBrand">
          Private Community
        </label>
      </div>

      {privateCommunity && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-secondaryBrand">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondaryBrand">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-textBrand focus:border-accentBrand focus:ring-accentBrand"
            />
          </div>
        </div>
      )}
    </div>

    {/* --- MEDIA --- */}
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-accentBrand mb-4">Media</h2>
      <p className="text-sm text-textBrand">
        {existingCommunityId
          ? "Update your community’s icon below."
          : "Choose an icon for your new community."}
      </p>

      <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="file:rounded-md file:border-0 text-textBrand file:bg-secondaryBrand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-secondaryBrand/80"
        />
        {file && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-secondaryBrand">
              Icon Preview:
            </p>
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
              <Image
                width={64}
                height={64}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>

    {/* --- ACTION BUTTONS --- */}
    <div className="flex justify-end gap-4 pt-4">
      {error && <ErrorNotification message={error} />}
      <button
        type="button"
        onClick={() => router.push("/communities")}
        className="text-sm font-semibold text-accentBrand hover:underline"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="rounded-full bg-primaryBrand px-6 py-3 text-sm font-semibold text-white hover:bg-primaryBrand/90 transition"
      >
        {existingCommunityId
          ? loading
            ? "Updating..."
            : "Update Community"
          : loading
          ? "Creating..."
          : "Create Community"}
      </button>
    </div>
  </div>
</div>

  );
}
