import { GetServerSideProps } from "next"

import { db } from "@/services/firebaseConection"
import { doc,collection,query,where, getDoc } from "firebase/firestore"

import Head from "next/head"


interface itemProps {
      item: {
        treino: string;
        public: boolean
        created:string;
        user:string;
        name: string;
        taskId: string;
      }
}

export default function Detail({item}:itemProps){


    return(
        <div>
            <Head>
                <title>detalhes do treino</title>
            </Head>

            <main>
                <h1>Tarefas</h1>
            </main>

        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async ({params}) => {
const id = params?.id as string

    const docRef = doc(db,"treinos",id)

    const snapshot = await getDoc(docRef)

    if(snapshot.data === undefined){
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
        item:treinoATT
    }}
}