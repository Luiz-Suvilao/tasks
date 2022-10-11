import styles from './footer.module.scss';
import Link from "next/link";

export function Footer() {
    return (
        <footer className={styles.footer}>
            Criado por &copy;
            <Link  href="https://www.instagram.com/luiz_filipe.dev/">
                <a target="_blank">Luiz Filipe da S. de Jesus</a>
            </Link>
        </footer>
    );
}
