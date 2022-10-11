import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import styles from './header.module.scss';

export function Header() {
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

                <SignInButton
                    provider="google"
                />

                <SignInButton
                    provider="github"
                />
            </div>
        </header>
    );
}
