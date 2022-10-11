import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { useUser } from '../../hooks/user';

import styles from './sigInButton.module.scss';

interface ISignButtonProps {
    provider: 'github' | 'google'
}

export function SignInButton({
    provider
}: ISignButtonProps) {
    const { data: session } = useSession();
    const { toggleLogged } = useUser();

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={async () => {
                await signOut();
                await toggleLogged();
            }}
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
            onClick={async () => {
                await signIn(provider);
                toggleLogged();
            }}
        >
            {provider === 'github' ? (<FaGithub />) : (<FaGoogle />)}
            Entrar com {provider === 'github' ? 'GitHub' : 'Google'}
        </button>
    );
}
