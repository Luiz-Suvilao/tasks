import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface IUserContext {
    logged: boolean;
    toggleLogged(): void;
}

interface IUserProvider {
    children: ReactNode;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }: IUserProvider) => {
    const { data: session } = useSession();
    const [logged, setLogged] = useState<boolean>(false);
    const toggleLogged = () => setLogged(!logged);

    useEffect(() => {
       setLogged(!!session?.id);
    }, [session?.id]);

    return (
        <UserContext.Provider value={{logged, toggleLogged}}>
            {children}
        </UserContext.Provider>
    );
}

function useUser(): IUserContext {
    return useContext(UserContext);
}

export { UserProvider, useUser };
