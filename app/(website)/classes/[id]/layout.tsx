import NavbarClass from "@/components/NavbarClass";


export default function ClassLauout({children,params }:Readonly<{children:React.ReactNode,params :any}>){
    
return (
    <div className="w-full">
        <NavbarClass id={params.id} />
        <div className="mt-10 max-w-4xl m-auto">
        {children}

        </div>

    </div>
)
}