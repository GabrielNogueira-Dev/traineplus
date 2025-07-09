import Link from "next/link";
import { useSession,signIn,signOut } from "next-auth/react";

export default function Header() {
const {data:session, status} = useSession();

  return (
    <header className="bg-orange-600 w-full h-16 flex justify-center items-center font-bold px-4">
      <section className="max-w-[1024px] w-full flex justify-between items-center ">
        <div className="bg-orange-700 text-gray-800 flex items-center gap-2 rounded-md py-2 px-3 text-lg min-w-[104px]">
          <Link href="/" className="max-[410px]:text-sm flex gap-1 items-center">
            <h1 className="font-bold text-lg">Traine</h1>
            <span className="max-[410px]:text-sm text-purple-100">Plus</span>
          </Link>
        </div>

        <Link
          href="/dashboard"
          className="max-[410px]:text-sm text-purple-50 flex items-center justify-center border-2 border-purple-100 rounded-3xl px-3 py-1 min-w-[64px]"
        >
          Treino
        </Link>

{status === "loading" ? (
    <></>) : session ?(
<button onClick={ () => signOut()}
className=" max-[410px]:text-sm text-purple-50 border-2 border-purple-100 rounded-3xl px-4 py-1 min-w-[80px] hover:bg hover:text-white cursor-pointer">
          Olá, {session.user?.name}
        </button>
    ) : (
        <button onClick={ ()=> signIn("google")}
        className="max-[410px]:text-sm text-purple-50 border-2 border-purple-100 rounded-3xl px-4 py-1 min-w-[80px] hover:bg hover:text-white cursor-pointer">
            Acessar
        </button>)
}
 
      </section>
    </header>
  );
}
