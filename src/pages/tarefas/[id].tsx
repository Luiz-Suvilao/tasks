import { useEffect } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { format } from 'date-fns';

import { useSidebar } from '../../hooks/sidebar';
import { getById } from '../../services/firebaseConnection';

import { FiCalendar } from 'react-icons/fi';

import Session from './interfaces/ISession';
import Task from './interfaces/ITask';

import styles from './styles/task-detail.module.scss';


interface TaskDetailProps {
    selectedTask: string
}

export default function TaskDetail({
    selectedTask
}: TaskDetailProps) {
    const task = JSON.parse(selectedTask) as Task;
    const { open } = useSidebar();

    useEffect(() => {
        document.body.className = open ? 'locked' : 'unlocked';
    });

    return (
        <>
            <Head>
                <title>Tarefas | Detalhes</title>
            </Head>

            <article className={styles.container}>
                <div className={styles.actions}>
                    <div>
                        <FiCalendar size={30} color="#fff" />
                        <span>Tarefa criada em:</span>
                        <time>{task.formatted_created_at}</time>
                    </div>
                </div>

                <p>{task.task}</p>
            </article>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session: Session = await getSession(ctx);
    const { id } = ctx.params;

    if (!session?.isDonor) {
        return {
            redirect: {
                destination: '/tarefas',
                permanent: false,
            }
        };
    }

    const selectedTask = await getById('taskList', String(id))
        .then((snapshot) => {
            const task: Task = {
                id: String(id),
                created_at: snapshot.created_at,
                task: snapshot.task,
                userId: snapshot.userId,
                formatted_created_at: format(snapshot.created_at.toDate(), 'dd MMMM yyyy'),
                userName: snapshot.userName
            };

            return JSON.stringify(task);
        }).catch(() => {
            return {};
        });

    if (Object.keys(selectedTask).length === 0) {
        return {
            redirect: {
                destination: '/tarefas',
                permanent: false,
            }
        };
    }

    return {
        props: {
            selectedTask
        }
    }
}
