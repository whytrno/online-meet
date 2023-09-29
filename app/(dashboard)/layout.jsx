"use client"

import Sidebar from "@/components/sidebar";
import { Loading } from "@/components/loading";
import { useIsLoading } from "@/zustand/state";
import { useEffect } from "react";

export default function MainLayout({ children }) {
    const { isLoading, setIsLoading } = useIsLoading()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [setIsLoading]);

    return (
        <div className="h-full w-full bg-cGraySecondary relative text-cBlack">
            <div className="py-10 absolute top-0 left-0 w-32 h-full">
                <Sidebar />
            </div>
            <div className="col-span-10 p-10 flex flex-col gap-y-5 ml-32 bg-white rounded-3xl h-full">
                {children}
            </div>

            {isLoading && <Loading />}
        </div>
    )
}
