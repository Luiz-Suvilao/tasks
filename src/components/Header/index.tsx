import Link from 'next/link';

import { SignInButton } from '../SignInButton';
import { useUser } from '../../hooks/user';

import styles from './header.module.scss';

export function Header() {
    const { logged } = useUser();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <h1>Tarefas</h1>
                </Link>

                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>

                    <Link href="/tarefas">
                        <a>Minhas tarefas</a>
                    </Link>
                </nav>

                {logged ? (
                    <SignInButton
                        provider="google"
                    />
                ) : (
                    <>
                        <SignInButton
                            provider="google"
                        />

                        <SignInButton
                            provider="github"
                        />
                    </>
                )}
            </div>
        </header>
    );
}
