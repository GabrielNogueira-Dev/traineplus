import { FaGithub, FaGoogle } from "react-icons/fa";
import Imgsob from '../../public/imgsobfundobranco.png'
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main
      style={{ height: 'calc(100vh - 64px)' }}
      className="flex flex-col items-center justify-end bg-gradient-to-br from-orange-700 to-orange-800 px-4 relative overflow-hidden"
    >
      {/* Caixa branca */}
      <div className="translate-y-5 relative z-20 bg-white rounded-xl p-8 shadow-[0_20px_50px_rgba(2,2,0,0.3)] text-center mb-[-4rem]">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Bem-vindo!</h1>
        <p className="text-gray-600 mb-8">
          Acesse sua conta com uma das opções abaixo:
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="cursor-pointer flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-100 transition"
          >
            <FaGoogle size={24} />
            Entrar com Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="cursor-pointer flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-100 transition"
          >
            <FaGithub size={24} />
            Entrar com GitHub
          </button>
        </div>
      </div>

      {/* Boneco mais para cima */}
      <div className="relative w-64 h-64 z-10 ">
        <Image
          src={Imgsob}
          alt="Homem segurando a div branca"
          style={{ objectFit: 'contain' }}
          fill
          priority
        />
      </div>

    {/* Chão */}
      <footer className="border-t-1 min-w-screen w-full h-22 bg-gradient-to-t from-orange-950 to-orange-900 shadow-inner z-0 -translate-y-0"></footer>

    </main>
  );
}
