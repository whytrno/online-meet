"use client"

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsLoading, useMeetingId } from "@/zustand/state";
import { useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantView } from "@/components/rooms/participant-view";
import { useRouter } from "next/navigation";
import { PresenterView } from "@/components/rooms/presenter-view";
function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
}
const RoomPage = ({ params }) => {
    const { setIsLoading } = useIsLoading()
    const { meetingId, setMeetingId } = useMeetingId()
    const { toast } = useToast();
    const router = useRouter()

    if (!params.id) {
        router.push('/dashboard')
    }

    const handleToast = (name) => {
        toast({
            title: `${name} joined the meeting`,
        })
    }

    const { join, participants, presenterId } = useMeeting({ onParticipantLeft })

    useEffect(() => {
        if (meetingId) {
            join()
        } else {
            router.push('/dashboard')
        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [meetingId]);

    return (
        <div className="grid grid-cols-3 h-full gap-5">
            <div
                className={cn("h-full bg-blue-500 rounded-xl object-contain overflow-hidden", presenterId ? 'col-span-2' : 'hidden')}>
                {presenterId && <PresenterView presenterId={presenterId} />}
            </div>

            <div
                className={`h-full gap-5 ${presenterId ? `col-span-1 grid grid-rows-${participants.size}` : `col-span-3 grid grid-cols-${participants.size}`}`}>
                {
                    [...participants.values()].map((participant, index) => (
                        <ParticipantView key={index} participant={participant} />
                    ))
                }
            </div>
        </div>
    );
}

export default RoomPage;