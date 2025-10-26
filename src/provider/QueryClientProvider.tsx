"use client"

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ToastContainer } from 'react-toastify';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                retry: 1,
            },
        },
    });
    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
            <ToastContainer />
        </TanstackQueryClientProvider>
    )
}

export default QueryClientProvider;