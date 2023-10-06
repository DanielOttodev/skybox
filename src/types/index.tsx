import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };


export interface IAuthContext  {
    user: string | boolean;
    onLogin(token:string): void;
    onLogout(): void;
}

