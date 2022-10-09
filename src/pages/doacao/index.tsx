import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { Session } from '../tarefas/interfaces/ISession';

import styles from './styles.module.scss';

interface DonationProps {
    session: Session;
}

export default function Donation({
    session: { user: { name, image } }
}: DonationProps) {
    return (
        <>
            <Head>
                <title>Tarefas | Doação</title>
            </Head>

            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Ícone de um foguete" />

                <div className={styles.whenToDonate}>
                    <img src={image} alt={`Imagem do usuário ${name}`} />
                    <span>Parabéns! Você agora é um apoiador! 😆</span>
                </div>

                <h1>Apoie o projeto para novas funcionalidades!</h1>

                <h3>
                    Contribua com apenas <span>R$ 1,00</span>
                </h3>

                <strong>Apareça na nossa home, tenha funcionalidades exclusivas e mande sugestões para nós. 😉</strong>
            </main>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session: Session = await getSession(ctx);

    if (!session?.id) {
        return  {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        },
    }
}
