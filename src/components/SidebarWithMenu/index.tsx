import { useSidebar } from '../../hooks/sidebar';

import styles from './styles.module.scss';
import Link from "next/link";
import { SignInButton } from "../SignInButton";

export function SidebarWithMenu() {
    const { toggleSidebar, open } = useSidebar();

    return (
        <aside className={styles.aside}>
            <div className={styles.container}>
                <input className={styles.checkbox} type="checkbox" checked={open} onClick={() => toggleSidebar()}/>
                <div className={styles.hamburgerWrapper}>
                    <div className={styles.hamburgerLines}>
                        <span className={`${styles.line} ${styles.line1}`}></span>
                        <span className={`${styles.line} ${styles.line2}`}></span>
                        <span className={`${styles.line} ${styles.line3}`}></span>
                    </div>

                    <SignInButton />
                </div>


                <nav className={styles.menuItems}>
                    <div className={styles.wrapperContent}>
                        <Link href="/">
                            <h1>Tarefas</h1>
                        </Link>

                        <div className={styles.wrapperLinks}>
                            <Link href="/">
                                <a onClick={() => toggleSidebar()}>Home</a>
                            </Link>

                            <Link href="/tarefas">
                                <a>Minhas tarefas</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
