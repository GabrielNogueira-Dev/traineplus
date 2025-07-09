import Head from "next/head";
import Image from "next/image";
import HomeImg from "../../public/Home.jpg";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
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
