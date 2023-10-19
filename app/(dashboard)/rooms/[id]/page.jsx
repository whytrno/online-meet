"use client"

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsLoading, useMeetingId } from "@/zustand/state";
import { useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantView } from "@/components/rooms/participant-view";
import { useRouter } from "next/navigation";
import { PresenterView } from "@/components/rooms/presenter-view";
import { useUser } from "@clerk/nextjs";

function onParticipantLeft(participant) {
    console.log(" onParticipantLeft", participant);
}
const RoomPage = ({ params }) => {
    const { setIsLoading } = useIsLoading()
    const { meetingId, setMeetingId } = useMeetingId()
    const { toast } = useToast();
    const router = useRouter()
    const { user } = useUser();
    const [uniqueParticipants, setUniqueParticipants] = useState([])

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
        if (participants.size > 0) {
            const seenDisplayNames = new Map();
            const uniqueParticipants = [];

            participants.forEach((participant) => {
                const displayName = participant.displayName;

                if (!seenDisplayNames.has(displayName)) {
                    seenDisplayNames.set(displayName, true);
                    uniqueParticipants.push(participant);
                }
            });

            setUniqueParticipants(uniqueParticipants)
        }
    }, [participants]);

    useEffect(() => {
        router.refresh();
    }, []);

    useEffect(() => {
        if (meetingId) {
            join()
        } else {
            router.push('/dashboard')
        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then((stream) => {
                console.log("Access to microphone and camera granted.");
                // You can use the `stream` for further actions, like displaying it in a video element.
            })
            .catch((error) => {
                console.error("Error accessing microphone and camera:", error);
                // Handle the error, for example, by showing a message to the user.
            });

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
                className={`h-full gap-5 ${presenterId ? `col-span-1 grid grid-rows-${uniqueParticipants.size}` : `col-span-3 grid grid-cols-${uniqueParticipants.size}`}`}>
                {
                    [...uniqueParticipants.values()].map((participant, index) => (
                        <ParticipantView key={index} participant={participant} />
                    ))
                }
            </div>
        </div>
    );
}

export default RoomPage;