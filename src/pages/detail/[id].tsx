import { GetServerSideProps } from "next"

import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"

import { db } from "@/services/firebaseConection"
import { doc,collection,query,where, getDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore"

import Head from "next/head"

import { TextArea } from "@/components/textarea/textarea"
import { ChangeEvent, FormEvent, useState } from "react"
import { useSession } from "next-auth/react"

interface itemProps {
      item: {
        treino: string;
        public: boolean
        created:string;
        user:string;
        name: string;
        taskId: string;
      };
      listComents: ComentProps[]
}

interface ComentProps {
    coment: string;
    id:string;
    user:string;
    name:string;
    taskId:string;
}

export default function Detail({item, listComents}:itemProps){
    const [input,setInput] = useState("")
   const  [coments,setComents] = useState<ComentProps[]>(listComents || [])

    const {data:session} = useSession()

    async function handleComent(e:FormEvent){
        e.preventDefault()


        if (input === "") return;

        if(!session?.user?.email || !session?.user?.name ) return;

        try{
          const  docRef = await addDoc(collection(db,"comentarios"),{
                coment: input,
                created: new Date().toLocaleDateString(),
                user: session?.user.email,
                name: session?.user.name,
                taskId: item?.taskId
             })

             const data = {
                 coment: input,
                 id: docRef.id,
                 user: session?.user?.email,
                 name: session?.user?.name,
                taskId: item?.taskId
             }
                setComents((oldcoments)=> [...oldcoments, data])
                setInput("")
                console.log(docRef)
                toast.success("Comentário adicionado!")

    }catch(err){
        console.error("Error ao enviar o comentário", err)
    }
}

async function handleDelete(id:string) {
    
try{
    const docRef = doc(db,"comentarios",id)
    await deleteDoc(docRef)

const deleteComents = coments.filter( (doc) => doc.id !== id)
toast.success("Comentário excluido!")
setComents(deleteComents)
}catch(err){
    console.error("Error ao deletar comentário" , err)
}

}

    return(

  <div 
   className="min-h-[calc(100vh-64px)] w-full bg-gradient-to-br from-orange-600 to-orange-800 flex justify-center ">
      <Head>
        <title>Detalhes do treino</title>
      </Head>

      <main className="w-full max-w-[1024px] flex flex-col items-center px-4 py-10 gap-10">
        <h1 className="text-white text-3xl font-extrabold  mb-4 ">Ficha de Treino</h1>

      <article className="max-w-full w-full p-4 flex flex-col gap-1 bg-white/10 rounded-md whitespace-pre-wrap break-words  text-amber-200  ">
  <p className=" font-bold text-white">{item.treino}</p>
</article>


        <section className="w-full flex flex-col gap-4">
            <h3 className="text-white text-xl font-medium self-start">Deixe seu comentário 👇</h3>

            <form onSubmit={handleComent}
             className="flex flex-col gap-4">
                <TextArea
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                placeholder="Deixe sua opinião.."
                />
                <button disabled={!session?.user}
                className="disabled:opacity-50 disabled:cursor-not-allowed gap-2 text-white bg-[#4d4c4c] p-1 rounded-sm font-bold cursor-pointer 
             ">Comentar</button>
            </form>
            
        </section>
<div className="border-solid border-white border w-full"></div>
        <section className="flex flex-col w-full gap-5  max-w-[1024px">

        <h2 className="flex justify-center text-xl font-bold text-white">Todos os comentários</h2>
        {coments.length === 0 && (
            <span className="flex text-amber-200 items-center border-b-1 self-center max-w-fit border-s-gray-500">Deixe um comentário 🖋️</span>
        )}

        {coments.map((item) => (
           
                <article className="bg-white/10 p-4  rounded-md flex flex-col gap-4 bg-"
                key={item.id}>
                    <div className="flex items-center justify-between">
                    <p className="capitalize text-white bg-[#4d4c4c] p-[4px] rounded-md">{item.name} 🥇</p>
                   {item.user === session?.user?.email && ( <button 
                     onClick={ () => handleDelete(item.id)}>
                        <FaTrash size={15}
                    className=" cursor-pointer text-white"
                        />
                    </button >)}
                  </div>
                    <p className=" text-white font-bold">{item.coment}</p>
                </article>
          
        ))}

        </section>

      </main>

        

    </div>

    )
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
    const id = params?.id as string
    const docRef = doc(db,"treinos",id)
    const snapshot = await getDoc(docRef)


    const q = query(collection(db,"comentarios"), where("taskId", "==", id ))
    const snapshotcoments = await getDocs(q)

    const listComents: ComentProps[] = [];
    snapshotcoments.forEach((doc) => {
        listComents.push({
            id: doc.id,
            coment: doc.data().coment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId
        })
        console.log(listComents)
    })
    

    if(!snapshot.exists()){
        return{
            redirect:{
                destination:"/",
                permanent:false,
            }
        }
    }

    if(!snapshot.data()?.public){
          return{
            redirect:{
                destination:"/",
                permanent:false,
            }
        }
    }

    const treinoATT = {
        treino : snapshot.data()?.treino,
        public: snapshot.data()?.public,
        created: snapshot.data()?.created,
        user: snapshot.data()?.user,
        name: snapshot.data()?.name,
        taskId: id,
    }
    console.log(treinoATT)

    return{props:{
        item:treinoATT,
        listComents: listComents
    }}
}