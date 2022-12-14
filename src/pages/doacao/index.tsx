import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { useSidebar } from '../../hooks/sidebar';
import { addWithCustomDocument } from '../../services/firebaseConnection';

import Session from '../tarefas/interfaces/ISession';

import rocketImage from '../../../public/images/rocket.svg';

import styles from './styles.module.scss';

interface DonationProps {
    session: Session;
}

export default function Donation({
    session: { user: { name, image, email }, id }
}: DonationProps) {
    const [donationMade, setDonationMade] = useState(false);
    const handleDonation = async () => {
        await addWithCustomDocument('donors',  String(id), {
            donate: true,
            lastDonate: new Date(),
            image,
            userName: name
        }).then(() => setDonationMade(true));
    };
    const { open } = useSidebar();

    useEffect(() => {
        document.body.className = open ? 'locked' : 'unlocked';
    });

    return (
        <>
            <Head>
                <title>Tarefas | Doação</title>
            </Head>

            <main className={styles.container}>
                {open === false && (
                    <Image
                        src={rocketImage}
                        alt="Ícone de um foguete"
                    />
                )}

                {(donationMade && open === false) && (
                    <div className={styles.whenToDonate}>
                        <Image
                            width={50}
                            height={50}
                            objectFit="fill"
                            src={image}
                            alt={`Imagem do usuário ${name}`}
                        />
                        <span>Parabéns! Você agora é um apoiador! 😆</span>
                    </div>
                )}

                <h1>Apoie o projeto para novas funcionalidades!</h1>

                <h3>
                    Contribua com apenas <span>R$ 1,00</span>
                </h3>

                <strong>Apareça na nossa home, tenha funcionalidades exclusivas e mande sugestões para nós. 😉</strong>

                {open === false && (
                    <PayPalButtons
                        className={styles.buttons}
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
                                const dataToEmail = {
                                    ...details,
                                    email,
                                    name
                                };
                                await fetch('https://digital-tarefas.vercel.app/api/email/successPayment', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(dataToEmail)
                                });
                            });
                        }}
                    />
                )}
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
