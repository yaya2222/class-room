import { auth } from "@/auth"
import LogoutButton from "@/components/auth/logoutButton"

export default async function ClassRoomPage() {
    const session = await auth()
    // console.log({sessionUse:session});
    
  return (
    <div>
      {JSON.stringify(session)}
      <LogoutButton />
    </div>

    
  )
}

