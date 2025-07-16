import Head from "next/head"

import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"

import { TextArea } from "@/components/textarea/textarea"
import { FaShare } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"

import { db } from "@/services/firebaseConection"
import { collection,addDoc, query, orderBy, where, onSnapshot,deleteDoc, doc } from "firebase/firestore"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import Link from "next/link"


interface User {
    user: {
        email:string
    }
}

interface TrainerProps {
    id:string;
    treino:string;
    public:boolean;
    created:string;
    user:string;
    name:string;
}

export default function Treino({user}:User){
const [input, setInput] = useState("")
const [isPublic, setIsPublic] = useState(false)
const [treinos,setTreinos] = useState<TrainerProps[]>([])

useEffect(()=>{
    async function LoadTreinos(){
        const treinosRef = collection(db,"treinos")
        const qry = query(treinosRef,orderBy("created","desc"),
    where ("user", "==", user?.email)) /*Trago somente minhas tarefas*/ 

    onSnapshot(qry,(snapshot)=>{
        const traineList = [] as TrainerProps[] ;

        snapshot.forEach((training)=>{
            traineList.push ({
                id: training.id,
                treino: training.data().treino,
                public: training.data().public,
                created: training.data().created,
                user: training.data().user,
                name: training.data().name,
            })
        })
        setTreinos(traineList)
        console.log(traineList)
    })


    }
LoadTreinos()

},[user?.email])

async function handleRegister(e:FormEvent){
e.preventDefault()

if(input === "")return alert("Você precisa digitar o seu treino")
    

        try{
            await addDoc(collection(db, "treinos"),{
                treino:input,
                public:isPublic,
                created: new Date().toLocaleDateString(),
                user: user?.email,
                name: user?.email.split("@")[0]
                
            })
            setInput("")
            setIsPublic(false)
        }
        catch(err){
            console.log(err)
            alert("Error ao registrar o treino" + err)
        }
        



    }

    async function handleDelete(id:string){
       
          try{
            const docRef = doc(db, "treinos",id)
              await deleteDoc(docRef)
            alert("Treino excluído com sucesso!")
        } catch(err){
            console.log(err)
        }
              
    }

   async function handleShare(id:string){

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/detail/${id}`
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent("Confira este treino no Traine Plus" + url)}` 
    try{
        await navigator.clipboard.writeText(url)

        if(navigator.share){
            await navigator.share({
                title:"compartilhar treino",
                text:"confira este treino no Traine Plus",
                url,
            })
            alert("link copiado")
        }else{
            window.open(whatsappUrl, "_blank")
                alert("Seu Link foi copiado! Abra seu Whatsapp para compartilhar.")
            
        }

    }catch(err){
        alert("Erro ao compartilhar! Apenas Abra o arquivo normamente e cole o link")
        console.log(err)
    }

    }

    return(
        <div 
        style={{ height: 'calc(100vh - 64px )'  }}
        className="flex flex-col w-full bg-gradient-to-br from-orange-600 to-orange-800 items-center justify-start py-4 px-4 overflow-auto">
            
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

       <section className="border-t-2 border-white w-full max-w-[1024px] gap-6">
       <h2 className="flex justify-center items-center text-xl text-white font-extrabold py-4">Treinos Recentes</h2>
        <div className=" flex flex-col gap-6 p-4 rounded ">
          
         {treinos.map((item)=> (
             <article key={item.id}
             className="flex flex-col gap-1 p-4 bg-white/10  rounded-md "
             >

           {item.public && (
             <div className=" flex gap-2 items-center">
              <label className="text-white font-light text-[13px] bg-amber-700 p-1 rounded-sm">Público</label>  
            <FaShare onClick={()=> handleShare(item.id)}
            size={19} 
            className=" text-white cursor-pointer "/>
            </div>
           )}

           {item.public ? (
            /*COM PUBLICO */
            <div className=" w-full flex justify-between py-3">
            <Link href = {`/treino/${item.id}`}>
                <p className="break-all whitespace-pre-wrap leading-[150%] text-amber-200">{item.treino}</p>
            </Link>  <button onClick={()=> handleDelete(item.id)} className=" ml-2  items-center cursor-pointer"><FaTrash className="text-white"/> </button>
            </div> )   : (
              /* SEM PUBLICO */
              <div className=" w-full flex justify-between py-3">
                <p className="break-all whitespace-pre-wrap leading-[150%] text-amber-200">{item.treino}</p>
              <button onClick={ ()=> handleDelete(item.id)}
              className=" ml-2  items-center cursor-pointer"><FaTrash className="text-white"/> </button>
               </div>
           )}

          </article> 
          
         ))}
         
          
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
        props:{
            user:{email:session?.user?.email,}
        }

    }
    
}


