import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './sigInButton.module.scss';

interface ISignButtonProps {
    provider: 'github' | 'google'
}

export function SignInButton({
    provider
}: ISignButtonProps) {
    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <div>
                <Image
                    width={35}
                    height={35}
                    objectFit="fill"
                    src={session.user.image}
                    alt={`Foto de usuário do ${session.user.name}`}
                />
            </div>

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
            onClick={() => signIn(provider)}
        >
            {provider === 'github' ? (<FaGithub color="#ffb800"/>) : (<FaGoogle color="#ffb800"/>)}
            Entrar com {provider === 'github' ? 'GitHub' : 'Google'}
        </button>
    );
}
