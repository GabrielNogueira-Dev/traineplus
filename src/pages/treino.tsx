import Head from "next/head"

import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next"

export default function Treino(){

    return(
        <div>
            <Head>
                <title>Treino</title>
            </Head>

        <main>
            <nav>
               <h1>Qual o treino gostaria de passar hoje?</h1> 
            </nav>
        </main>

        </div>
    )
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


