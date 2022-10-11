import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Header } from '../components/Header';
import { DonationButton } from '../components/DonationButton';
import { SidebarWithMenu } from '../components/SidebarWithMenu';

import { SidebarProvider } from '../hooks/sidebar';
import { UserProvider } from '../hooks/user';

import '../styles/global.scss';

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    session: Session;
}>) {
    const initialPayPalOptions = {
        'client-id': 'ASomlkeNijYR9XsBLXJc0P3t60ohOy1PofKRrNWjG3oio4HO_xdlEZgPpibvcOobSQt7c18L4vZoTqOM',
        currency: 'BRL',
        intent: 'capture'
    };

    return (
        <SessionProvider session={pageProps.session}>
            <PayPalScriptProvider options={initialPayPalOptions}>
                <SidebarProvider>
                    <UserProvider>
                        <Header/>
                        <SidebarWithMenu />
                        <Component {...pageProps} />
                        <DonationButton/>
                    </UserProvider>
                </SidebarProvider>
            </PayPalScriptProvider>
        </SessionProvider>
    );
}

export default MyApp
