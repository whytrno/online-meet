import { Icon } from "@iconify/react";
import { useIsLoading, useMeetingId } from "@/zustand/state";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { authToken, createMeeting } from "@/components/videosdk-api";
import { useEffect, useState } from "react";

export const RoomMenu = () => {
    const { setIsLoading } = useIsLoading()
    const router = useRouter();
    const { meetingId, setMeetingId } = useMeetingId()
    const [meetingIdInput, setMeetingIdInput] = useState("")

    const createRoom = async (id) => {
        setIsLoading(true)

        const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
        setMeetingId(meetingId);

        if (meetingId) {
            router.push(`/rooms/${meetingId}`)
        }
    }

    const joinRoom = async () => {
        setIsLoading(true)
        setMeetingId(meetingIdInput);
    }

    useEffect(() => {
        if (meetingId) {
            router.push(`/rooms/${meetingId}`)
        }
    }, [meetingId]);

    const menus = [
        {
            icon: "majesticons:video",
            label: "Create Room",
            modal: <CreateModal createRoom={createRoom} />
        },
        {
            icon: "majesticons:video-plus",
            label: "Join Room",
            modal: <JoinModal meetingIdInput={meetingIdInput} setMeetingIdInput={setMeetingIdInput}
                joinRoom={joinRoom} />
        }
    ]

    return (
        <>
            {
                menus.map((menu, index) => (
                    <Dialog key={index}>
                        <DialogTrigger
                            className="cursor-pointer group hover:bg-cPrimary hover:text-white transition flex items-center justify-center w-full h-full rounded-xl bg-cGraySecondary">
                            <div className="flex flex-col gap-y-2">
                                <div
                                    className="flex justify-center py-2 px-5 bg-cPrimary rounded-xl text-white transition group-hover:bg-white group-hover:text-cPrimary">
                                    <Icon icon={menu.icon} className="text-8xl" />
                                </div>
                                <h1 className="font-semibold text-center">{menu.label}</h1>
                            </div>
                        </DialogTrigger>

                        {menu.modal}
                    </Dialog>
                ))
            }
        </>
    )
}

const CreateModal = ({ createRoom }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Room</DialogTitle>
                <DialogDescription>
                    Are You sure to create a new room?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => createRoom()} className="bg-cPrimary hover:bg-cPrimary/80">Submit</Button>
            </DialogFooter>
        </DialogContent>
    )
}

const JoinModal = ({ meetingIdInput, setMeetingIdInput, joinRoom }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Join Room</DialogTitle>
            </DialogHeader>
            <p>Enter meeting ID to join</p>

            <input value={meetingIdInput} onChange={(e) => setMeetingIdInput(e.target.value)} type="text"
                className="active:ring-0 active:border-none border border-cBlack w-full py-4 px-4 rounded-lg" />
            <DialogFooter>
                {
                    meetingIdInput.length <= 0 ? (
                        <Button>Submit</Button>
                    ) : (
                        <Button onClick={() => joinRoom(meetingIdInput)}
                            className="bg-cPrimary hover:bg-cPrimary/80">Submit</Button>
                    )
                }
            </DialogFooter>
        </DialogContent>
    )
}
