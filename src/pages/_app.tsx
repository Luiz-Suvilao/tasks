import { AppProps } from 'next/app';
import { Session } from 'next-auth';

import { SessionProvider } from 'next-auth/react';

import { Header } from '../components/Header';
import { DonationButton } from '../components/DonationButton';

import '../styles/global.scss';

function MyApp({
    Component,
    pageProps,
}: AppProps<{
    session: Session;
}>) {
    return (
        <SessionProvider session={pageProps.session}>
            <Header/>
            <Component {...pageProps} />
            <DonationButton/>
        </SessionProvider>
    );
}

export default MyApp
