import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };


export interface IAuthContext {
    user: string | boolean;
    onLogin(token: string): void;
    onLogout(): void;
}

// Expected data response from the GetVoices API. 
export interface SynthVoices {
    Gender?: string,
    Id?: string,
    LanguageCode: string,
    LanguageName?: string,
    Name: string
    SupportedEngines?: [string]
    AdditionalLanguageCodes?: [string]
}

