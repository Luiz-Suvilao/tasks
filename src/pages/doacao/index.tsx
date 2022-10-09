import { useState } from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { addWithCustomDocument } from '../../services/firebaseConnection';

import { Session } from '../tarefas/interfaces/ISession';

import styles from './styles.module.scss';

interface DonationProps {
    session: Session;
}

export default function Donation({
    session: { user: { name, image }, id }
}: DonationProps) {
    const [donationMade, setDonationMade] = useState(false);
    const handleDonation = async () => {
        await addWithCustomDocument('users',  String(id), {
            donate: true,
            lastDonate: new Date(),
            image,
            userName: name
        }).then(() => setDonationMade(true));
    };
    console.log(donationMade);
    return (
        <>
            <Head>
                <title>Tarefas | Doação</title>
            </Head>

            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Ícone de um foguete" />

                {donationMade && (
                    <div className={styles.whenToDonate}>
                        <img src={image} alt={`Imagem do usuário ${name}`} />
                        <span>Parabéns! Você agora é um apoiador! 😆</span>
                    </div>
                )}

                <h1>Apoie o projeto para novas funcionalidades!</h1>

                <h3>
                    Contribua com apenas <span>R$ 1,00</span>
                </h3>

                <strong>Apareça na nossa home, tenha funcionalidades exclusivas e mande sugestões para nós. 😉</strong>

                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                           purchase_units: [{
                               amount: {
                                   value: '1'
                               }
                           }]
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(async (details) => {
                            await handleDonation();
                        });
                    }}
                />
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
