import { FaGithub, FaGoogle } from "react-icons/fa";
import Imgsob from '../../public//imgsobfundobranco.png'
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main
      style={{ height: 'calc(100vh - 64px)' }}
      className=" flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-800 px-4"
    >
      {/* Container relativo para controlar a posição */}
      <div className="absolute w-full max-w-md">

        {/* Div branca (card) com z-index maior */}
        <div style={{ top: '-10.7rem' }}
        className=" relative bg-white rounded-xl p-13 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-20 text-center mb-20 overflow-visible">
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

        {/* Imagem com z-index menor que a div branca, mas visível */}
      </div>
        <div className="absolute left-1/2 bottom-0 w-80 h-97 -translate-x-1/2 z-10 pointer-events-none">
          <Image
            src={Imgsob}
            alt="Homem segurando a div branca"
            style={{objectFit: 'contain' }}
            fill
            priority
          />
        </div>
    </main>
  )
}

