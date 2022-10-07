import { AppProps } from 'next/app';

import { Header } from '../components/Header';
import { DonationButton } from '../components/DonationButton';

import '../styles/global.scss';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <DonationButton />
        </>
    )
}

export default MyApp
