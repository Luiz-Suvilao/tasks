export interface Session {
    user?: {
        name?: string;
        email?: string;
        image?: string;
    },
    expires?: string;
    id?: string|number;
    isDonor?: boolean,
    lastDonate?: string|null;
}
