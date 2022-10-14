import { useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { add } from '../../services/firebaseConnection';

import Session from '../tarefas/interfaces/ISession';

import styles from './styles.module.scss';

interface SugestaoProps {
    user: {
        name: string;
        id: string|number;
        email: string;
    }
}

export default function Sugestao({
    user: { id, name, email }
}: SugestaoProps) {
    const [suggestion, setSuggestion] = useState('');
    const [error, setError] = useState(false);
    const [sending, setSending] = useState(false);

    const sendSuggestion = async () => {
        if (!suggestion) {
            setError(true);
            return;
        }

        await setSending(true);
        await add('suggestions', {
            userName: name,
            userId: id,
            userEmail: email,
            suggestion
        }).then(() => setSending(false));
    }

    return (
        <div className={styles.container}>
            <h1>Fale conosco</h1>

            <form>
                <textarea
                    value={suggestion}
                    onFocus={() => setError(false)}
                    onChange={e => setSuggestion(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />

                {
                    error
                    ? (<p>Por favor, verifique o campo e tente novamente.</p>)
                    : null
                }

                <button
                    disabled={sending}
                    type='button'
                    onClick={() => sendSuggestion()}
                >
                    {
                        sending
                        ? (<AiOutlineLoading3Quarters className={styles.rotate} size={25} />)
                        : 'Enviar'
                    }
                </button>
            </form>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session: Session = await getSession(ctx);

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }

    const user = {
        name: session?.user.name,
        id: session?.id,
        email: session.user.email
    }

    return {
        props: {
            user
        }
    };
}
