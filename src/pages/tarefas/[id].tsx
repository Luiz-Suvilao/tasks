import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { format } from 'date-fns';

import { getTaskById } from '../../services/firebaseConnection';

import { Session } from './interfaces/ISession';
import { Task } from './interfaces/ITask';

interface TaskDetailProps {
    selectedTask: string
}

export default function TaskDetail({
    selectedTask
}: TaskDetailProps) {
    const task = JSON.parse(selectedTask) as Task;

    return (
        <div>
            <h1>{task.task}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session: Session = await getSession(ctx);
    const {id} = ctx.params;

    if (!session?.id) {
        return {
            redirect: {
                destination: '/tarefas',
                permanent: false,
            }
        };
    }

    const selectedTask = await getTaskById('taskList', String(id))
        .then((snapshot) => {
            const task: Task = {
                id: String(ctx.params.id),
                created_at: snapshot.created_at,
                task: snapshot.task,
                userId: snapshot.userId,
                formatted_created_at: format(snapshot.created_at.toDate(), 'dd MMMM yyyy'),
                userName: snapshot.userName
            };

            return JSON.stringify(task);
        });

    return {
        props: {
            selectedTask
        }
    }
}
