import { createContext, useContext, useState, ReactNode } from 'react';

interface ISidebarContext {
    open: boolean;
    toggleSidebar(): void;
}

interface ISidebarProvider {
    children: ReactNode;
}

const SidebarContext = createContext<ISidebarContext>({} as ISidebarContext);

const SidebarProvider = ({ children }: ISidebarProvider) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggleSidebar = () => setOpen(!open);

    return (
        <SidebarContext.Provider value={{open, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}

function useSidebar(): ISidebarContext {
    return useContext(SidebarContext);
}

export { SidebarProvider, useSidebar };
