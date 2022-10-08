import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import {
    FiPlus,
    FiCalendar,
    FiEdit2,
    FiTrash,
    FiClock
} from 'react-icons/fi';

import { format } from 'date-fns';

import { add } from '../../services/firebaseConnection';

import styles from './styles.module.scss';

interface tasksProps {
    user: {
        name: string;
        id: string|number;
    }
}

export default function Tasks({
    user: { id, name }
}: tasksProps) {
    const [taskName, setTaskName] = useState('');
    const [inputError, setInputErro] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const handleAddTask = async (event:FormEvent) => {
        event.preventDefault();

        if (hasError(taskName)) {
            return;
        }

        await add('taskList', {
            created_at: new Date(),
            task: taskName,
            userId: id,
            userName: name
        }).then(task => {
            const data = {
                id: task.id,
                created_at: new Date(),
                formatted_created_at: format(new Date(), 'dd MMMM yyyy'),
                task: taskName,
                userId: id,
                userName: name
            }

            setTaskList([...taskList, data]);
            setTaskName('');
        });
    };

    const hasError = (taskName: string) => {
        if (taskName === '') {
            setInputErro(true);
            return true;
        }

        return false;
    }

    return (
        <>
            <Head>
                <title>Tarefas | Listagem</title>
            </Head>

            <main className={styles.container}>
                <form onSubmit={handleAddTask}>
                    <input
                        value={taskName}
                        name="task"
                        onChange={e => setTaskName(e.target.value)}
                        type="text"
                        placeholder="Digite sua tarefa..."
                        onFocus={() => setInputErro(false)}
                        className={inputError ? styles.inputError : ''}
                    />

                    <button
                        type="submit"
                    >
                        <FiPlus
                            size={25}
                            color="#17181f"
                        />
                    </button>
                </form>

                {inputError && (<span className={styles.errorMessage}>Por favor, verifique o campo acima e envie novamente.</span>)}

                <h1>Você tem {taskList.length} tarefa(s)!</h1>

                <section>
                    {taskList.map(task => (
                        <article key={task.id} className={styles.taskList}>
                            <Link href={`/tarefas/${task.id}`}>
                                <p>{task.task}</p>
                            </Link>

                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar
                                            size={20}
                                            color="#ffb800"
                                        />

                                        <time>{task.formatted_created_at}</time>
                                    </div>

                                    <button>
                                        <FiEdit2
                                            size={20}
                                            color="fff"
                                        />

                                        <span>Editar</span>
                                    </button>
                                </div>

                                <button>
                                    <FiTrash
                                        size={20}
                                        color="#ff3636"
                                    />

                                    <span>Excluir</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>

            <div className={styles.thanks}>
                <h3>Obrigado por doar para este projeto! 🥰</h3>

                <div>
                    <FiClock size={28} color="#fff" />
                    <time>Última doação há 3 dias.</time>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);
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
    }

    return {
        props: {
            user
        }
    };
}
