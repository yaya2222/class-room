import Image from "next/image";

export default function AuthLauout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full flex flex-col justify-center items-center bg-[url('/login.png')] bg-cover bg-center">
    {/* <div className="absolute w-full h-full -z-10"> */}
    {/* <Image src={"/login.png"} alt="backround image" fill  className="w-full h-full"/> */}
    {/* </div> */}

    <div className="flex flex-col  rounded-3xl p-6 w-[400px] backdrop-blur-2xl border-white border	">
    <Image src={"/logo.png"} alt="backround image" width={75} height={75} className="m-auto"/>
    

    <h1 className="text-center text-2xl font-semibold mb-2">Classroom</h1>
    <div className="flex flex-col space-y-2">
    {children}

    </div>
    </div>
    </div>;
}
