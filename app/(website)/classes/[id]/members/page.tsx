import { getMembers } from "@/action/classes/getMembers"

interface MembersPageProps{
  params:{
    id:string
  }
}


export default async function MembersPage({params}:MembersPageProps) {
  
  const members = await getMembers(params.id)
  console.log(members.users);
  
  return (
    <section>
as
    </section>
  )
}
