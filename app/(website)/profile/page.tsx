import { loginWithProvider } from "@/action/userActions";
import FormProfile from "@/components/FormProfile";
import { CgProfile } from "react-icons/cg";

export default async function ProfilePage() {
  const user = await loginWithProvider();
  console.log(user);

  return (
    <div className=" flex justify-center items-center h-full ">
      <div className="bg-color py-10 px-10 rounded-xl space-y-6 text-white  max-w-xl grow">
        <h2 className="flex justify-center items-center gap-2 text-2xl">
          <CgProfile />
          <span className="font-semibold">Profile</span>
        </h2>
        <FormProfile user={user} />
      </div>
    </div>
  );
}
