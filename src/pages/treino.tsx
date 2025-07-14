import Head from "next/head"

import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"

import { TextArea } from "@/components/textarea/textarea"
import { FaShare } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"

import { db } from "@/services/firebaseConection"
import { collection,addDoc } from "firebase/firestore"

import { ChangeEvent, FormEvent, useState } from "react"

export default function Treino(){
const [input, setInput] = useState("")
const [isPublic, setIsPublic] = useState(false)


async function handleRegister(e:FormEvent){
e.preventDefault()

if(input === "")return alert("Você precisa digitar o seu treino")
    

        try{
            await addDoc(collection(db, "treinos"),{
                treino:input,
                public:isPublic,
                created: new Date().toLocaleDateString(),
                
            })
            setInput("")
            setIsPublic(false)
        }
        catch(err){
            console.log(err)
            alert("Error ao registrar o treino" + err)
        }
        



    }

    return(
        <div 
        style={{ height: 'calc(100vh - 64px )'  }}
        className="flex flex-col w-full bg-gradient-to-br from-orange-600 to-orange-800 items-center justify-center px-4 overflow-hidden">
            
            <Head>
                <title>Treino</title>
            </Head>

        <section className="w-full max-w-[1024px]">
              <div className="flex gap-[10px] flex-col max-w-[1024px] w-full px-0 py-18px pb-[28px] mt-[58px]">
                 <h1 className="text-white font-bold mb-14">Qual o treino gostaria de passar hoje?</h1>
                <form onSubmit={handleRegister}
                 className="max-w-[1024px]">
                    <TextArea placeholder="Digite o treino.."
                    value={input}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value) }
                    />
                    <div className="gap-2 flex">
                        <input type="checkbox" 
                               className="cursor-pointer w-4 h-4"
                                checked={isPublic}
                                onChange={(e:ChangeEvent<HTMLInputElement>) => setIsPublic(e.target.checked)}
                        />
                        <label className="text-white font-bold ml-2" >Deixar público</label>
                    </div>

                    <button 
                    className="font-bold flex justify-center items-center w-full p-[10px] text-white bg-neutral-700 rounded-sm cursor-pointer hover:bg-neutral-600 transition-colors duration-400  "
                    type="submit">Registrar Treino</button>
                </form>
            </div> 
        </section>

       <section className="border-t-2 border-white w-full max-w-[1024px] mb-6">
       <h2 className="flex justify-center items-center text-xl text-white font-extrabold py-4">Treinos Recentes</h2>
        <div className=" flex flex-col gap-4 bg-white/10 p-4 rounded">
          
          <article className="flex flex-col gap-2">

            <div className=" flex gap-2 items-center">
              <label className="text-white font-light text-[13px] bg-amber-700 p-1 rounded-sm">Público</label>  
            <FaShare size={19}
            className=" text-white cursor-pointer "/>
            </div>

            <div className=" w-full flex justify-between py-3">
               <p className="break-all whitespace-pre-wrap leading-[150%] text-amber-200">mensagem</p>
               <button className=" ml-2  items-center cursor-pointer"><FaTrash className="text-white"/> </button>
            </div>

          </article>
          
        </div>
        
      </section><br />
      
      

        </div>

    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    
    if(!session){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    
    return{
        props:{}

    }
    
}


