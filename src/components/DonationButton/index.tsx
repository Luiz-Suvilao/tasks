import Link from 'next/link';

import styles from './DonationButton.module.scss';

export function DonationButton() {
    return (
        <div className={styles.donateContainer}>
            <Link href="/doacao">
                <button>
                    Doar para o projeto
                </button>
            </Link>
        </div>
    );
};
