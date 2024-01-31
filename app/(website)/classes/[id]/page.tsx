interface ClassesPageProps{
    params:{
        id:string
    }
}

export default function classPage({params}:ClassesPageProps) {
    console.log(params);
    
  return (
    <div>class {params.id}</div>
  )
}
