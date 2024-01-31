import Class from "@/components/Class";

export default function ClassesPage() {
  const arr=[1,2,3,4,5,6,7]
    return (
      <div className="m-auto grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {arr.map(val=><Class key={val} id={val+""} name="Malot" description="fullStack" friend={20}/>
          )}
      </div>
    )
  }
  