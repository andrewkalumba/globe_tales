"use client"
import { QueryClient, QueryClientProvider as OriginalQueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@/utils/supabase/browser-client";

const makeQueryClient = () => { return new QueryClient() }

let browserQueryClient: QueryClient | undefined = undefined //holds the QueryClient so it can be reused
const supabase = createClient()

export const getQueryClient = () => {
    if (typeof window === 'undefined') {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient()
        }

        return browserQueryClient
    }
}

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    const QueryClient = getQueryClient()
    return (
        <SessionContextProvider supabaseClient={supabase}>
            <OriginalQueryClientProvider client={QueryClient}>
                {children}
            </OriginalQueryClientProvider>
        </SessionContextProvider>
    )
}
