import Head from "next/head";
import Image from "next/image";
import HomeImg from "../../public/Home.jpg";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        {/* Metatags Open Graph para LinkedIn e redes sociais */}
        <meta property="og:title" content="Push YourSelf Harder - TrainePlus" />
        <meta property="og:description" content="Desafie-se a ir além com TrainePlus, seu app para treino e motivação." />
        
        {/* URL da imagem - importante que seja pública e acessível */}
        <meta property="og:image" content="https://traineplus.vercel.app/Home.jpg" />
        <meta property="og:url" content="https://traineplus.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.mainimg}>
        <div className={styles.divimgDesktop}>
          {/* IMAGEM */}
          <Image
            src={HomeImg}
            alt="Imagem de mulher treinando"
            fill
            priority
            className={styles.girlimg}
          />
        </div>
         <h1 className={styles.textimg}>Push YourSelf<br />Harder</h1>
        
        <div className={styles.divimgMobile}></div>
      </main>
    </div>
  );
}
