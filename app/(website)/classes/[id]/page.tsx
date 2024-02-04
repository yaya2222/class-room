interface ClassesPageProps{
    params:{
        id:string
    }
}

export default function classPage({params}:ClassesPageProps) {
    
  return (
    <div>class {params.id}</div>
  )
}
