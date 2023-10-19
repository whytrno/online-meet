"use client"

import {Navbar} from "@/components/navbar";
import {RoomMenu} from "@/components/dashboard/room-menu";

export default function Home() {
    return (
        <>
            <Navbar/>

            <div className="grid grid-cols-2 gap-x-5 h-full">
                <RoomMenu/>
            </div>
        </>
    )
}
