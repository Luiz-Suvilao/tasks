import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/pages/index.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>Tarefas | Home</title>
            </Head>

            <main className={styles.contentContainer}>
                <img src='/images/board-user.svg' alt='Ícone de um notebook com o site aberto.' />

                <section className={styles.CTA}>
                    <h1>Uma ferramenta para seu dia a dia. Escreva, planeje e organize-se...</h1>
                    <p>
                        <span>100% gratuita</span> e online.
                    </p>
                </section>

                <h1 className={styles.donorsTitle}>Doadores</h1>

                <div className={styles.donors}>
                    <img
                        src="https://sujeitoprogramador.com/steve.png"
                        alt="Usuário"
                    />
                </div>
            </main>
        </>
    );
}
