import Head from 'next/head';

import {
    FiPlus,
    FiCalendar,
    FiEdit2,
    FiTrash,
    FiClock
} from 'react-icons/fi';

import styles from './styles.module.scss';

export default function Tasks() {
    return (
        <>
            <Head>
                <title>Tarefas | Listagem</title>
            </Head>

            <main className={styles.container}>
                <form>
                    <input
                        type="text"
                        placeholder="Digite sua tarefa..."
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

                <h1>Você tem 1 tarefas!</h1>

                <section>
                    <article className={styles.taskList}>
                        <p>Criar projeto</p>

                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar
                                        size={20}
                                        color="#ffb800"
                                    />

                                    <time>17 julho de 2022</time>
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
