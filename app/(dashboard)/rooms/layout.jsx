"use client"

import { MeetingProvider, } from "@videosdk.live/react-sdk";
import { authToken } from "@/components/videosdk-api";
import { useMeetingId } from "@/zustand/state";
import Controll from "@/components/rooms/controll";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const RoomsLayout = ({ children }) => {
    const { meetingId } = useMeetingId()
    const { user } = useUser();

    // useEffect(() => {
    //     console.log(meetingId)
    // }, [meetingId]);

    return (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: user?.fullName,
            }}
            token={authToken}
        >
            <div className="bg-white w-full flex flex-col h-full p-7 gap-y-5">
                <div className="flex-grow">
                    {children}
                </div>

                <Controll />
            </div>
        </MeetingProvider>
    )
}

export default RoomsLayout