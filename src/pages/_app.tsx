import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Header } from '../components/Header';
import { DonationButton } from '../components/DonationButton';
import { SidebarWithMenu } from '../components/SidebarWithMenu';
import { Modal } from '../components/Modal';

import { SidebarProvider } from '../hooks/sidebar';
import { UserProvider } from '../hooks/user';
import { ModalProvider } from '../hooks/modal';

import '../styles/global.scss';

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    session: Session;
}>) {
    const initialPayPalOptions = {
        'client-id': 'ARiSoIUbKDe3uhWBbuX1yjkjwAl5VVb6CKEU1waRyNFm2k_t1u-4dEBZW7QGGUZEDQs9fw5ZDdTa8ste',
        currency: 'BRL',
        intent: 'capture'
    };

    return (
        <SessionProvider session={pageProps.session}>
            <PayPalScriptProvider options={initialPayPalOptions}>
                <SidebarProvider>
                    <UserProvider>
                        <ModalProvider>
                            <Header/>
                            <SidebarWithMenu />
                            <Component {...pageProps} />
                            <Modal />
                            <DonationButton />
                        </ModalProvider>
                    </UserProvider>
                </SidebarProvider>
            </PayPalScriptProvider>
        </SessionProvider>
    );
}

export default MyApp
