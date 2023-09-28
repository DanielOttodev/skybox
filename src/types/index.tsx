import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };


export interface IAuthContext  {
    token: string | boolean;
    onLogin(): void;
    onLogout(): void;
}
