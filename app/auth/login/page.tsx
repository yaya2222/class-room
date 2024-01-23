"use client";

export default function LoginPage() {

const action=(fromData:FormData)=>{
console.log(3);

}

  return (
    <div className="h-full flex flex-col justify-center items-center">
        <div className="flex flex-col shadow-md rounded-lg border p-6 gap-6  w-[400px]">
        <h1 className="text-center text-2xl font-semibold">Classroom</h1>
        <h2 className="text-center text-md text-gray-500">Welcome back</h2>
        <form action={action}>

        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-500">Email</label>
            <input id="email" type="email" className="text-sm  py-2  px-3 rounded-lg border border-gray-300"/>
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-500">Password</label>
            <input id="password" type="password" className="text-sm  py-2  px-3 rounded-lg border border-gray-300"/>
        </div>
        <button type="submit">Login</button>
        </form>
        </div>

    </div>
  )
}
