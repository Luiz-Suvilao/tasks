import { useModal } from '../../hooks/modal';

import styles from './modal.module.scss';


export function Modal() {
    const { modalOpen, toggleModal } = useModal();

    const handleOutsideClick = (e:any) => {
        e.preventDefault();

        if (e.target.id === 'modal') {
            toggleModal();
        }
    };

    return (
        <div
            id="modal"
            onClick={event => handleOutsideClick(event)}
            className={`${styles.modal} ${!modalOpen && styles.closed}`}
        >
            <div className={styles.container}>
                <button className={styles.close} onClick={() => toggleModal()} />

                <div className={styles.content}>
                    <h1>Aviso!</h1>
                    <p>Para ter acesso as páginas de tarefas, sugestão e doação, é necessário efetuar um login. 😉</p>
                </div>
            </div>
        </div>
    );
}
