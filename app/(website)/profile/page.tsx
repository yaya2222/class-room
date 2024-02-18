import { loginWithProvider } from "@/action/userActions";
import FormProfile from "@/components/FormProfile";
import { CgProfile } from "react-icons/cg";

export default async function ProfilePage() {
  const user = await loginWithProvider();

  return (
    <div className=" flex justify-center items-center h-full ">
      <div className="py-10 px-10 rounded-xl space-y-6   max-w-xl grow shadow shadow-gray-600">
        <h2 className="flex justify-center items-center gap-2 text-2xl">
          <CgProfile />
          <span className="font-semibold">Profile</span>
        </h2>
        <FormProfile user={user} />
      </div>
    </div>
  );
}
