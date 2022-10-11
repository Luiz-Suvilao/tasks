import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import { useSidebar } from '../../hooks/sidebar';
import { useUser } from '../../hooks/user'

import styles from './sidebar.module.scss';;

export function SidebarWithMenu() {
    const { toggleSidebar, open } = useSidebar();
    const { logged } = useUser();
    return (
        <aside className={styles.aside}>
            <div className={styles.container}>
                <input className={styles.checkbox} type="checkbox" checked={open} readOnly onClick={() => toggleSidebar()}/>
                <div className={styles.hamburgerWrapper}>
                    <div className={styles.hamburgerLines}>
                        <span className={`${styles.line} ${styles.line1}`}></span>
                        <span className={`${styles.line} ${styles.line2}`}></span>
                        <span className={`${styles.line} ${styles.line3}`}></span>
                    </div>
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


                <nav className={styles.menuItems}>
                    <div className={styles.wrapperContent}>
                        <Link href="/">
                            <h1 onClick={() => toggleSidebar()}>Tarefas</h1>
                        </Link>

                        <div className={styles.wrapperLinks}>
                            <Link href="/">
                                <a onClick={() => toggleSidebar()}>Home</a>
                            </Link>

                            <Link href="/tarefas">
                                <a onClick={() => toggleSidebar()}>Minhas tarefas</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
