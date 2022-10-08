import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './sigInButton.module.scss';

export function SignInButton() {
    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <img
                src={session.user.image}
                alt={`Foto de usuário do ${session.user.name}`}
            />

            Olá {(session.user.name || 'Nome não localizado')}
            <FiX
                color="#737380"
                className={styles.closeIcon}
            />
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#ffb800"/>
            Entrar com GitHub
        </button>
    );
}
