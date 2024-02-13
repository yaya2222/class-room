import { getMembers,getRoleUserByClass } from "@/action/classroomActions"
import AddMembers from "@/components/AddMembers"
import { enumUsersClassRole,IMember } from "@/types"
import Image from "next/image"

interface MembersPageProps{
  params:{
    id:string
  }
}


export default async function MembersPage({params}:MembersPageProps) {
  
  const {error,members} = await getMembers(params.id)

  if(error){
    return <div>{error}</div>
  }

  const administrations:IMember[] = []
  const teachers:IMember[] = []
  const students:IMember[] = []
  members?.forEach((member)=>{
    if (member.role===enumUsersClassRole.ADMINISTRATION) administrations.push(member)
    if (member.role===enumUsersClassRole.TEACHER) teachers.push(member)
    if (member.role===enumUsersClassRole.STUDENT) students.push(member)
  })
  
  const roleMember = await getRoleUserByClass(params.id)

  if(roleMember.error){
    return <div>{roleMember.error}</div>
  }

  const listMembersByPermissions = [
    {label:"Administrations",value:administrations,roleModal:enumUsersClassRole.ADMINISTRATION},
    {label:"Teachers",value:teachers,roleModal:enumUsersClassRole.TEACHER},
    {label:"Students",value:students,roleModal:enumUsersClassRole.STUDENT},
  ]


  return (
    <section className="space-y-20">
      {members&&roleMember.role&&<>
      {listMembersByPermissions.map(listMembers=>(
         <div key={listMembers.label}>
         <div className=" border-b-2 border-blue-500 text-blue-500 flex items-end justify-between">
           <h3 className=" text-4xl font-semibold">{listMembers.label}</h3>
           <div>
             <div className="flex items-center text-end gap-3">
              <AddMembers classroomId={params.id} title={listMembers.label} roleUser={roleMember.role} roleModal={listMembers.roleModal}/>
               <span>Members: {listMembers.value.length}</span>
             </div>
           </div>
         </div>
         <ul className="mt-1">
           {listMembers.value.map((member) => (
             <li
               key={member.email}
               className="flex items-center gap-8 border-b py-2"
             >
               {member.image && (
                 <Image
                   src={member.image}
                   alt="Image member"
                   width={20}
                   height={20}
                   className="rounded-full h-8 w-8"
                 />
               )}
               {!member.image && (
                 <span className="bg-gray-500 text-white h-8 w-8 flex text-center justify-center rounded-full text-xl">
                   {member.email[0]}
                 </span>
               )}
               <div className="flex items-center gap-4">

               <span>{member.name}</span>
               <span className="text-xs text-gray-500">{member.email}</span>
               </div>
             </li>
           ))}
         </ul>
       </div>
      ))}
      </>}
    </section>
  )
}
