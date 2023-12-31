"use client"

import {Loading} from "@/components/loading";
import {useIsLoading} from "@/zustand/state";
import {useEffect} from "react";

export default function MainDashboardLayout({children}) {
    const {isLoading, setIsLoading} = useIsLoading()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [setIsLoading]);

    return (
        <>
            {children}

            {isLoading && <Loading/>}
        </>
    )
}
