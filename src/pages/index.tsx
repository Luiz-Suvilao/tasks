import { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import { fetchAll } from '../services/firebaseConnection';

import { useSidebar } from '../hooks/sidebar';
import { useModal } from '../hooks/modal';

import notebookImage from '../../public/images/board-user.svg';

import styles from '../styles/index.module.scss';

interface Donor {
    image: string;
    lastDonate: Date;
    donate: boolean;
    userName: string;
    id: string;
}

interface HomeProps {
    data:string;
}

export default function Home({
    data
}: HomeProps) {
    const { open: sidebarOpen } = useSidebar();
    const [donors, setDonors] = useState<Donor[]>(JSON.parse(data));
    const { open } = useSidebar();
    const { modalOpen } = useModal();

    useEffect(() => {
        document.body.className = (open || modalOpen) ? 'locked' : 'unlocked';
    });

    return (
        <>
            <Head>
                <title>Tarefas | Home</title>
            </Head>

            <main className={styles.contentContainer}>
                {sidebarOpen === false && (
                    <Image
                        src={notebookImage}
                        alt='Ícone de um notebook com o site aberto.'
                    />
                )}

                <section className={styles.CTA}>
                    <h1>Uma ferramenta para seu dia a dia. Escreva, planeje e organize-se...</h1>
                    <p>
                        <span>100% gratuita</span> e online.
                    </p>
                </section>

                {donors.length !== 0 && (<h1 className={styles.donorsTitle}>Nossos apoiadores</h1>)}

                {sidebarOpen === false && (
                    <div className={styles.donors}>
                        {donors.map(donor => (
                            <Image
                                width={65}
                                height={65}
                                objectFit="fill"
                                key={donor.id}
                                src={donor.image}
                                alt={`Imagem do doador ${donor.userName}`}
                            />
                        ))}
                    </div>
                )}

                <h4>Torne-se um apoiador doando para o projeto</h4>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const donors = await fetchAll('donors');

    return {
        props: {
            data: JSON.stringify(donors)
        },
        revalidate: 60 * 60
    }
}
