import Link from 'next/link';

import { useModal } from '../../hooks/modal';
import { useUser } from '../../hooks/user';

import styles from './DonationButton.module.scss';

export function DonationButton() {
    const { toggleModal } = useModal();
    const { logged } = useUser();

    return (
        <div className={styles.donateContainer}>
            <Link href="/doacao">
                <button onClick={() => !logged && toggleModal()}>
                    Doar para o projeto
                </button>
            </Link>
        </div>
    );
}
