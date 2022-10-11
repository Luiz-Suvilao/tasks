import { createContext, useContext, useState, ReactNode } from 'react';

interface IModalContext {
    modalOpen: boolean;
    toggleModal(): void;
}

interface IModalProvider {
    children: ReactNode;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

const ModalProvider = ({ children }: IModalProvider) => {
    const [modalOpen, setOpen] = useState<boolean>(true);

    const toggleModal = () => setOpen(!modalOpen);

    return (
        <ModalContext.Provider value={{modalOpen, toggleModal}}>
            {children}
        </ModalContext.Provider>
    );
}

function useModal(): IModalContext {
    return useContext(ModalContext);
}

export { ModalProvider, useModal };
